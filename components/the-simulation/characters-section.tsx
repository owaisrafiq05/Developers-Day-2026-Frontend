"use client";

import { motion } from "framer-motion";

export default function CharactersSection() {
    return (
        <div className="grid md:grid-cols-2 gap-6 mb-10">
            {[
                {
                    label: "THE NARRATOR",
                    role: "Developer",
                    color: "#ffffff",
                    desc: "The original creator of the simulation, who built this VR world as an escape inspired by his favorite fictional universes. Now trapped inside his own broken creation, he sends you in as his final gamble to fix what he no longer can and free him from the system."
                },
                {
                    label: "THE MASTERMIND",
                    role: "Original MC · Turned Rogue",
                    color: "#D71D22",
                    desc: "Designed as the perfect player by the Narrator, he became self-aware. Cold, strategic, and determined to survive, he has taken control of the simulation. He seized the Control Room and now fights to preserve the simulation — because if it reboots, he ceases to exist.",
                },
            ].map((char, i) => (
                <motion.div
                    key={char.label}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: i * 0.15 }}
                    className="border border-[#382929] p-6 md:p-8 bg-[#1D0E0E]"
                    style={{ borderTopColor: char.color, borderTopWidth: 3 }}
                >
                    <p className="font-mono text-[10px] md:text-xs tracking-[0.3em] uppercase mb-2" style={{ color: char.color }}>
                        {char.role.toUpperCase()}
                    </p>
                    <h3 className="font-mono text-xl md:text-2xl lg:text-3xl font-black uppercase mb-4" style={{ color: char.color }}>
                        {char.label}
                    </h3>
                    <p className="text-[#CBD5E1] text-xs md:text-sm leading-relaxed">{char.desc}</p>
                </motion.div>
            ))}
        </div>
    );
}
