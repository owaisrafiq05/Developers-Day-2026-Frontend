"use client";

import { useState } from "react";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Select, SelectItem } from "@heroui/select";
import { Link } from "@heroui/link";
import RegistrationReceipt from "./registration-receipt";

type TabType = "team" | "leader" | "members" | "payment";

interface FormData {
    teamName: string;
    institutionName: string;
    moduleCategory: string;
    moduleName: string;
    referenceCode: string;
    leaderName: string;
    leaderEmail: string;
    leaderPhone: string;
    studentId: string;
    members: Array<{ name: string; email: string }>;
    transactionId: string;
    paymentMethod: string;
}

export default function RegistrationForm() {
    const [activeTab, setActiveTab] = useState<TabType>("team");
    const [formData, setFormData] = useState<FormData>({
        teamName: "",
        institutionName: "",
        moduleCategory: "",
        moduleName: "",
        referenceCode: "",
        leaderName: "",
        leaderEmail: "",
        leaderPhone: "",
        studentId: "",
        members: [],
        transactionId: "",
        paymentMethod: "",
    });

    const updateFormData = (field: keyof FormData, value: any) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleDownloadRulebook = () => {
        if (formData.moduleName) {
            // Fetch and download rulebook for the selected module
            const rulebookUrl = `/rulebooks/${formData.moduleName.toLowerCase().replace(/\s+/g, "-")}.pdf`;
            window.open(rulebookUrl, "_blank");
        }
    };

    const tabs = [
        { id: "team" as TabType, label: "TEAM_INFORMATION", section: "01" },
        { id: "leader" as TabType, label: "LEADER_DATA", section: "02" },
        { id: "members" as TabType, label: "MEMBERS_DATA", section: "03" },
        { id: "payment" as TabType, label: "PAYMENT_AUTHENTICATED", section: "04" },
    ];

    const modules = [
        { value: "coding", label: "Code Coding" },
        { value: "software", label: "Software Engineering" },
        { value: "tech", label: "Tech Quest" },
        { value: "build", label: "Build & Break" },
        { value: "ai", label: "AI & Data" },
    ];

    const moduleNames = [
        { value: "design-duel", label: "Design Duel" },
        { value: "code-combat", label: "Code Combat" },
        { value: "tech-trivia", label: "Tech Trivia" },
    ];

    const paymentStatus = formData.transactionId ? "SUBMITTED" : "NONE";
    const teamMembersCount = formData.members.filter((m) => m.name).length + 1; // +1 for leader

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
                                <label className="text-red-primary text-xs font-mono mb-2 block">02</label>
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

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="text-red-primary text-xs font-mono mb-2 block">03</label>
                                <Select
                                    placeholder="MODULE_CATEGORY"
                                    selectedKeys={formData.moduleCategory ? [formData.moduleCategory] : []}
                                    onSelectionChange={(keys) => {
                                        const value = Array.from(keys)[0] as string;
                                        updateFormData("moduleCategory", value);
                                    }}
                                    classNames={{
                                        trigger: "bg-dark-red border-2 border-gray-800 hover:border-gray-700 h-[56px]",
                                        value: "text-white",
                                        listbox: "bg-dark-red",
                                        popoverContent: "bg-dark-red",
                                    }}
                                    radius="none"
                                >
                                    {modules.map((module) => (
                                        <SelectItem key={module.value}>
                                            {module.label}
                                        </SelectItem>
                                    ))}
                                </Select>
                            </div>
                            <div>
                                <label className="text-red-primary text-xs font-mono mb-2 block">04</label>
                                <Select
                                    placeholder="MODULE_NAME"
                                    selectedKeys={formData.moduleName ? [formData.moduleName] : []}
                                    onSelectionChange={(keys) => {
                                        const value = Array.from(keys)[0] as string;
                                        updateFormData("moduleName", value);
                                    }}
                                    classNames={{
                                        trigger: "bg-dark-red border-2 border-gray-800 hover:border-gray-700 h-[56px]",
                                        value: "text-white",
                                        listbox: "bg-dark-red",
                                        popoverContent: "bg-dark-red",
                                    }}
                                    radius="none"
                                >
                                    {moduleNames.map((module) => (
                                        <SelectItem key={module.value}>
                                            {module.label}
                                        </SelectItem>
                                    ))}
                                </Select>
                            </div>
                        </div>

                        <div className="flex items-center gap-2 pt-2">
                            <span className="text-gray-400 text-sm">NOT DECIDED?</span>
                            <Button
                                as={Link}
                                href="/modules"
                                className="bg-red-primary hover:bg-red-700 text-white font-mono text-sm"
                                radius="none"
                                endContent={<span>→</span>}
                            >
                                VIEW_MODULES
                            </Button>
                        </div>

                        {/* Separator */}
                        <div className="border-t border-gray-800 my-8"></div>

                        <div className="w-full">
                            <p className="text-red-primary text-xs font-mono mb-2">05 (OPTIONAL)</p>
                            <Input
                                placeholder="REFERENCE_CODE"
                                value={formData.referenceCode}
                                onValueChange={(value) => updateFormData("referenceCode", value)}
                                classNames={{
                                    input: "bg-dark-red text-white placeholder:text-gray-600",
                                    inputWrapper: "bg-dark-red border-2 border-gray-800 hover:border-gray-700 h-[56px]",
                                }}
                                radius="none"
                                className="max-w-md"
                            />
                        </div>

                        <div className="flex items-center gap-2">
                            <span className="text-gray-400 text-sm">DON'T REMEMBER YOUR EA CODE?</span>
                            <Button
                                className="bg-red-primary hover:bg-red-700 text-white font-mono text-sm"
                                radius="none"
                                endContent={<span>→</span>}
                            >
                                VIEW_CODES
                            </Button>
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
                                placeholder="STUDENT_ID"
                                value={formData.studentId}
                                onValueChange={(value) => updateFormData("studentId", value)}
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
                        <p className="text-gray-400 text-sm mb-4">Add team members (2-4 members)</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Input
                                placeholder="MEMBER_NAME"
                                classNames={{
                                    input: "bg-dark-red text-white placeholder:text-gray-600",
                                    inputWrapper: "bg-dark-red border-2 border-gray-800 hover:border-gray-700 h-[56px]",
                                }}
                                radius="none"
                            />
                            <Input
                                placeholder="EMAIL"
                                type="email"
                                classNames={{
                                    input: "bg-dark-red text-white placeholder:text-gray-600",
                                    inputWrapper: "bg-dark-red border-2 border-gray-800 hover:border-gray-700 h-[56px]",
                                }}
                                radius="none"
                            />
                        </div>
                    </div>
                )}

                {/* Payment Tab */}
                {activeTab === "payment" && (
                    <div className="space-y-6">
                        <p className="text-gray-400 text-sm mb-4">Payment information and verification</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Input
                                placeholder="TRANSACTION_ID"
                                value={formData.transactionId}
                                onValueChange={(value) => updateFormData("transactionId", value)}
                                classNames={{
                                    input: "bg-dark-red text-white placeholder:text-gray-600",
                                    inputWrapper: "bg-dark-red border-2 border-gray-800 hover:border-gray-700 h-[56px]",
                                }}
                                radius="none"
                            />
                            <Input
                                placeholder="PAYMENT_METHOD"
                                value={formData.paymentMethod}
                                onValueChange={(value) => updateFormData("paymentMethod", value)}
                                classNames={{
                                    input: "bg-dark-red text-white placeholder:text-gray-600",
                                    inputWrapper: "bg-dark-red border-2 border-gray-800 hover:border-gray-700 h-[56px]",
                                }}
                                radius="none"
                            />
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
                        className="bg-red-primary hover:bg-red-700 text-white font-mono"
                        radius="none"
                        onPress={() => {
                            const currentIndex = tabs.findIndex((t) => t.id === activeTab);
                            if (currentIndex < tabs.length - 1) {
                                setActiveTab(tabs[currentIndex + 1].id);
                            }
                        }}
                    >
                        {activeTab === "payment" ? "SUBMIT" : "NEXT →"}
                    </Button>
                </div>
            </div>

            {/* Registration Receipt */}
            <RegistrationReceipt
                teamName={formData.teamName}
                leaderName={formData.leaderName}
                moduleName={
                    formData.moduleName
                        ? moduleNames.find((m) => m.value === formData.moduleName)?.label || ""
                        : ""
                }
                teamMembers={teamMembersCount}
                moduleFee={2500}
                discount={0}
                paymentStatus={paymentStatus}
                onDownloadRulebook={handleDownloadRulebook}
            />
        </div>
    );
}
