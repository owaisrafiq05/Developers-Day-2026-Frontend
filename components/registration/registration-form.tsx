"use client"

import { useEffect, useState } from "react";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Select, SelectItem } from "@heroui/select";
import RegistrationReceipt from "./registration-receipt";
import { submitPublicRegistration } from "@/lib/api/registration";
import type { TeamMemberInput } from "@/types/registration";
import type { CompetitionWithCategory } from "@/types/competitions";
import { fetchCompetitionsWithCategory } from "@/lib/api/competitions";

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
    members: TeamMemberInput[];
    paymentScreenshot: File | null;
}

const EMPTY_MEMBER: TeamMemberInput = {
    fullName: "",
    email: "",
    cnic: "",
    phone: "",
    institution: "",
};

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function normalizeCnic(cnic: string): string {
    return cnic.replace(/[^0-9]/g, "");
}

export default function RegistrationForm() {
    const [activeTab, setActiveTab] = useState<TabType>("team");
    const [paymentPreviewUrl, setPaymentPreviewUrl] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);
    const [submitSuccess, setSubmitSuccess] = useState<string | null>(null);
    const [competitions, setCompetitions] = useState<CompetitionWithCategory[]>([]);
    const [isLoadingCompetitions, setIsLoadingCompetitions] = useState(true);
    const [competitionError, setCompetitionError] = useState<string | null>(null);
    const [selectedCategory, setSelectedCategory] = useState<string>("");
    const [formData, setFormData] = useState<FormData>({
        teamName: "",
        competitionId: "",
        institutionName: "",
        referenceCode: "",
        leaderName: "",
        leaderEmail: "",
        leaderPhone: "",
        leaderCnic: "",
        members: [{ ...EMPTY_MEMBER }],
        paymentScreenshot: null,
    });

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

    const addMember = () => {
        if (formData.members.length >= 4) return;
        setFormData((prev) => ({ ...prev, members: [...prev.members, { ...EMPTY_MEMBER }] }));
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
        return null;
    };

    const validateLeaderTab = (): string | null => {
        if (!formData.leaderName.trim()) return "Leader name is required.";
        if (!emailRegex.test(formData.leaderEmail.trim())) return "Please enter a valid leader email.";

        const leaderCnic = normalizeCnic(formData.leaderCnic);
        if (leaderCnic.length < 13) return "Leader CNIC must contain at least 13 digits.";

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
            if (normalizeCnic(member.cnic || "").length < 13) {
                return `Member ${number}: CNIC must contain at least 13 digits.`;
            }
        }
        return null;
    };

    const handleSubmit = async () => {
        setSubmitError(null);
        setSubmitSuccess(null);

        const teamError = validateTeamTab();
        if (teamError) {
            setSubmitError(teamError);
            setActiveTab("team");
            return;
        }

        const leaderError = validateLeaderTab();
        if (leaderError) {
            setSubmitError(leaderError);
            setActiveTab("leader");
            return;
        }

        const membersError = validateMembersTab();
        if (membersError) {
            setSubmitError(membersError);
            setActiveTab("members");
            return;
        }

        if (!formData.paymentScreenshot) {
            setSubmitError("Please upload the payment screenshot before submitting.");
            return;
        }

        setIsSubmitting(true);

        try {
            const validMembers = getValidMembers();
            await submitPublicRegistration({
                competitionId: formData.competitionId.trim(),
                teamName: formData.teamName.trim(),
                referenceCode: formData.referenceCode.trim() || undefined,
                leaderFullName: formData.leaderName.trim(),
                leaderEmail: formData.leaderEmail.trim(),
                leaderCnic: normalizeCnic(formData.leaderCnic),
                leaderPhone: formData.leaderPhone.trim() || undefined,
                leaderInstitution: formData.institutionName.trim() || undefined,
                members: validMembers.map((m) => ({
                    fullName: m.fullName.trim(),
                    email: m.email.trim(),
                    cnic: normalizeCnic(m.cnic || ""),
                    phone: m.phone?.trim() || undefined,
                    institution: m.institution?.trim() || undefined,
                })),
                paymentScreenshot: formData.paymentScreenshot,
            });

            setSubmitSuccess("Registration submitted successfully. You will receive a confirmation email soon.");
        } catch (error: any) {
            setSubmitError(error?.message || "Failed to submit registration. Please try again.");
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

    const paymentStatus = formData.paymentScreenshot ? "SUBMITTED" : "NONE";
    const teamMembersCount = getValidMembers().length + 1;

    return (
        <div className="space-y-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 md:gap-4 mb-8">
                {tabs.map((tab) => {
                    const active = activeTab === tab.id

                    return (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
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
                <h2 className="text-2xl md:text-3xl font-bold mb-8 uppercase">{tabs.find((t) => t.id === activeTab)?.label}</h2>

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
                                <label className="text-red-primary text-xs font-mono mb-2 block">02 (OPTIONAL)</label>
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
                                    classNames={{
                                        trigger:
                                            "bg-dark-red border-2 border-gray-800 hover:border-gray-700 h-[56px]",
                                        value: "text-white",
                                        listbox: "bg-dark-red",
                                        popoverContent: "bg-dark-red",
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
                                    onSelectionChange={(keys) => {
                                        const value = Array.from(keys)[0] as string;
                                        updateFormData("competitionId", value);
                                    }}
                                    isDisabled={isLoadingCompetitions || !!competitionError}
                                    classNames={{
                                        trigger:
                                            "bg-dark-red border-2 border-gray-800 hover:border-gray-700 h-[56px]",
                                        value: "text-white",
                                        listbox: "bg-dark-red",
                                        popoverContent: "bg-dark-red",
                                    }}
                                    radius="none"
                                >
                                    {visibleCompetitions.map((comp) => (
                                        <SelectItem
                                            key={comp.id}
                                            textValue={`${comp.name} (${comp.category})`}
                                        >
                                            <div className="flex flex-col text-left">
                                                <span className="text-xs md:text-sm font-semibold text-white">
                                                    {comp.name}
                                                </span>
                                                <span className="text-[10px] text-gray-400">
                                                    {comp.category} • {comp.minTeamSize}–
                                                    {comp.maxTeamSize} members • PKR {comp.fee}
                                                </span>
                                            </div>
                                        </SelectItem>
                                    ))}
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
                                <Input
                                    placeholder="INSTITUTION_NAME"
                                    value={formData.institutionName}
                                    onValueChange={(value) => updateFormData("institutionName", value)}
                                    classNames={{
                                        input: "bg-dark-red text-white placeholder:text-gray-600",
                                        inputWrapper: "bg-dark-red border-2 border-gray-800 hover:border-gray-700 h-[56px]",
                                    }}
                                    radius="none"
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
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Input
                                placeholder="PHONE_NUMBER"
                                value={formData.leaderPhone}
                                onValueChange={(value) => updateFormData("leaderPhone", value)}
                                classNames={{
                                    input: "bg-dark-red text-white placeholder:text-gray-600",
                                    inputWrapper: "bg-dark-red border-2 border-gray-800 hover:border-gray-700 h-[56px]",
                                }}
                                radius="none"
                            />
                            <Input
                                placeholder="CNIC"
                                value={formData.leaderCnic}
                                onValueChange={(value) => updateFormData("leaderCnic", value)}
                                classNames={{
                                    input: "bg-dark-red text-white placeholder:text-gray-600",
                                    inputWrapper: "bg-dark-red border-2 border-gray-800 hover:border-gray-700 h-[56px]",
                                }}
                                radius="none"
                            />
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

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <Input
                                        placeholder="CNIC"
                                        value={member.cnic}
                                        onValueChange={(value) => updateMember(index, "cnic", value)}
                                        classNames={{
                                            input: "bg-dark-red text-white placeholder:text-gray-600",
                                            inputWrapper: "bg-dark-red border-2 border-gray-800 hover:border-gray-700 h-[56px]",
                                        }}
                                        radius="none"
                                    />
                                    <Input
                                        placeholder="PHONE (OPTIONAL)"
                                        value={member.phone || ""}
                                        onValueChange={(value) => updateMember(index, "phone", value)}
                                        classNames={{
                                            input: "bg-dark-red text-white placeholder:text-gray-600",
                                            inputWrapper: "bg-dark-red border-2 border-gray-800 hover:border-gray-700 h-[56px]",
                                        }}
                                        radius="none"
                                    />
                                    <Input
                                        placeholder="INSTITUTION (OPTIONAL)"
                                        value={member.institution || ""}
                                        onValueChange={(value) => updateMember(index, "institution", value)}
                                        classNames={{
                                            input: "bg-dark-red text-white placeholder:text-gray-600",
                                            inputWrapper: "bg-dark-red border-2 border-gray-800 hover:border-gray-700 h-[56px]",
                                        }}
                                        radius="none"
                                    />
                                </div>
                            </div>
                        ))}

                        <Button
                            className="bg-gray-800 hover:bg-gray-700 text-white font-mono text-sm"
                            radius="none"
                            onPress={addMember}
                            isDisabled={formData.members.length >= 4}
                        >
                            + ADD_MEMBER
                        </Button>
                    </div>
                )}

                {/* Payment Tab */}
                {activeTab === "payment" && (
                    <div className="space-y-8">
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
                            <div className="bg-dark-red border border-gray-800 p-4 md:p-5 space-y-3">
                                <p className="text-red-primary text-xs font-mono">PAYMENT_ACCOUNT_DETAILS</p>
                                <div className="space-y-2 text-xs md:text-sm">
                                    <div className="flex justify-between gap-4">
                                        <span className="text-gray-500">ACCOUNT_NAME</span>
                                        <span className="text-white font-medium text-right">
                                            DEVELOPERS DAY COMMITTEE
                                        </span>
                                    </div>
                                    <div className="flex justify-between gap-4">
                                        <span className="text-gray-500">ACCOUNT_NUMBER</span>
                                        <span className="text-white font-medium text-right">
                                            XXXX XXXX XXXX 1234
                                        </span>
                                    </div>
                                    <div className="flex justify-between gap-4">
                                        <span className="text-gray-500">IFSC_CODE</span>
                                        <span className="text-white font-medium text-right">
                                            ABCD0123456
                                        </span>
                                    </div>
                                    <div className="flex justify-between gap-4">
                                        <span className="text-gray-500">UPI_ID</span>
                                        <span className="text-white font-medium text-right">
                                            DEV-DAY@UPI
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {submitError && (
                            <p className="mt-2 text-xs md:text-sm text-red-400 font-mono">
                                {submitError}
                            </p>
                        )}
                        {submitSuccess && (
                            <p className="mt-2 text-xs md:text-sm text-emerald-400 font-mono">
                                {submitSuccess}
                            </p>
                        )}

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
                                                    setSubmitError("Please upload a PNG/JPG/JPEG image up to 5MB.");
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
                        </div>
                    </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex justify-between mt-8 pt-6 border-t border-gray-800">
                    <Button
                        className="bg-gray-800 hover:bg-gray-700 text-white font-mono"
                        radius="none"
                        isDisabled={activeTab === "team"}
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
                                handleSubmit();
                                return;
                            }

                            if (activeTab === "team") {
                                const teamError = validateTeamTab();
                                if (teamError) {
                                    setSubmitError(teamError);
                                    return;
                                }
                            }

                            if (activeTab === "leader") {
                                const leaderError = validateLeaderTab();
                                if (leaderError) {
                                    setSubmitError(leaderError);
                                    return;
                                }
                            }

                            if (activeTab === "members") {
                                const membersError = validateMembersTab();
                                if (membersError) {
                                    setSubmitError(membersError);
                                    return;
                                }
                            }

                            if (currentIndex < tabs.length - 1) {
                                setActiveTab(tabs[currentIndex + 1].id);
                            }
                        }}
                    >
                        {activeTab === "payment" ? (isSubmitting ? "SUBMITTING..." : "SUBMIT") : "NEXT →"}
                    </Button>
                </div>
            </div>

            {/* Registration Receipt */}
            <RegistrationReceipt
                teamName={formData.teamName}
                leaderName={formData.leaderName}
                moduleName={formData.competitionId}
                teamMembers={teamMembersCount}
                moduleFee={2500}
                discount={0}
                paymentStatus={paymentStatus}
                onDownloadRulebook={handleDownloadRulebook}
            />
        </div>
    );
}
