"use client";

import { motion } from "framer-motion";

export default function SideQuestsSection() {
    return (
        <div className="py-6 md:py-10 px-4 md:px-6">
            <div className="border-l-3 border-red-primary mb-4 sm:mb-10">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.7 }}
                    className="flex gap-4 sm:mb-2 mb-4 items-start font-mono pl-4 sm:pl-7"
                >
                    <div>
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-7">
                            SIDE_QUESTS
                        </h2>
                        <p className="text-gray-400 text-sm md:text-base leading-relaxed mb-4 sm:mb-7 uppercase">
                            Minigames & Activities <br />
                            <span className="text-red-primary tracking-widest">Optional / Parallel_Track</span>
                        </p>
                    </div>
                </motion.div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="relative border border-[#382929] p-6 md:p-10 bg-[#1D0E0E]"
                >
                    <div className="hidden md:block absolute top-3 right-3 w-7 h-7 border-r-2 border-t-2 border-red-primary" />
                    <div className="hidden md:block absolute bottom-3 left-3 w-7 h-7 border-l-2 border-b-2 border-red-primary" />
                    <p className="font-mono text-[10px] md:text-xs tracking-[0.3em] uppercase text-gray-500 mb-4">
                        SIDE QUEST SYSTEM
                    </p>
                    <p className="text-gray-400 text-xs md:text-base leading-7 md:leading-8">
                        Main missions give you the Stones, but Side Quests provide the power to survive the final encounter.
                        Accumulate points to evolve your avatar and get closer to beating the Mastermind.
                        <br /><br />
                        <span className="text-white font-bold text-xs md:text-base uppercase tracking-wide">
                            Every person can earn points through Side Quests — no missions required.
                        </span>
                    </p>
                </motion.div>

                <div className="grid gap-3 md:gap-4">
                    {[
                        { label: "WHAT_THEY_ARE", value: "Fast-paced activities and mini-games", color: "#3AED5B" },
                        { label: "THE_POINTS", value: "Separate from main mission success. Anyone can participate.", color: "#F59E0B" },
                        { label: "THE_PRIZE", value: "The person with the most points wins a special prize.", color: "#D71D22" },
                        { label: "THE_FORMAT", value: "A mix of physical (on-ground) and online puzzles.", color: "#00F0FF" },
                    ].map((item, i) => (
                        <motion.div
                            key={item.label}
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.08 }}
                            className="flex items-start gap-4 p-4 md:p-5 border border-[#382929] bg-[#1D0E0E]"
                        >
                            <div className="w-1 self-stretch rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                            <div>
                                <p className="font-mono text-[10px] md:text-xs tracking-[0.25em] uppercase mb-1.5" style={{ color: item.color }}>
                                    {item.label}
                                </p>
                                <p className="text-gray-300 text-sm md:text-base font-mono">{item.value}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

        </div>
    );
}
