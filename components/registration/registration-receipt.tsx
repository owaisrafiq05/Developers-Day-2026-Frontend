"use client";

import { useEffect, useState } from "react";
import { Button } from "@heroui/button";
import { CheckCircleIcon, DocumentArrowDownIcon } from "@heroicons/react/24/solid";

interface RegistrationReceiptProps {
    teamName?: string;
    leaderName?: string;
    moduleName?: string;
    teamMembers?: number;
    moduleFee?: number;
    discount?: number;
    paymentStatus?: "SUBMITTED" | "PENDING" | "NONE";
    onDownloadRulebook?: () => void;
}

export default function RegistrationReceipt({
    teamName = "",
    leaderName = "",
    moduleName = "",
    teamMembers = 0,
    moduleFee = 2500,
    discount = 0,
    paymentStatus = "NONE",
    onDownloadRulebook,
}: RegistrationReceiptProps) {
    const totalFee = moduleFee - discount;

    const [timestamp, setTimestamp] = useState<{
        date: string;
        time: string;
    }>({
        date: "--/--/----",
        time: "--:--:-- --",
    });

    useEffect(() => {
        const now = new Date();
        const date = now.toLocaleDateString("en-US", {
            month: "2-digit",
            day: "2-digit",
            year: "numeric",
        });
        const time = now.toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: true,
        });
        setTimestamp({ date, time });
    }, []);

    return (
        <div className="bg-dark-red-4 border-2 border-red-primary p-6 md:p-8 relative font-mono">
            {/* Corner Accents */}
            <div className="absolute top-0 left-0 w-6 h-6 border-t-4 border-l-4 border-red-primary"></div>
            <div className="absolute top-0 right-0 w-6 h-6 border-t-4 border-r-4 border-red-primary">
                <span className="absolute -top-1 -right-12 text-red-primary text-xs font-bold rotate-90 origin-top-right">
                    HERE
                </span>
            </div>
            <div className="absolute bottom-0 left-0 w-6 h-6 border-b-4 border-l-4 border-red-primary"></div>
            <div className="absolute bottom-0 right-0 w-6 h-6 border-b-4 border-r-4 border-red-primary"></div>

            {/* Header */}
            <div className="mb-6">
                <h2 className="text-xl md:text-2xl text-white font-bold tracking-wider mb-2">
                    REGISTRATION_RECEIPT.LOG
                </h2>
                <p className="text-red-primary text-xs md:text-sm">
                    Timestamp: {timestamp.date} // {timestamp.time} PST
                </p>
                <p className="text-red-primary text-xs md:text-sm">
                    Module_Date_Reserved: 12-04-2025 // 9:00:00 AM PST
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                {/* Left Section - Team Info */}
                <div className="pt-4 pr-0 lg:pr-6">
                    <div className="flex justify-between items-center pb-4 border-b-2  border-[#392828]">
                        <span className="text-gray-500 text-sm uppercase">TEAM_NAME</span>
                        <span className="text-white text-base font-bold uppercase">
                            {teamName || "---"}
                        </span>
                    </div>

                    <div className="flex justify-between items-center py-4 border-b-2  border-[#392828]">
                        <span className="text-gray-500 text-sm uppercase">LEADER_NAME</span>
                        <span className="text-white text-base font-bold uppercase">
                            {leaderName || "---"}
                        </span>
                    </div>

                    <div className="flex justify-between items-center py-4 border-b-2  border-[#392828]">
                        <span className="text-gray-500 text-sm uppercase">MODULE_NAME</span>
                        <span className="text-white text-base font-bold uppercase">
                            {moduleName || "---"}
                        </span>
                    </div>

                    <div className="flex justify-between items-center pt-4">
                        <span className="text-gray-500 text-sm uppercase">TEAM_MEMBERS</span>
                        <span className="text-white text-base font-bold">
                            {teamMembers > 0 ? String(teamMembers).padStart(2, "0") : "00"}
                        </span>
                    </div>
                </div>

                {/* Right Section - Payment Info with Dashed Border */}
                <div className="p-5 bg-dark-red-1 border-2 border-dashed border-[#392828]">
                    <div className="flex justify-between items-center pb-4 border-b-2 border-[#392828]">
                        <span className="text-gray-500 text-sm uppercase">MODULE_FEE</span>
                        <span className="text-white text-base font-bold">
                            {moduleFee} PKR
                        </span>
                    </div>

                    <div className="flex justify-between items-center py-4 border-b-2 border-[#392828]">
                        <span className="text-gray-500 text-sm uppercase">DISCOUNTS_APPLIED</span>
                        <span className="text-white text-base font-bold">
                            {discount > 0 ? `${discount} PKR` : "NONE"}
                        </span>
                    </div>

                    <div className="flex justify-between items-center py-4 border-b-2 border-[#392828]">
                        <span className="text-gray-500 text-sm uppercase">PAYMENT_STATUS</span>
                        <span
                            className={`text-base font-bold uppercase ${
                                paymentStatus === "SUBMITTED"
                                    ? "text-green-500"
                                    : paymentStatus === "PENDING"
                                    ? "text-yellow-500"
                                    : "text-gray-500"
                            }`}
                        >
                            {paymentStatus === "NONE" ? "---" : paymentStatus}
                        </span>
                    </div>

                    <div className="flex justify-between items-center pt-4">
                        <span className="text-gray-500 text-sm uppercase">TOTAL_FEE</span>
                        <span className="text-red-primary text-lg font-bold">
                            {totalFee} PKR
                        </span>
                    </div>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8 pt-6 border-t border-gray-800">
                <Button
                    className="bg-red-primary hover:bg-red-700 text-white font-mono text-sm h-14 uppercase"
                    radius="none"
                    startContent={<CheckCircleIcon className="w-5 h-5" />}
                    isDisabled={!teamName || !leaderName || !moduleName}
                >
                    CONFIRM_ENTRY
                </Button>
                <Button
                    className="bg-gray-800 hover:bg-gray-700 text-white font-mono text-sm h-14 uppercase"
                    radius="none"
                    startContent={<DocumentArrowDownIcon className="w-5 h-5" />}
                    onPress={onDownloadRulebook}
                    isDisabled={!moduleName}
                >
                    RULEBOOK.PDF
                </Button>
            </div>
        </div>
    );
}
