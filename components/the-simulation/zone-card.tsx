"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { useRouter } from "next/navigation";

export type Mission = { name: string; mission: string; object: string };
export type ZoneType = { id: string; number: string; name: string; category: string; moduleId: string; color: string; stone: string; lore: string; missions: Mission[] };

export default function ZoneCard({ zone, index }: { zone: ZoneType; index: number }) {
    const [expanded, setExpanded] = useState(false);
    const router = useRouter();

    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6 }}
            className="relative h-full"
        >
            {/* Watermark (reduced) */}
            <div
                className="absolute -top-4 right-3 font-mono font-black text-[60px] md:text-[80px] opacity-[0.04] pointer-events-none"
                style={{ color: zone.color }}
            >
                {zone.number}
            </div>

            <div className="relative h-full flex flex-col border border-[#382929] bg-[#1D0E0E] hover:shadow-[0_0_24px_rgba(215,29,34,0.08)] transition-all duration-300">

                {/* Header */}
                <button
                    onClick={() => router.push(`/modules/${zone.moduleId}`)}
                    className="text-left p-5 md:p-6 border-b border-[#382929] hover:bg-[#271C1C] transition-colors group"
                >
                    <p
                        className="font-mono text-[9px] md:text-[10px] tracking-[0.3em] uppercase mb-2"
                        style={{ color: zone.color }}
                    >
                        ZONE_{zone.number}
                    </p>

                    <h3 className="font-mono text-lg md:text-xl font-black text-white uppercase leading-tight group-hover:text-gray-200">
                        {zone.name}
                    </h3>

                    <p className="text-gray-400 text-xs md:text-sm mt-3 leading-relaxed line-clamp-3">
                        {zone.lore}
                    </p>
                </button>

                {/* Stone + Category */}
                <div className="px-5 md:px-6 py-3 flex items-center justify-between text-xs font-mono">
                    <span className="text-gray-500 uppercase tracking-wider">
                        {zone.category}
                    </span>
                    <span style={{ color: zone.color }} className="font-bold uppercase">
                        {zone.stone}
                    </span>
                </div>

                {/* Missions Toggle */}
                <button
                    onClick={() => setExpanded(!expanded)}
                    className="w-full text-left px-5 md:px-6 py-3 flex items-center justify-between font-mono text-[10px] tracking-[0.25em] uppercase border-t border-[#382929] hover:bg-[#271C1C]"
                    style={{ color: zone.color }}
                >
                    <span>MISSIONS [{zone.missions.length}]</span>
                    <motion.span animate={{ rotate: expanded ? 180 : 0 }}>
                        ▼
                    </motion.span>
                </button>

                {/* Missions */}
                <motion.div
                    initial={false}
                    animate={{ height: expanded ? "auto" : 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                >
                    <div className="px-5 md:px-6 pb-5 space-y-2">
                        {zone.missions.map((m, i) => (
                            <button
                                key={m.name}
                                onClick={() => router.push(`/modules/${zone.moduleId}`)}
                                className="w-full text-left p-3 border border-[#382929] bg-[#191111] hover:bg-[#271C1C] transition-all text-xs group"
                            >
                                <div className="flex justify-between items-start gap-3">
                                    <div>
                                        <p className="font-mono text-white text-xs font-bold uppercase leading-tight">
                                            M{String(i + 1).padStart(2, "0")} — {m.name}
                                        </p>
                                        <p className="text-gray-500 text-[11px] mt-1 line-clamp-2">
                                            {m.mission}
                                        </p>
                                    </div>
                                    <span
                                        className="font-mono text-[10px] font-bold shrink-0"
                                        style={{ color: zone.color }}
                                    >
                                        {m.object}
                                    </span>
                                </div>
                            </button>
                        ))}
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
}
