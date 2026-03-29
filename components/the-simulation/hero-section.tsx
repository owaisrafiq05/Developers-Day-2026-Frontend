"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { ZoneType } from "./zone-card";

export default function HeroSection({ zones }: { zones: ZoneType[] }) {
    const router = useRouter();

    return (
        <div>
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
                            VR_SIMULATION
                        </h2>
                        <p className="text-gray-400 text-sm md:text-base leading-relaxed mb-4 sm:mb-7 uppercase">
                            Conquer the Zones. Collect the Stones. Escape the game. <br />
                            <span className="text-red-primary tracking-widest">Just don&apos;t get caught by the Mastermind.</span>
                        </p>
                    </div>
                </motion.div>
            </div>

            <div>
                {/* Page Navbar */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2 }}
                    className="mt-6 flex flex-wrap justify-center gap-2 md:gap-3 relative z-20 pointer-events-auto"
                >
                    {[
                        { label: "CHARACTERS", target: "characters" },
                        { label: "THE ZONES", target: "zones" },
                        { label: "SIDE QUESTS", target: "side-quests" },
                        { label: "PROTOCOL", target: "protocol" }
                    ].map((item) => (
                        <button
                            key={item.target}
                            onClick={() => {
                                const element = document.getElementById(item.target);
                                if (element) {
                                    element.scrollIntoView({ behavior: "smooth" });
                                }
                            }}
                            className="font-mono text-[10px] md:text-xs tracking-[0.2em] uppercase px-3 md:px-4 py-1.5 border border-[#382929] text-gray-400 hover:text-white hover:border-red-primary/50 transition-all cursor-pointer"
                        >
                            {item.label}
                        </button>
                    ))}
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.75, duration: 0.6 }}
                    className="mt-8 flex items-center justify-center"
                >
                    <a
                        href="https://drive.google.com/file/d/18F70LfhAAoIJtoT0fcoBQORCBLXoqfeF/view"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative inline-flex items-center gap-3 border-2 border-red-primary bg-red-primary/10 opacity-70 px-7 py-3 font-mono font-bold text-xs tracking-[0.25em] uppercase text-red-primary transition-all duration-300 hover:bg-red-primary hover:text-white"
                    >
                        {/* subtle shimmer */}
                        <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[linear-gradient(120deg,transparent_20%,rgba(255,255,255,0.08)_50%,transparent_80%)]" />
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3M3 17V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                        </svg>
                        Read Full Lore
                    </a>
                </motion.div>
                {/* Credit */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6 }}
                    className="text-center relative z-20 mt-4 mb-6"
                >
                    <p className="font-mono text-[10px] md:text-xs text-gray-600 tracking-[0.3em] uppercase text-center">
                        SIMULATION DESIGNED BY{" "}
                        <a
                            href="https://www.linkedin.com/in/arwa-abbas-kerani-3228ab346/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="relative inline-block text-red-primary font-semibold text-xs md:text-sm tracking-[0.4em] 
                                transition-all duration-300 z-30 pointer-events-auto
                                hover:text-white hover:scale-105"
                        >
                            <span className="relative z-10">ARWA ABBAS</span>
                            <span className="absolute inset-0 bg-red-primary/20 blur-md opacity-70 group-hover:opacity-100"></span>
                        </a>
                    </p>
                </motion.div>
            </div>
        </div>
    );
}
