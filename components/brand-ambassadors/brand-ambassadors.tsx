"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import BrandAmbassadorCard from "./brand-ambassador-card";


export interface BrandAmbassador {
    id: string;
    fullName: string;
    email: string;
    institute: string;
    phone: string;
    cnic: string;
    referralCode: string;
    teamCount: number;
    createdAt: string;
}

interface BrandAmbassadorsProps {
    brandAmbassadors: BrandAmbassador[];
}

export default function BrandAmbassadors({ brandAmbassadors }: BrandAmbassadorsProps) {
    const [query, setQuery] = useState("");

    const sorted = useMemo(
        () =>
            [...brandAmbassadors]
                .filter((a) => a.teamCount > 0)
                .sort((a, b) => b.teamCount - a.teamCount),
        [brandAmbassadors]
    );

    const filtered = useMemo(() => {
        const q = query.toLowerCase().trim();
        if (!q) return sorted;
        return sorted.filter(
            (a) =>
                a.fullName.toLowerCase().includes(q) ||
                a.institute.toLowerCase().includes(q) ||
                a.referralCode.toLowerCase().includes(q) ||
                a.email.toLowerCase().includes(q)
        );
    }, [query, sorted]);

    return (
        <section className="bg-dark-red text-white py-16">
            <div className="container mx-auto px-4 md:px-6">
                <div className="border-l-3 border-red-primary mb-4 sm:mb-10">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-80px" }}
                        transition={{ duration: 0.7 }}
                        className="flex gap-4 sm:mb-2 mb-8 items-start font-mono pl-4 sm:pl-7"
                    >
                        <div>
                            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-7">
                                BRAND_AMBASSADORS
                            </h2>
                            <p className="text-gray-400 text-sm md:text-base leading-relaxed mb-4 sm:mb-7">
                                OUR AMBASSADORS REPRESENTING DEVELOPER&apos;S DAY 2026 ACROSS UNIVERSITIES.
                            </p>
                        </div>
                    </motion.div>
                </div>

                {/* Search bar */}
                <div className="relative mb-6 font-mono">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="SEARCH BY NAME, INSTITUTE, CODE, OR EMAIL..."
                        className="w-full bg-[#1C0D0D] border border-[#332323] focus:border-[#6E1617] outline-none text-white text-xs tracking-widest placeholder:text-gray-600 py-3 pl-9 pr-4 transition-colors duration-200"
                    />
                </div>

                {/* Ambassador list */}
                <div className="flex flex-col gap-3">
                    {filtered.length === 0 ? (
                        <p className="font-mono text-gray-500 text-sm pl-1">
                            {query ? `NO RESULTS FOR "${query.toUpperCase()}"` : "NO AMBASSADORS FOUND."}
                        </p>
                    ) : (
                        filtered.map((ambassador, index) => (
                            <BrandAmbassadorCard
                                key={ambassador.id}
                                ambassador={ambassador}
                                rank={index + 1}
                            />
                        ))
                    )}
                </div>
            </div>
        </section>
    );
}