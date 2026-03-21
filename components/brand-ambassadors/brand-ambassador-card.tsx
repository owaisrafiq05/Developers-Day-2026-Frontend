"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Copy, Check, Mail, Building2, Users } from "lucide-react";
import { BrandAmbassador } from "./brand-ambassadors";

interface BrandAmbassadorCardProps {
    ambassador: BrandAmbassador;
    rank: number;
}

export default function BrandAmbassadorCard({ ambassador, rank }: BrandAmbassadorCardProps) {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(ambassador.referralCode);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5 }}
            className="relative w-full bg-[#1C0D0D] border border-[#332323] hover:border-red-primary transition-colors duration-300 font-mono px-4 sm:px-6 py-5"
        >
            {/* Corner accents */}
            <div className="absolute top-3 right-3 border-r-2 border-t-2 border-[#6E1617] h-6 w-6" />
            <div className="absolute bottom-3 left-3 border-l-2 border-b-2 border-[#6E1617] h-6 w-6" />

            {/* Rank + Name + Referral Code */}
            <div className="flex items-center gap-4 sm:gap-6">
                <span className="text-4xl sm:text-5xl font-extralight text-[#6E1617] w-8 sm:w-10 text-center shrink-0">
                    {rank}
                </span>
                <div className="min-w-0">
                    <p className="text-xl sm:text-2xl md:text-3xl font-bold uppercase tracking-widest text-white leading-tight truncate pr-2">
                        {ambassador.fullName}
                    </p>
                    <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                        <span className="bg-[#6E1617] text-white text-xs px-2 py-0.5 font-bold tracking-widest uppercase">
                            {ambassador.referralCode}
                        </span>
                        <button
                            onClick={handleCopy}
                            title="Copy referral code"
                            className="cursor-pointer flex items-center gap-1 text-[10px] tracking-widest uppercase border border-[#332323] hover:border-[#6E1617] text-gray-400 hover:text-white px-2 py-0.5 transition-colors duration-200"
                        >
                            {copied ? (
                                <>
                                    <Check className="w-3 h-3 text-green-400" />
                                    <span className="text-green-400">COPIED</span>
                                </>
                            ) : (
                                <>
                                    <Copy className="w-3 h-3" />
                                    <span>COPY</span>
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Details row — stacks on mobile, row on md+ */}
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-0 sm:divide-x divide-[#332323] px-4 py-3">
                <div className="sm:px-6 first:pl-0">
                    <DetailRow
                        icon={<Users className="w-5 h-5 text-[#6E1617]" />}
                        label="TEAMS_REFERRED"
                        value={String(ambassador.teamCount)}
                        highlight={ambassador.teamCount > 0}
                    />
                </div>
                <div className="sm:px-6">
                    <DetailRow
                        icon={<Building2 className="w-5 h-5 text-[#6E1617]" />}
                        label="INSTITUTE"
                        value={ambassador.institute}
                    />
                </div>
                <div className="sm:px-6">
                    <DetailRow
                        icon={<Mail className="w-5 h-5 text-[#6E1617]" />}
                        label="EMAIL"
                        value={ambassador.email}
                    />
                </div>
            </div>
        </motion.div>
    );
}

function DetailRow({
    icon,
    label,
    value,
    highlight,
}: {
    icon: React.ReactNode;
    label: string;
    value: string;
    highlight?: boolean;
}) {
    return (
        <div className="flex items-start gap-2">
            <span className="mt-0.5 shrink-0">{icon}</span>
            <div className="min-w-0">
                <p className="text-xs text-gray-400 tracking-widest uppercase">{label}</p>
                <p className={`text-sm font-medium break-all ${highlight ? "text-green-400" : "text-gray-200"}`}>
                    {value}
                </p>
            </div>
        </div>
    );
}
