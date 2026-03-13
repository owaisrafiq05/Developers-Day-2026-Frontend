"use client"

import { useEffect, useRef, useState } from "react";
import Script from "next/script";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { useSearchParams } from 'next/navigation'
import { Select, SelectItem } from "@heroui/select";
// @ts-ignore – sonner types may not be available in this project yet
import { toast } from "sonner";
import RegistrationReceipt from "./registration-receipt";
import InstitutionAutocomplete from "./institution-autocomplete";
import { submitPublicRegistration } from "@/lib/api/registration";
import type { TeamMemberInput } from "@/types/registration";
import type { CompetitionWithCategory } from "@/types/competitions";
import { fetchCompetitionsWithCategory } from "@/lib/api/competitions";
import { INSTITUTION_OPTIONS } from "@/config/institutions";
import PaymentDetails from './payment-details'

declare global {
    interface Window {
        turnstile?: {
            render: (container: string | HTMLElement, options: {
                sitekey: string;
                theme?: "light" | "dark" | "auto";
                action?: string;
                size?: "normal" | "compact" | "flexible";
                callback?: (token: string) => void;
                "expired-callback"?: () => void;
                "error-callback"?: (errorCode?: string) => void;
            }) => string;
            reset: (widgetId?: string) => void;
            remove?: (widgetId?: string) => void;
        };
    }
}

type TabType = "team" | "leader" | "members" | "payment";

interface FormData {
    teamName: string;
    competitionId: string;
    institutionName: string;
    referenceCode: string;
    leaderName: string;
    leaderEmail: string;
    leaderPhone: string;
    leaderCnic: string;
    leaderRollNumber: string;
    members: TeamMemberInput[];
    paymentScreenshot: File | null;
}

const EMPTY_MEMBER: TeamMemberInput = {
    fullName: "",
    email: "",
    cnic: "",
    phone: "",
    institution: "",
    rollNumber: "",
};

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^03\d{9}$/;
const cnicDisplayRegex = /^\d{5}-\d{7}-\d{1}$/;
const rollNumberRegex = /^\d{2}[IPLKMF]\d{4}$/;

function normalizeCnic(cnic: string): string {
    return cnic.replace(/[^0-9]/g, "");
}

function formatPhoneInput(value: string): string {
    const digitsOnly = value.replace(/\D/g, "").slice(0, 11);
    return digitsOnly;
}

function formatCnicDisplay(value: string): string {
    const digits = value.replace(/\D/g, "").slice(0, 13);

    if (digits.length <= 5) {
        return digits;
    }

    if (digits.length <= 12) {
        return `${digits.slice(0, 5)}-${digits.slice(5)}`;
    }

    return `${digits.slice(0, 5)}-${digits.slice(5, 12)}-${digits.slice(12)}`;
}

function formatRollNumberInput(value: string): string {
    return value.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 7);
}

function normalizeInstitutionName(value: string): string {
    return value.trim().toLowerCase().replace(/\s+/g, " ");
}

export default function RegistrationForm() {
    const turnstileSiteKey = process.env.NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITE_KEY;
    const [activeTab, setActiveTab] = useState<TabType>("team");
    const [paymentPreviewUrl, setPaymentPreviewUrl] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const receiptRef = useRef<HTMLDivElement>(null);
    const [submitError, setSubmitError] = useState<string | null>(null);
    const [submitSuccess, setSubmitSuccess] = useState<string | null>(null);
    const [competitions, setCompetitions] = useState<CompetitionWithCategory[]>([]);
    const [isLoadingCompetitions, setIsLoadingCompetitions] = useState(true);
    const [competitionError, setCompetitionError] = useState<string | null>(null);
    const [selectedCategory, setSelectedCategory] = useState<string>("");
    const [institutionOptions, setInstitutionOptions] = useState<string[]>(INSTITUTION_OPTIONS);
    const [isTurnstileScriptReady, setIsTurnstileScriptReady] = useState(false);
    const [turnstileToken, setTurnstileToken] = useState<string>("");
    const turnstileContainerRef = useRef<HTMLDivElement | null>(null);
    const turnstileWidgetIdRef = useRef<string | null>(null);
    const [formData, setFormData] = useState<FormData>({
        teamName: "",
        competitionId: "",
        institutionName: "",
        referenceCode: "",
        leaderName: "",
        leaderEmail: "",
        leaderPhone: "",
        leaderCnic: "",
        leaderRollNumber: "",
        members: [{ ...EMPTY_MEMBER }],
        paymentScreenshot: null,
    });
    const searchParams = useSearchParams()
    const paramCompetitionId = searchParams.get('competition')
    useEffect(() => {
        if (paramCompetitionId) {
            setFormData((prev) => ({
                ...prev,
                competitionId: paramCompetitionId,
            }));
        }
    }, [paramCompetitionId]);
    // Auto-set category filter when a competitionId is already in formData
    useEffect(() => {
        if (!formData.competitionId || competitions.length === 0 || selectedCategory) return;
        const matched = competitions.find((c) => c.id === formData.competitionId);
        if (matched) {
            setSelectedCategory(matched.category);
        }
    }, [competitions, formData.competitionId, selectedCategory]);
    useEffect(() => {
        let isMounted = true;

        (async () => {
            try {
                const data = await fetchCompetitionsWithCategory();
                if (!isMounted) return;

                const sorted = [...data].sort((a, b) => {
                    if (a.category === b.category) {
                        return a.name.localeCompare(b.name);
                    }
                    return a.category.localeCompare(b.category);
                });

                setCompetitions(sorted);
            } catch (error: any) {
                if (isMounted) {
                    setCompetitionError(error?.message || "Failed to load competitions.");
                }
            } finally {
                if (isMounted) {
                    setIsLoadingCompetitions(false);
                }
            }
        })();

        return () => {
            isMounted = false;
        };
    }, []);

    useEffect(() => {
        if (typeof window !== "undefined" && window.turnstile) {
            setIsTurnstileScriptReady(true);
        }
    }, [activeTab]);

    useEffect(() => {
        if (activeTab !== "payment") {
            return;
        }

        if (!turnstileSiteKey || !isTurnstileScriptReady || !turnstileContainerRef.current || !window.turnstile) {
            return;
        }

        if (
            turnstileWidgetIdRef.current &&
            turnstileContainerRef.current.childElementCount > 0
        ) {
            return;
        }

        const widgetId = window.turnstile.render(turnstileContainerRef.current, {
            sitekey: turnstileSiteKey,
            theme: "dark",
            action: "public_registration",
            size: "normal",
            callback: (token: string) => {
                setTurnstileToken(token);
                setSubmitError(null);
            },
            "expired-callback": () => {
                setTurnstileToken("");
            },
            "error-callback": (errorCode?: string) => {
                setTurnstileToken("");
                const message = errorCode
                    ? `Cloudflare verification error: ${errorCode}. Please retry.`
                    : "Cloudflare verification failed. Please retry.";
                setSubmitError(message);
            },
        });

        turnstileWidgetIdRef.current = widgetId;
    }, [activeTab, isTurnstileScriptReady, turnstileSiteKey]);

    const updateFormData = (field: keyof FormData, value: any) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
        setSubmitError(null);
        setSubmitSuccess(null);
    };

    const updateMember = (index: number, field: keyof TeamMemberInput, value: string) => {
        setFormData((prev) => ({
            ...prev,
            members: prev.members.map((member, i) =>
                i === index ? { ...member, [field]: value } : member
            ),
        }));
        setSubmitError(null);
        setSubmitSuccess(null);
    };

    const addInstitutionOption = (value: string) => {
        const nextInstitution = value.trim();

        if (!nextInstitution) return;

        setInstitutionOptions((prev) => {
            const exists = prev.some(
                (institution) =>
                    normalizeInstitutionName(institution) ===
                    normalizeInstitutionName(nextInstitution)
            );

            if (exists) {
                return prev;
            }

            return [...prev, nextInstitution];
        });
    };

    const requiresRollNumbers =
        normalizeInstitutionName(formData.institutionName) ===
        normalizeInstitutionName(INSTITUTION_OPTIONS[0] || "");

    const memberRequiresRollNumber = (member: TeamMemberInput) =>
        normalizeInstitutionName(member.institution || "") ===
        normalizeInstitutionName(INSTITUTION_OPTIONS[0] || "");

    const addMember = () => {
        const selectedCompetition = competitions.find(
            (comp) => comp.id === formData.competitionId
        );

        if (selectedCompetition) {
            const maxTeamSize = selectedCompetition.maxTeamSize;
            const maxAdditionalMembers = Math.max(maxTeamSize - 1, 0); // excluding leader
            const currentMemberRows = formData.members.length;

            if (currentMemberRows >= maxAdditionalMembers) {
                const message = `You can add up to ${maxAdditionalMembers} members (excluding the leader) for this competition.`;
                setSubmitError(message);
                toast.error(message);
                return;
            }
        }

        if (formData.members.length >= 7) return;

        setFormData((prev) => ({
            ...prev,
            members: [...prev.members, { ...EMPTY_MEMBER }],
        }));
    };

    const removeMember = (index: number) => {
        setFormData((prev) => ({
            ...prev,
            members: prev.members.filter((_, i) => i !== index),
        }));
    };

    const validateTeamTab = (): string | null => {
        if (!formData.teamName.trim()) return "Team name is required.";
        if (!formData.competitionId.trim()) return "Please select a competition.";
        if (!formData.institutionName.trim()) return "Institution name is required.";
        const picked = competitions.find((comp) => comp.id === formData.competitionId);
        if (picked && picked.capacityLimit <= 0) {
            return "This competition is full. Please select another competition.";
        }
        return null;
    };

    const validateLeaderTab = (): string | null => {
        if (!formData.leaderName.trim()) return "Leader name is required.";
        if (!emailRegex.test(formData.leaderEmail.trim())) return "Please enter a valid leader email.";

        const phone = formData.leaderPhone.trim();
        if (!phoneRegex.test(phone)) {
            return "Leader phone must be in the format 03XXXXXXXXX (e.g. 03363277876).";
        }

        const cnicRaw = formData.leaderCnic.trim();
        const cnicDigits = normalizeCnic(cnicRaw);
        if (cnicDigits.length !== 13 || (!cnicDisplayRegex.test(cnicRaw) && cnicRaw !== cnicDigits)) {
            return "Leader CNIC must contain 13 digits in the format 12345-1234567-1.";
        }

        const leaderRollNumber = formData.leaderRollNumber.trim();
        if (requiresRollNumbers && !leaderRollNumber) {
            return "Leader roll number is required.";
        }

        if (requiresRollNumbers && !rollNumberRegex.test(leaderRollNumber)) {
            return "Leader roll number must be in the format 22K4581, where the letter can only be I, P, L, K, M, or F.";
        }

        return null;
    };

    const getValidMembers = (): TeamMemberInput[] => {
        return formData.members.filter((m) =>
            m.fullName?.trim() || m.email?.trim() || m.cnic?.trim() || m.phone?.trim() || m.institution?.trim()
        );
    };

    const validateMembersTab = (): string | null => {
        const validMembers = getValidMembers();

        for (let index = 0; index < validMembers.length; index++) {
            const member = validMembers[index];
            const number = index + 1;

            if (!member.fullName?.trim()) return `Member ${number}: full name is required.`;
            if (!emailRegex.test(member.email?.trim() || "")) return `Member ${number}: valid email is required.`;

            const cnicRaw = member.cnic || "";
            const cnicDigits = normalizeCnic(cnicRaw);
            if (cnicDigits.length !== 13 || (!cnicDisplayRegex.test(cnicRaw) && cnicRaw !== cnicDigits)) {
                return `Member ${number}: CNIC must contain 13 digits in the format 12345-1234567-1.`;
            }

            if (!member.institution?.trim()) {
                return `Member ${number}: institution is required.`;
            }

            const phone = member.phone?.trim();
            if (phone && !phoneRegex.test(phone)) {
                return `Member ${number}: phone must be in the format 03XXXXXXXXX (e.g. 03363277876).`;
            }

            const rollNumber = member.rollNumber?.trim() || "";
            if (memberRequiresRollNumber(member) && !rollNumber) {
                return `Member ${number}: roll number is required for FAST students.`;
            }

            if (memberRequiresRollNumber(member) && !rollNumberRegex.test(rollNumber)) {
                return `Member ${number}: roll number must be in the format 22K4581, where the letter can only be I, P, L, K, M, or F.`;
            }
        }

        const selectedCompetition = competitions.find(
            (comp) => comp.id === formData.competitionId
        );

        if (selectedCompetition) {
            const totalMembers = validMembers.length + 1; // include leader

            if (totalMembers < selectedCompetition.minTeamSize) {
                return `This competition requires at least ${selectedCompetition.minTeamSize} members including the leader. You currently have ${totalMembers}.`;
            }

            if (totalMembers > selectedCompetition.maxTeamSize) {
                return `This competition allows at most ${selectedCompetition.maxTeamSize} members including the leader. You currently have ${totalMembers}.`;
            }
        }

        return null;
    };

    const handleSubmit = async () => {
        setSubmitError(null);
        setSubmitSuccess(null);

        if (!turnstileSiteKey) {
            const message = "Cloudflare is not configured. Please contact support.";
            setSubmitError(message);
            toast.error(message);
            return;
        }

        if (!turnstileToken) {
            const message = "Please complete the Cloudflare verification before submitting.";
            setSubmitError(message);
            toast.error(message);
            setActiveTab("payment");
            return;
        }

        const teamError = validateTeamTab();
        if (teamError) {
            setSubmitError(teamError);
            toast.error(teamError);
            setActiveTab("team");
            return;
        }

        const leaderError = validateLeaderTab();
        if (leaderError) {
            setSubmitError(leaderError);
            toast.error(leaderError);
            setActiveTab("leader");
            return;
        }

        const membersError = validateMembersTab();
        if (membersError) {
            setSubmitError(membersError);
            toast.error(membersError);
            setActiveTab("members");
            return;
        }

        if (!formData.paymentScreenshot) {
            const message = "Please upload the payment screenshot before submitting.";
            setSubmitError(message);
            toast.error(message);
            return;
        }

        setIsSubmitting(true);

        try {
            const competitionId = formData.competitionId.trim();
            const validMembers = getValidMembers();
            await submitPublicRegistration({
                competitionId,
                teamName: formData.teamName.trim(),
                referenceCode: formData.referenceCode.trim() || undefined,
                turnstileToken,
                leaderFullName: formData.leaderName.trim(),
                leaderEmail: formData.leaderEmail.trim(),
                leaderCnic: normalizeCnic(formData.leaderCnic),
                leaderPhone: formData.leaderPhone.trim() || undefined,
                leaderInstitution: formData.institutionName.trim() || undefined,
                leaderRollNumber: formData.leaderRollNumber.trim() || undefined,
                members: validMembers.map((m) => ({
                    fullName: m.fullName.trim(),
                    email: m.email.trim(),
                    cnic: normalizeCnic(m.cnic || ""),
                    phone: m.phone?.trim() || undefined,
                    institution: m.institution?.trim() || undefined,
                    rollNumber: m.rollNumber?.trim() || undefined,
                })),
                paymentScreenshot: formData.paymentScreenshot,
                isEarlyBird: earlyBirdLimit > 0,
            });

            const successMessage =
                "Registration submitted successfully. You will receive a confirmation email soon.";
            setSubmitSuccess(successMessage);
            toast.success(successMessage);
            setIsSubmitted(true);
        } catch (error: any) {
            const message =
                error?.message || "Failed to submit registration. Please try again.";
            setSubmitError(message);
            toast.error(message);
            setTurnstileToken("");
            if (window.turnstile && turnstileWidgetIdRef.current) {
                window.turnstile.reset(turnstileWidgetIdRef.current);
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDownloadRulebook = () => {
        window.open("/modules", "_blank");
    };

    const tabs = [
        { id: "team" as TabType, label: "TEAM_INFORMATION", section: "01" },
        { id: "leader" as TabType, label: "LEADER_DATA", section: "02" },
        { id: "members" as TabType, label: "MEMBERS_DATA", section: "03" },
        { id: "payment" as TabType, label: "PAYMENT_AUTHENTICATED", section: "04" },
    ];

    const categories = Array.from(
        new Set(competitions.map((c) => c.category))
    ).sort();

    const visibleCompetitions =
        selectedCategory && categories.includes(selectedCategory)
            ? competitions.filter((c) => c.category === selectedCategory)
            : competitions;

    const selectClassNames = {
        trigger: "bg-dark-red border-2 border-gray-800 hover:border-gray-700 h-[56px]",
        value: "text-white",
        listbox: "bg-dark-red",
        popoverContent: "bg-dark-red",
    };

    const canViewReceipt = Boolean(formData.paymentScreenshot && turnstileToken);
    const paymentStatus = canViewReceipt ? "SUBMITTED" : "NONE";
    const teamMembersCount = getValidMembers().length + 1;
    const selectedCompetition = competitions.find(
        (comp) => comp.id === formData.competitionId
    );

    const normalFee = selectedCompetition?.fee ?? 0;
    const earlyBirdFee = selectedCompetition?.earlyBirdFee ?? 0;
    const earlyBirdLimit = selectedCompetition?.earlyBirdLimit ?? 0;
    const isEarlyBirdActive = earlyBirdLimit > 0;
    const amountDue = selectedCompetition
        ? (isEarlyBirdActive ? earlyBirdFee : normalFee)
        : null;

    const discountApplied =
        isEarlyBirdActive ? Math.max(0, normalFee - earlyBirdFee) : 0;

    if (isSubmitted) {
        const handleDownloadReceipt = async () => {
            const el = document.getElementById("registration-receipt-capture");
            if (!el) return;
            const { toPng } = await import("html-to-image");
            const dataUrl = await toPng(el, {
                pixelRatio: 2,
                filter: (node) => !(node instanceof HTMLElement && node.hasAttribute("data-no-capture")),
            });
            const link = document.createElement("a");
            link.download = `receipt-${formData.teamName || "registration"}.png`;
            link.href = dataUrl;
            link.click();
        };

        return (
            <div className="space-y-8 animate-fade-in">
                {/* Success Banner */}
                <div className="bg-dark-red-1 border border-green-600/50 p-6 md:p-8 relative overflow-hidden">
                    {/* Green glow accent */}
                    <div className="absolute top-0 left-0 h-full w-[6px] bg-green-500" />
                    <div className="pl-4">
                        <p className="text-green-400 text-xs font-mono mb-2 tracking-widest uppercase">STATUS :: REGISTRATION_COMPLETE</p>
                        <h2 className="text-2xl md:text-3xl font-bold text-white uppercase mb-2">Entry Received</h2>
                        <p className="text-gray-400 text-sm md:text-base">
                            Your registration has been submitted successfully. A confirmation email will be sent to you shortly.
                        </p>
                    </div>
                </div>

                {/* Completed Receipt */}
                <div id="registration-receipt-capture">
                    <RegistrationReceipt
                        teamName={formData.teamName}
                        leaderName={formData.leaderName}
                        moduleName={selectedCompetition?.name}
                        teamMembers={teamMembersCount}
                        moduleFee={normalFee}
                        discount={discountApplied}
                        paymentStatus="SUBMITTED"
                        onDownloadRulebook={handleDownloadRulebook}
                        onDownloadReceipt={handleDownloadReceipt}
                    />
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <Script
                src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
                strategy="afterInteractive"
                onLoad={() => setIsTurnstileScriptReady(true)}
            />

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 md:gap-4 mb-8">
                {tabs.map((tab) => {
                    const active = activeTab === tab.id

                    return (
                        <button
                            key={tab.id}
                            // onClick={() => setActiveTab(tab.id)}
                            className={`bg-dark-red-1 relative pl-4 md:pl-6 pr-2 md:pr-4 py-3 md:py-6 text-left transition-all
        ${active
                                    ? "shadow-[0_0_20px_rgba(215,29,34,0.6)]"
                                    : ""}
        `}
                        >
                            {/* Left red bar */}
                            <div
                                className={`absolute left-0 top-0 h-full w-[6px] md:w-[8px] ${active ? "bg-red-primary" : "bg-red-primary"
                                    }`}
                            />

                            <p
                                className={`text-[10px] md:text-xs font-medium mb-1 tracking-wider ${active ? "text-white" : "text-gray-600"
                                    }`}
                            >
                                SECTION_{tab.section}
                            </p>

                            <p
                                className={`text-[10px] md:text-sm font-bold uppercase tracking-wide leading-tight ${active ? "text-white" : "text-gray-500"
                                    }`}
                            >
                                {tab.label}
                            </p>
                        </button>
                    )
                })}
            </div>

            {/* Form Content */}
            <div className="bg-dark-red-1 border border-gray-800 p-6 md:p-8">
                <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 uppercase">
                    {tabs.find((t) => t.id === activeTab)?.label}
                </h2>

                {/* Team Information Tab */}
                {activeTab === "team" && (
                    <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="text-red-primary text-xs font-mono mb-2 block">01</label>
                                <Input
                                    placeholder="TEAM_NAME"
                                    value={formData.teamName}
                                    onValueChange={(value) => updateFormData("teamName", value)}
                                    classNames={{
                                        input: "bg-dark-red text-white placeholder:text-gray-600",
                                        inputWrapper: "bg-dark-red border-2 border-gray-800 hover:border-gray-700 h-[56px]",
                                    }}
                                    radius="none"
                                />
                            </div>
                            <div>
                                <label className="text-red-primary text-xs font-mono mb-2 block">02</label>
                                <Select
                                    placeholder="FILTER_BY_CATEGORY"
                                    selectedKeys={selectedCategory ? [selectedCategory] : []}
                                    onSelectionChange={(keys) => {
                                        const value = (Array.from(keys)[0] as string) || "";
                                        setSelectedCategory(value);
                                        // Clear competition selection when category changes
                                        updateFormData("competitionId", "");
                                    }}
                                    isDisabled={isLoadingCompetitions || !!competitionError}
                                    classNames={selectClassNames}
                                    scrollShadowProps={{ hideScrollBar: false }}
                                    listboxProps={{
                                        onWheel: (e) => e.stopPropagation(),
                                    }}
                                    radius="none"
                                >
                                    <SelectItem key="" textValue="All categories">
                                        <span className="text-xs md:text-sm text-gray-300">
                                            All Categories
                                        </span>
                                    </SelectItem>
                                    {
                                        categories.map((category) => (
                                            <SelectItem key={category} textValue={category}>
                                                <span className="text-xs md:text-sm text-white">
                                                    {category}
                                                </span>
                                            </SelectItem>
                                        )) as any
                                    }
                                </Select>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="text-red-primary text-xs font-mono mb-2 block">03</label>
                                <Select
                                    placeholder={
                                        isLoadingCompetitions
                                            ? "Loading competitions..."
                                            : "SELECT_COMPETITION"
                                    }
                                    selectedKeys={
                                        formData.competitionId ? [formData.competitionId] : []
                                    }
                                    disabledKeys={visibleCompetitions
                                        .filter((comp) => comp.capacityLimit <= 0)
                                        .map((comp) => comp.id)}
                                    onSelectionChange={(keys) => {
                                        const value = Array.from(keys)[0] as string;
                                        if (!value) return;
                                        const picked = visibleCompetitions.find((comp) => comp.id === value);
                                        if (picked && picked.capacityLimit <= 0) {
                                            toast.error("This competition is full. Please select another.");
                                            return;
                                        }
                                        updateFormData("competitionId", value);
                                    }}
                                    isDisabled={isLoadingCompetitions || !!competitionError}
                                    classNames={selectClassNames}
                                    scrollShadowProps={{ hideScrollBar: false }}
                                    listboxProps={{
                                        onWheel: (e) => e.stopPropagation(),
                                    }}
                                    radius="none"
                                >
                                    {visibleCompetitions.map((comp) => {
                                        const isFull = comp.capacityLimit <= 0;

                                        return (
                                            <SelectItem
                                                key={comp.id}
                                                textValue={`${comp.name} (${comp.category})${isFull ? " — FULL" : ""}`}
                                            >
                                                <div className="flex flex-col text-left">
                                                    <div className="flex items-center gap-2">
                                                        <span className={`text-xs md:text-sm font-semibold ${isFull ? "text-gray-500" : "text-white"}`}>
                                                            {comp.name}
                                                        </span>
                                                        {isFull && (
                                                            <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 bg-red-primary/20 text-red-primary border border-red-primary/40 uppercase tracking-wider">
                                                                SEATS_FULL
                                                            </span>
                                                        )}
                                                    </div>
                                                    <span className="text-[10px] text-gray-400">
                                                        {comp.category} • {comp.minTeamSize}–
                                                        {comp.maxTeamSize} members •{" "}
                                                        {isFull ? (
                                                            <span className="text-red-primary/70">Registration closed</span>
                                                        ) : comp.earlyBirdLimit > 0 ? (
                                                            <>
                                                                <span className="text-red-primary line-through">PKR {comp.fee}</span>{" "}
                                                                <span className="text-white font-semibold">PKR {comp.earlyBirdFee}</span>
                                                            </>
                                                        ) : (
                                                            <>PKR {comp.fee}</>
                                                        )}
                                                    </span>
                                                </div>
                                            </SelectItem>
                                        );
                                    })}
                                </Select>
                            </div>
                            <div>
                                <label className="text-red-primary text-xs font-mono mb-2 block">04 (OPTIONAL)</label>
                                <Input
                                    placeholder="REFERENCE_CODE"
                                    value={formData.referenceCode}
                                    onValueChange={(value) => updateFormData("referenceCode", value)}
                                    classNames={{
                                        input: "bg-dark-red text-white placeholder:text-gray-600",
                                        inputWrapper: "bg-dark-red border-2 border-gray-800 hover:border-gray-700 h-[56px]",
                                    }}
                                    radius="none"
                                />
                            </div>
                        </div>

                        {competitionError && (
                            <p className="text-red-400 text-xs md:text-sm font-mono">
                                {competitionError}
                            </p>
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="text-red-primary text-xs font-mono mb-2 block">05</label>
                                <InstitutionAutocomplete
                                    placeholder="INSTITUTION_NAME"
                                    value={formData.institutionName}
                                    options={institutionOptions}
                                    onValueChange={(value) => updateFormData("institutionName", value)}
                                    onAddOption={addInstitutionOption}
                                />
                            </div>
                        </div>
                    </div>
                )}

                {/* Leader Data Tab */}
                {activeTab === "leader" && (
                    <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Input
                                placeholder="LEADER_NAME"
                                value={formData.leaderName}
                                onValueChange={(value) => updateFormData("leaderName", value)}
                                classNames={{
                                    input: "bg-dark-red text-white placeholder:text-gray-600",
                                    inputWrapper: "bg-dark-red border-2 border-gray-800 hover:border-gray-700 h-[56px]",
                                }}
                                radius="none"
                            />
                            <Input
                                placeholder="EMAIL"
                                type="email"
                                value={formData.leaderEmail}
                                onValueChange={(value) => updateFormData("leaderEmail", value)}
                                classNames={{
                                    input: "bg-dark-red text-white placeholder:text-gray-600",
                                    inputWrapper: "bg-dark-red border-2 border-gray-800 hover:border-gray-700 h-[56px]",
                                }}
                                radius="none"
                            />
                        </div>
                        <div className={`grid grid-cols-1 md:grid-cols-2 ${requiresRollNumbers ? "lg:grid-cols-3" : ""} gap-6`}>
                            <Input
                                placeholder="PHONE_NUMBER"
                                type="tel"
                                inputMode="numeric"
                                value={formData.leaderPhone}
                                onValueChange={(value) =>
                                    updateFormData("leaderPhone", formatPhoneInput(value))
                                }
                                classNames={{
                                    input: "bg-dark-red text-white placeholder:text-gray-600",
                                    inputWrapper: "bg-dark-red border-2 border-gray-800 hover:border-gray-700 h-[56px]",
                                }}
                                radius="none"
                            />
                            <Input
                                placeholder="CNIC"
                                type="text"
                                inputMode="numeric"
                                value={formData.leaderCnic}
                                onValueChange={(value) =>
                                    updateFormData("leaderCnic", formatCnicDisplay(value))
                                }
                                classNames={{
                                    input: "bg-dark-red text-white placeholder:text-gray-600",
                                    inputWrapper: "bg-dark-red border-2 border-gray-800 hover:border-gray-700 h-[56px]",
                                }}
                                radius="none"
                            />
                            {requiresRollNumbers && (
                                <Input
                                    placeholder="ROLL_NUMBER (e.g. 22K4581)"
                                    type="text"
                                    value={formData.leaderRollNumber}
                                    onValueChange={(value) =>
                                        updateFormData("leaderRollNumber", formatRollNumberInput(value))
                                    }
                                    classNames={{
                                        input: "bg-dark-red text-white placeholder:text-gray-600 uppercase",
                                        inputWrapper: "bg-dark-red border-2 border-gray-800 hover:border-gray-700 h-[56px]",
                                    }}
                                    radius="none"
                                />
                            )}
                        </div>
                    </div>
                )}

                {/* Members Data Tab */}
                {activeTab === "members" && (
                    <div className="space-y-6">
                        <p className="text-gray-400 text-sm mb-4">Add optional team members. Leave a row fully empty to ignore it.</p>

                        {formData.members.map((member, index) => (
                            <div key={`member-${index}`} className="space-y-4 border border-gray-800 p-4 md:p-5">
                                <div className="flex items-center justify-between">
                                    <p className="text-red-primary text-xs font-mono">MEMBER_{index + 1}</p>
                                    {formData.members.length > 1 && (
                                        <Button
                                            className="bg-gray-800 hover:bg-gray-700 text-white text-xs font-mono"
                                            radius="none"
                                            onPress={() => removeMember(index)}
                                        >
                                            REMOVE
                                        </Button>
                                    )}
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <Input
                                        placeholder="FULL_NAME"
                                        value={member.fullName}
                                        onValueChange={(value) => updateMember(index, "fullName", value)}
                                        classNames={{
                                            input: "bg-dark-red text-white placeholder:text-gray-600",
                                            inputWrapper: "bg-dark-red border-2 border-gray-800 hover:border-gray-700 h-[56px]",
                                        }}
                                        radius="none"
                                    />
                                    <Input
                                        placeholder="EMAIL"
                                        type="email"
                                        value={member.email}
                                        onValueChange={(value) => updateMember(index, "email", value)}
                                        classNames={{
                                            input: "bg-dark-red text-white placeholder:text-gray-600",
                                            inputWrapper: "bg-dark-red border-2 border-gray-800 hover:border-gray-700 h-[56px]",
                                        }}
                                        radius="none"
                                    />
                                </div>

                                <div className={`grid grid-cols-1 md:grid-cols-2 ${memberRequiresRollNumber(member) ? "lg:grid-cols-4" : "lg:grid-cols-3"} gap-4`}>
                                    <Input
                                        placeholder="CNIC"
                                        type="text"
                                        inputMode="numeric"
                                        value={member.cnic}
                                        onValueChange={(value) =>
                                            updateMember(index, "cnic", formatCnicDisplay(value))
                                        }
                                        classNames={{
                                            input: "bg-dark-red text-white placeholder:text-gray-600",
                                            inputWrapper: "bg-dark-red border-2 border-gray-800 hover:border-gray-700 h-[56px]",
                                        }}
                                        radius="none"
                                    />
                                    <Input
                                        placeholder="PHONE (OPTIONAL)"
                                        value={member.phone || ""}
                                        type="tel"
                                        inputMode="numeric"
                                        onValueChange={(value) =>
                                            updateMember(index, "phone", formatPhoneInput(value))
                                        }
                                        classNames={{
                                            input: "bg-dark-red text-white placeholder:text-gray-600",
                                            inputWrapper: "bg-dark-red border-2 border-gray-800 hover:border-gray-700 h-[56px]",
                                        }}
                                        radius="none"
                                    />
                                    {memberRequiresRollNumber(member) && (
                                        <Input
                                            placeholder="ROLL_NUMBER (e.g. 22K4581)"
                                            type="text"
                                            value={member.rollNumber || ""}
                                            onValueChange={(value) =>
                                                updateMember(index, "rollNumber", formatRollNumberInput(value))
                                            }
                                            classNames={{
                                                input: "bg-dark-red text-white placeholder:text-gray-600 uppercase",
                                                inputWrapper: "bg-dark-red border-2 border-gray-800 hover:border-gray-700 h-[56px]",
                                            }}
                                            radius="none"
                                        />
                                    )}
                                    <InstitutionAutocomplete
                                        placeholder="INSTITUTION"
                                        value={member.institution || ""}
                                        options={institutionOptions}
                                        onValueChange={(value) => updateMember(index, "institution", value)}
                                        onAddOption={addInstitutionOption}
                                    />
                                </div>
                            </div>
                        ))}

                        <Button
                            className="bg-gray-800 hover:bg-gray-700 text-white font-mono text-sm"
                            radius="none"
                            onPress={addMember}
                            isDisabled={
                                (() => {
                                    if (!selectedCompetition) return false;
                                    const maxAdditionalMembers = Math.max(
                                        selectedCompetition.maxTeamSize - 1,
                                        0
                                    );
                                    return formData.members.length >= maxAdditionalMembers;
                                })()
                            }
                        >
                            + ADD_MEMBER
                        </Button>
                    </div>
                )}

                {/* Payment Tab */}
                {activeTab === "payment" && (
                    <div className="space-y-8">

                        {/* AMOUNT DUE BANNER */}
                        <div className="bg-dark-red-1 border border-red-primary/40 p-5 md:p-6 relative overflow-hidden">
                            <div className="absolute top-0 left-0 h-full w-[6px] bg-red-primary" />
                            <div className="pl-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                                <div>
                                    <p className="text-red-primary text-xs sm:text-sm font-mono tracking-widest uppercase mb-1">AMOUNT_DUE</p>
                                    <p className="text-gray-400 text-xs sm:text-sm font-mono">
                                        {isEarlyBirdActive ? "EARLY_BIRD_PRICING_APPLIED" : "STANDARD_PRICING"}
                                    </p>
                                </div>
                                <div className="text-right">
                                    {amountDue !== null ? (
                                        <p className="text-white text-2xl md:text-3xl font-bold font-mono">
                                            PKR <span className="text-red-primary">{amountDue}</span>
                                        </p>
                                    ) : (
                                        <p className="text-gray-500 text-sm font-mono">---</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Upper account information section */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            <div className="lg:col-span-2 space-y-3">
                                <p className="text-gray-300 text-sm md:text-base">
                                    Complete your registration by paying the module fee using the account details
                                    shared here. Once the payment is successful, upload a clear screenshot of the
                                    transaction for verification.
                                </p>
                                <p className="text-gray-500 text-xs md:text-sm">
                                    The payment verification team will match your screenshot with the registration
                                    data you&apos;ve entered in the previous sections.
                                </p>
                            </div>
                            {/* Payment Details */}
                            <PaymentDetails />
                        </div>

                        {/* Screenshot upload field */}
                        <div className="space-y-4">
                            <div>
                                <label className="text-red-primary text-xs font-mono mb-2 block">01</label>
                                <div className="bg-dark-red border-2 border-dashed border-gray-700 hover:border-red-primary transition-colors p-5 md:p-6 flex flex-col items-center justify-center text-center">
                                    <p className="font-mono text-xs md:text-sm text-gray-300 mb-1">
                                        UPLOAD_PAYMENT_SCREENSHOT
                                    </p>
                                    <p className="text-[11px] md:text-xs text-gray-500 mb-4">
                                        Supported formats: PNG, JPG, JPEG. Maximum file size 5MB.
                                    </p>
                                    <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 bg-red-primary hover:bg-red-700 text-white text-xs md:text-sm font-mono">
                                        <span>CHOOSE_FILE</span>
                                        <input
                                            type="file"
                                            accept=".png,.jpg,.jpeg"
                                            className="hidden"
                                            onChange={(event) => {
                                                const file = event.target.files?.[0] ?? null;
                                                const allowedTypes = ["image/png", "image/jpeg"];

                                                if (file && (!allowedTypes.includes(file.type) || file.size > 5 * 1024 * 1024)) {
                                                    const message = "Please upload a PNG/JPG/JPEG image up to 5MB.";
                                                    setSubmitError(message);
                                                    toast.error(message);
                                                    return;
                                                }

                                                setPaymentPreviewUrl((previous) => {
                                                    if (previous) URL.revokeObjectURL(previous);
                                                    return file ? URL.createObjectURL(file) : null;
                                                });

                                                updateFormData("paymentScreenshot", file);
                                            }}
                                        />
                                    </label>
                                    {formData.paymentScreenshot && (
                                        <p className="mt-3 text-xs md:text-sm text-gray-300 max-w-full truncate">
                                            Selected: {formData.paymentScreenshot.name}
                                        </p>
                                    )}
                                </div>
                            </div>

                            {paymentPreviewUrl && formData.paymentScreenshot && (
                                <div className="mt-2">
                                    <p className="text-[11px] md:text-xs text-gray-400 mb-2 font-mono">
                                        SCREENSHOT_PREVIEW
                                    </p>
                                    <div className="bg-black/40 border border-gray-800 p-2 md:p-3">
                                        <img
                                            src={paymentPreviewUrl}
                                            alt="Payment screenshot preview"
                                            className="w-full max-h-72 object-contain rounded-sm"
                                        />
                                    </div>
                                </div>
                            )}

                            {/* Side note / instructions */}
                            <div className="bg-dark-red/70 border border-yellow-600/60 p-3 md:p-4">
                                <p className="text-[11px] md:text-xs text-yellow-300 font-mono mb-1">
                                    IMPORTANT_NOTE
                                </p>
                                <ul className="text-[11px] md:text-xs text-yellow-100 space-y-1 list-disc list-inside">
                                    <li>
                                        Screenshot must clearly show the <span className="font-semibold">consumer name</span>.
                                    </li>
                                    <li>
                                        Screenshot must clearly show the{" "}
                                        <span className="font-semibold">transaction ID / UPI reference number</span>.
                                    </li>
                                    <li>Ensure date, time and paid amount are visible and readable.</li>
                                    <li>Use the same participant / team name here as in the payment details.</li>
                                </ul>
                            </div>

                            <div className="bg-dark-red border border-gray-800 p-2.5 sm:p-4 md:p-5 space-y-3">
                                <p className="text-red-primary text-xs font-mono tracking-widest uppercase">
                                    02 // CLOUDFLARE_VERIFICATION
                                </p>
                                {!turnstileSiteKey ? (
                                    <p className="text-yellow-300 text-xs md:text-sm">
                                        Turnstile site key is missing. Set NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITE_KEY to enable submission.
                                    </p>
                                ) : (
                                    <>
                                        <p className="text-gray-400 text-xs md:text-sm">
                                            Complete this verification before final submission.
                                        </p>
                                        <div className="w-full overflow-x-auto sm:overflow-hidden">
                                            <div
                                                ref={turnstileContainerRef}
                                                className="min-h-[66px] w-[300px] max-w-full"
                                            />
                                        </div>
                                        
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex justify-between mt-8 pt-6 border-t border-gray-800">
                    <Button
                        className="bg-gray-800 hover:bg-gray-700 text-white font-mono"
                        radius="none"
                        isDisabled={activeTab === "team" || isSubmitting}
                        onPress={() => {
                            const currentIndex = tabs.findIndex((t) => t.id === activeTab);
                            if (currentIndex > 0) setActiveTab(tabs[currentIndex - 1].id);
                        }}
                    >
                        ← PREVIOUS
                    </Button>
                    <Button
                        className="bg-red-primary hover:bg-red-700 text-white font-mono disabled:opacity-60 disabled:cursor-not-allowed"
                        radius="none"
                        isDisabled={isSubmitting}
                        onPress={() => {
                            const currentIndex = tabs.findIndex((t) => t.id === activeTab);

                            if (activeTab === "payment") {
                                // Validate payment screenshot first
                                if (!formData.paymentScreenshot) {
                                    const message = "Please upload the payment screenshot before reviewing.";
                                    setSubmitError(message);
                                    toast.error(message);
                                    return;
                                }

                                if (!turnstileToken) {
                                    const message = "Please complete Cloudflare verification before reviewing the receipt.";
                                    setSubmitError(message);
                                    toast.error(message);
                                    return;
                                }

                                // Scroll to receipt
                                receiptRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
                                return;
                            }

                            if (activeTab === "team") {
                                const teamError = validateTeamTab();
                                if (teamError) {
                                    setSubmitError(teamError);
                                    toast.error(teamError);
                                    return;
                                }
                            }

                            if (activeTab === "leader") {
                                const leaderError = validateLeaderTab();
                                if (leaderError) {
                                    setSubmitError(leaderError);
                                    toast.error(leaderError);
                                    return;
                                }
                            }

                            if (activeTab === "members") {
                                const membersError = validateMembersTab();
                                if (membersError) {
                                    setSubmitError(membersError);
                                    toast.error(membersError);
                                    return;
                                }
                            }

                            if (currentIndex < tabs.length - 1) {
                                setActiveTab(tabs[currentIndex + 1].id);
                            }
                        }}
                    >
                        {activeTab === "payment" ? "REVIEW RECEIPT →" : "NEXT →"}
                    </Button>
                </div>
            </div>

            {/* Registration Receipt */}
            <div ref={receiptRef} className="scroll-mt-8">
                {canViewReceipt ? (
                    <RegistrationReceipt
                        teamName={formData.teamName}
                        leaderName={formData.leaderName}
                        moduleName={selectedCompetition?.name}
                        teamMembers={teamMembersCount}
                        moduleFee={normalFee}
                        discount={discountApplied}
                        paymentStatus={paymentStatus}
                        onDownloadRulebook={handleDownloadRulebook}
                        onConfirmEntry={handleSubmit}
                        isSubmitting={isSubmitting}
                    />
                ) : (
                    <div className="bg-dark-red-1 border border-gray-800 p-6 md:p-8 font-mono">
                        <p className="text-red-primary text-xs tracking-widest uppercase mb-2">RECEIPT_LOCKED</p>
                        <p className="text-gray-300 text-sm md:text-base">
                            Upload the payment screenshot and complete Cloudflare verification to review your receipt.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
