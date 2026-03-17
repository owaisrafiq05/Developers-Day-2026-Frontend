"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { useState, useRef, useEffect, useCallback } from "react";
import { ChevronDown, X, Pin, Filter } from "lucide-react";

import { CompetitionProps } from "./types";
import TimeHeader from "./timer-header";
import CompetitionRow from "./competition-row";
import { CATEGORY_HREF } from "./constants";

export const CATEGORY_ORDER = [
    "Project Xtreme",
    "Tech Quest",
    "Development & Design",
    "Core Coding",
    "Software Engineering",
    "AI & Data Science",
    "Electrical Engineering",
    "Business",
    "General",
];

// ─── Category Filter Dropdown ────────────────────────────────────────────────

function CategoryDropdown({
    selected,
    onChange,
}: {
    selected: string | null;
    onChange: (cat: string | null) => void;
}) {
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    return (
        <div ref={ref} className="relative flex-1 min-w-0">
            <button
                onClick={() => setOpen((o) => !o)}
                className="w-full flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2 bg-white/5 border border-white/15 hover:border-red-primary/60 hover:bg-white/10 transition-all duration-200 text-[11px] sm:text-sm font-mono justify-between group"
            >
                <span className="flex items-center gap-1.5 sm:gap-2 text-gray-300 min-w-0">
                    <Filter size={11} className="text-red-primary/70 flex-shrink-0" />
                    <span className="truncate">{selected ?? "ALL CATEGORIES"}</span>
                </span>
                <ChevronDown
                    size={11}
                    className={`text-gray-500 flex-shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
                />
            </button>

            <AnimatePresence>
                {open && (
                    <motion.ul
                        initial={{ opacity: 0, y: -6, scaleY: 0.95 }}
                        animate={{ opacity: 1, y: 0, scaleY: 1 }}
                        exit={{ opacity: 0, y: -6, scaleY: 0.95 }}
                        transition={{ duration: 0.15 }}
                        style={{ transformOrigin: "top" }}
                        className="absolute z-50 top-full mt-1 left-0 w-full bg-[#1a0505] border border-white/15 shadow-xl shadow-black/60 overflow-hidden"
                    >
                        <li
                            onClick={() => { onChange(null); setOpen(false); }}
                            className={`px-2 sm:px-3 py-1.5 sm:py-2 text-[11px] sm:text-xs font-mono cursor-pointer hover:bg-red-primary/20 transition-colors ${selected === null ? "text-red-primary" : "text-gray-300"}`}
                        >
                            ALL CATEGORIES
                        </li>
                        {CATEGORY_ORDER.map((cat) => (
                            <li
                                key={cat}
                                onClick={() => { onChange(cat); setOpen(false); }}
                                className={`px-2 sm:px-3 py-1.5 sm:py-2 text-[11px] sm:text-xs font-mono cursor-pointer hover:bg-red-primary/20 transition-colors ${selected === cat ? "text-red-primary" : "text-gray-300"}`}
                            >
                                {cat}
                            </li>
                        ))}
                    </motion.ul>
                )}
            </AnimatePresence>
        </div>
    );
}

// ─── Multi-Select Competition Dropdown ───────────────────────────────────────

function CompetitionMultiSelect({
    competitions,
    pinned,
    onToggle,
}: {
    competitions: { id: string; name: string; category: string }[];
    pinned: Set<string>;
    onToggle: (id: string) => void;
}) {
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);
    const listRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    // Trap scroll inside the dropdown list so the page doesn't scroll
    const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
        const el = listRef.current;
        if (!el) return;
        const { scrollTop, scrollHeight, clientHeight } = el;
        const atTop = scrollTop === 0 && e.deltaY < 0;
        const atBottom = scrollTop + clientHeight >= scrollHeight && e.deltaY > 0;
        if (!atTop && !atBottom) e.stopPropagation();
    };

    const pinnedCount = competitions.filter((c) => pinned.has(c.id)).length;

    return (
        <div ref={ref} className="relative flex-1 min-w-0">
            <button
                onClick={() => setOpen((o) => !o)}
                className="w-full flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2 bg-white/5 border border-white/15 hover:border-red-primary/60 hover:bg-white/10 transition-all duration-200 text-[11px] sm:text-sm font-mono justify-between"
            >
                <span className="flex items-center gap-1.5 sm:gap-2 text-gray-300 min-w-0">
                    <Pin size={11} className="text-red-primary/70 flex-shrink-0" />
                    {pinnedCount > 0 ? (
                        <span className="truncate">
                            <span className="text-red-primary font-bold">{pinnedCount}</span>
                            <span className="text-gray-400"> PINNED</span>
                        </span>
                    ) : (
                        <span className="truncate">PIN COMPETITIONS</span>
                    )}
                </span>
                <ChevronDown
                    size={11}
                    className={`text-gray-500 flex-shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
                />
            </button>

            <AnimatePresence>
                {open && (
                    <motion.div
                        ref={listRef}
                        onWheel={handleWheel}
                        initial={{ opacity: 0, y: -6, scaleY: 0.95 }}
                        animate={{ opacity: 1, y: 0, scaleY: 1 }}
                        exit={{ opacity: 0, y: -6, scaleY: 0.95 }}
                        transition={{ duration: 0.15 }}
                        style={{ transformOrigin: "top" }}
                        className="absolute z-50 top-full mt-1 left-0 w-full bg-[#1a0505] border border-white/15 shadow-xl shadow-black/60 max-h-72 overflow-y-auto"
                    >
                        {competitions.length === 0 && (
                            <p className="px-2 sm:px-3 py-2 text-[11px] sm:text-xs font-mono text-gray-500">
                                NO COMPETITIONS IN THIS CATEGORY
                            </p>
                        )}
                        {competitions.map((c) => {
                            const checked = pinned.has(c.id);
                            return (
                                <label
                                    key={c.id}
                                    className="flex items-center gap-2 sm:gap-3 px-2 sm:px-3 py-1.5 sm:py-2 cursor-pointer hover:bg-red-primary/10 transition-colors group"
                                >
                                    <span
                                        onClick={() => onToggle(c.id)}
                                        className={`w-3.5 h-3.5 sm:w-4 sm:h-4 border flex-shrink-0 flex items-center justify-center transition-all duration-150 ${checked
                                            ? "bg-red-primary border-red-primary"
                                            : "border-white/30 group-hover:border-red-primary/50"
                                            }`}
                                    >
                                        {checked && (
                                            <svg width="8" height="6" viewBox="0 0 9 7" fill="none">
                                                <path d="M1 3.5L3.5 6L8 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        )}
                                    </span>
                                    <span
                                        onClick={() => onToggle(c.id)}
                                        className={`text-[11px] sm:text-xs font-mono leading-tight transition-colors ${checked ? "text-white" : "text-gray-400"}`}
                                    >
                                        {c.name}
                                        <span className="block text-[10px] text-gray-600 mt-0.5">{c.category}</span>
                                    </span>
                                </label>
                            );
                        })}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function EventPlan({ competitions }: CompetitionProps) {
    const router = useRouter();
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [pinnedIds, setPinnedIds] = useState<Set<string>>(new Set());

    const scheduledCompetitions = CATEGORY_ORDER.flatMap((cat) =>
        competitions.filter((c) => c.category === cat && c.startTime && c.endTime)
    );

    const pinCandidates = selectedCategory
        ? scheduledCompetitions.filter((c) => c.category === selectedCategory)
        : scheduledCompetitions;

    const togglePin = useCallback((id: string) => {
        setPinnedIds((prev) => {
            const next = new Set(prev);
            next.has(id) ? next.delete(id) : next.add(id);
            return next;
        });
    }, []);

    const clearPins = () => setPinnedIds(new Set());

    const pinnedRows = scheduledCompetitions.filter((c) => pinnedIds.has(c.id));
    const unpinnedRows = scheduledCompetitions.filter((c) => !pinnedIds.has(c.id));
    const orderedCompetitions = [...pinnedRows, ...unpinnedRows];

    const handleClick = (c: any) => {
        const href = CATEGORY_HREF[c.category];
        if (!href) return;
        router.push(`${href}#${c.id}`);
    };

    return (
        <section className="bg-dark-red text-white py-16 md:py-16">
            <div className="container mx-auto px-4 md:px-6">
                <div className="border-l-3 border-red-primary">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-80px" }}
                        transition={{ duration: 0.7 }}
                        className="flex gap-4 sm:mb-2 mb-4 items-start font-mono pl-4 sm:pl-7"
                    >
                        <div>
                            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-7">
                                EVENT_ITINERARY
                            </h2>
                            <p className="text-gray-400 text-sm md:text-base leading-relaxed mb-4 sm:mb-7">
                                SCHEDULE FOR DEVELOPER'S DAY 2026 COMPETITIONS.
                            </p>
                        </div>
                    </motion.div>
                </div>

                <div className="font-mono">
                    {/* ── Filter Bar — always one row ── */}
                    <div className="pl-2 mb-4 flex items-center gap-2">
                        <CategoryDropdown
                            selected={selectedCategory}
                            onChange={(cat) => setSelectedCategory(cat)}
                        />
                        <CompetitionMultiSelect
                            competitions={pinCandidates}
                            pinned={pinnedIds}
                            onToggle={togglePin}
                        />
                        {pinnedIds.size > 0 && (
                            <button
                                onClick={clearPins}
                                title="Clear pins"
                                className="flex items-center gap-1 px-1.5 sm:px-2.5 py-1.5 sm:py-2 text-[10px] sm:text-xs font-mono text-gray-400 hover:text-red-primary border border-white/10 hover:border-red-primary/40 transition-all flex-shrink-0"
                            >
                                <X size={10} />
                                <span className="hidden sm:inline">CLEAR PINS</span>
                            </button>
                        )}
                    </div>

                    {/* ── Pinned banner ── */}
                    <AnimatePresence>

                        {pinnedIds.size > 0 && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.25 }}
                                className="overflow-hidden"
                            >
                                <div className="mx-2 mb-1 px-3 py-1.5 bg-red-primary/10 border border-gray-500 flex items-center gap-2">
                                    <Pin size={11} className="text-red-primary opacity-70 flex-shrink-0" />
                                    <span className="text-[11px] text-gray-500 tracking-widest">
                                        {pinnedIds.size} COMPETITION{pinnedIds.size > 1 ? "S" : ""} PINNED TO TOP
                                    </span>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* ── Grid ── */}
                    <div className="p-2">
                        <TimeHeader />

                        {orderedCompetitions.map((c, index) => (
                            <CompetitionRow
                                key={c.id}
                                competition={c}
                                index={index}
                                onClick={handleClick}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}