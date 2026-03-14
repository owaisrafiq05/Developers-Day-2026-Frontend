"use client";

import { useEffect, useState } from "react";
import { Button } from "@heroui/button";
import { CheckCircleIcon, ArrowDownTrayIcon } from "@heroicons/react/24/solid";

interface RegistrationReceiptProps {
    teamName?: string;
    leaderName?: string;
    moduleName?: string;
    moduleStartTime?: string | null;
    moduleEndTime?: string | null;
    teamMembers?: number;
    moduleFee?: number;
    discount?: number;
    paymentStatus?: "SUBMITTED" | "PENDING" | "NONE";
    onDownloadRulebook?: () => void;
    onConfirmEntry?: () => void;
    onDownloadReceipt?: () => void;
    isSubmitting?: boolean;
    isConfirmDisabled?: boolean;
}

export default function RegistrationReceipt({
    teamName = "",
    leaderName = "",
    moduleName = "",
    moduleStartTime = null,
    moduleEndTime = null,
    teamMembers = 0,
    moduleFee = 2500,
    discount = 0,
    paymentStatus = "NONE",
    onDownloadRulebook,
    onConfirmEntry,
    onDownloadReceipt,
    isSubmitting = false,
    isConfirmDisabled = false,
}: RegistrationReceiptProps) {
    type ParsedDateTimeParts = {
        year: number;
        month: number;
        day: number;
        hour: number;
        minute: number;
        second: number;
    };

    const parseBackendDateTimeParts = (value?: string | null): ParsedDateTimeParts | null => {
        if (!value) return null;

        const normalizedValue = value.trim();
        const match = normalizedValue.match(
            /^(\d{4})-(\d{2})-(\d{2})[T\s](\d{2}):(\d{2})(?::(\d{2}))?/
        );

        if (!match) {
            return null;
        }

        const year = Number(match[1]);
        const month = Number(match[2]);
        const day = Number(match[3]);
        const hour = Number(match[4]);
        const minute = Number(match[5]);
        const second = Number(match[6] || "0");

        const isValidDate =
            year > 0 && month >= 1 && month <= 12 && day >= 1 && day <= 31;
        const isValidTime =
            hour >= 0 && hour <= 23 && minute >= 0 && minute <= 59 && second >= 0 && second <= 59;

        if (!isValidDate || !isValidTime) {
            return null;
        }

        return { year, month, day, hour, minute, second };
    };

    const formatTime12Hour = (hour: number, minute: number): string => {
        const suffix = hour >= 12 ? "PM" : "AM";
        const normalizedHour = hour % 12 || 12;
        return `${normalizedHour}:${String(minute).padStart(2, "0")} ${suffix}`;
    };

    const formatModuleReservation = (start?: string | null, end?: string | null): string => {
        const startParts = parseBackendDateTimeParts(start);
        const endParts = parseBackendDateTimeParts(end);

        if (!startParts && !endParts) {
            return "--/--/---- // --:-- -- PST";
        }

        const baseDate = startParts || endParts;
        if (!baseDate) {
            return "--/--/---- // --:-- -- PST";
        }

        const date = `${String(baseDate.day).padStart(2, "0")}-${String(baseDate.month).padStart(2, "0")}-${baseDate.year}`;
        const startTime = startParts
            ? formatTime12Hour(startParts.hour, startParts.minute)
            : null;
        const endTime = endParts
            ? formatTime12Hour(endParts.hour, endParts.minute)
            : null;

        if (startTime && endTime) {
            return `${date} // ${startTime} - ${endTime} PST`;
        }

        return `${date} // ${(startTime || endTime)} PST`;
    };

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
        <div className="bg-dark-red-4  p-6 md:p-8 relative font-mono">
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
                    REGISTRATION_ RECEIPT.LOG
                </h2>
                <p className="text-red-primary text-xs md:text-sm">
                    Timestamp: {timestamp.date} // {timestamp.time} PST
                </p>
                <p className="text-red-primary text-xs md:text-sm">
                    Module_Date_Reserved: {formatModuleReservation(moduleStartTime, moduleEndTime)}
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-0 gap-5">
                {/* Left Section - Team Info */}
                <div className="pt-4 pr-0 lg:pr-6">
                    <div className="flex justify-between gap-6 items-center pb-4 border-b-2  border-[#392828]">
                        <span className="text-gray-500 text-sm uppercase">TEAM_NAME</span>
                        <span className="text-white text-base font-bold uppercase text-right pr-2 break-all">
                            {teamName || "---"}
                        </span>
                    </div>

                    <div className="flex justify-between gap-6 items-center py-4 border-b-2  border-[#392828]">
                        <span className="text-gray-500 text-sm uppercase">LEADER_NAME</span>
                        <span className="text-white text-base font-bold uppercase text-right pr-2 break-all">
                            {leaderName || "---"}
                        </span>
                    </div>

                    <div className="flex justify-between gap-6 items-center py-4 border-b-2  border-[#392828]">
                        <span className="text-gray-500 text-sm uppercase">MODULE_NAME</span>
                        <span className="text-white text-base font-bold uppercase text-right pr-2">
                            {moduleName || "---"}
                        </span>
                    </div>

                    <div className="flex justify-between gap-6 items-center py-4 border-b-2  border-[#392828]">
                        <span className="text-gray-500 text-sm uppercase">TEAM_MEMBERS</span>
                        <span className="text-white text-base font-bold uppercase text-right pr-2">
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
                        <span className="text-gray-500 text-sm uppercase">Early_Bird_Off</span>
                        <span className={`text-base ${discount > 0 ? 'text-green-500' : 'text-white'} font-bold`}>
                            {discount > 0 ? `${discount} PKR` : "NONE"}
                        </span>
                    </div>

                    <div className="flex justify-between items-center py-4 border-b-2 border-[#392828]">
                        <span className="text-gray-500 text-sm uppercase">PAYMENT_STATUS</span>
                        <span
                            className={`text-base font-bold uppercase ${paymentStatus === "SUBMITTED"
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

            {/* Thank You Note */}
            {onDownloadReceipt && (
                <div className="mt-8 pt-6 border-t border-gray-800 text-center">
                    <p className="text-white text-sm md:text-base font-bold tracking-wider mb-2">
                        THANK_YOU_FOR_REGISTERING FOR DEV_DAY_2026
                    </p>
                    <p className="text-gray-400 text-xs md:text-sm max-w-md mx-auto">
                        You will receive a confirmation email once your payment is verified. Keep this receipt for your records.
                    </p>
                </div>
            )}

            {/* Action Buttons */}
            {(onConfirmEntry || onDownloadReceipt) && (
                <div data-no-capture className="grid grid-cols-1 gap-4 mt-6">
                    {onConfirmEntry && (
                        <Button
                            className="bg-red-primary hover:bg-red-700 text-white font-mono text-sm h-14 uppercase"
                            radius="none"
                            startContent={!isSubmitting ? <CheckCircleIcon className="w-5 h-5" /> : undefined}
                            isDisabled={!teamName || !leaderName || !moduleName || isSubmitting || isConfirmDisabled}
                            isLoading={isSubmitting}
                            onPress={onConfirmEntry}
                        >
                            {isSubmitting ? "SUBMITTING..." : "CONFIRM_ENTRY"}
                        </Button>
                    )}
                    {onDownloadReceipt && (
                        <Button
                            className="bg-gray-800 hover:bg-gray-700 text-white font-mono text-sm h-14 uppercase"
                            radius="none"
                            startContent={<ArrowDownTrayIcon className="w-5 h-5" />}
                            onPress={onDownloadReceipt}
                        >
                            DOWNLOAD_RECEIPT
                        </Button>
                    )}
                </div>
            )}
        </div>
    );
}
