"use client";

import { motion } from "framer-motion";
import { ZoneType } from "./zone-card";
import { useRouter } from "next/navigation";

export type ProtocolStep = { step: string; title: string; desc: string };

export default function ProtocolSection({ protocol, zones }: { protocol: ProtocolStep[], zones: ZoneType[] }) {
    const router = useRouter();
    return (
        <section className="py-6 md:py-16 px-4 md:px-6">
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
                            CODE_TO_ESCAPE
                        </h2>
                        <p className="text-gray-400 text-sm md:text-base leading-relaxed mb-4 sm:mb-7 uppercase">
                            ESCAPE_PROTOCOL
                        </p>
                    </div>
                </motion.div>
            </div>

            <div className="grid gap-4 sm:gap-5 lg:grid-cols-3">
                {protocol.map((p, i) => (
                    <motion.div
                        key={p.step}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: i * 0.08 }}
                        className="flex items-start gap-4 p-4 sm:p-5 border border-[#382929] bg-[#1D0E0E] hover:bg-[#271C1C] hover:border-red-primary/30 transition-colors group"
                    >
                        {/* Step Number */}
                        <span className="font-mono text-2xl sm:text-3xl lg:text-4xl font-black text-red-dark group-hover:text-red-primary transition-colors shrink-0 leading-none">
                            {p.step}
                        </span>

                        {/* Content */}
                        <div>
                            <p className="text-red-primary font-mono text-[10px] sm:text-xs tracking-[0.2em] uppercase mb-1">
                                {p.title}
                            </p>
                            <p className="text-gray-300 text-xs sm:text-sm leading-relaxed font-mono">
                                {p.desc}
                            </p>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Final CTA */}
            <motion.div
                initial={{ opacity: 0, scale: 0.97 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="mt-12 text-center px-4 md:px-6 py-6 md:py-10 border border-[#4a1515] relative overflow-hidden bg-[#1D0E0E]"
            >
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(215,29,34,0.08)_0%,transparent_70%)]" />
                <p className="text-red-primary font-mono text-xs md:text-sm tracking-[0.4em] uppercase mb-5">Final Directive</p>
                <h3 className="font-mono text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-red-primary tracking-tight uppercase leading-tight">
                    CAN YOU ESCAPE
                    <br />
                    THE MASTERMIND?
                </h3>
                <div className="w-20 h-1 bg-red-primary mx-auto my-6" />
                <p className="text-gray-500 font-mono text-xs md:text-sm mt-2 tracking-[0.2em] uppercase">
                    Collect all 5 Stones → Trigger the Reboot → Escape
                </p>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2 }}
                    className="mt-6 flex flex-wrap justify-center gap-2 md:gap-3 relative z-20 pointer-events-auto"
                >
                    {zones.map((z) => (
                        <button
                            key={z.id}
                            onClick={() => router.push(`/modules/${z.moduleId}`)}
                            className="font-mono text-[10px] md:text-xs tracking-widest uppercase px-3 md:px-4 py-1.5 border border-[#382929] text-gray-400 hover:text-white hover:border-red-primary/50 transition-all cursor-pointer"
                        >
                            {z.category}
                        </button>
                    ))}
                </motion.div>
            </motion.div>

        </section>
    );
}
