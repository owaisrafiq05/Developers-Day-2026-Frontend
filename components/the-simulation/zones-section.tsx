"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import ZoneCard, { ZoneType } from "./zone-card";

export default function ZonesSection({ zones }: { zones: ZoneType[] }) {
    const router = useRouter();

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
                            THE_ZONES
                        </h2>
                        <p className="text-gray-400 text-sm md:text-base leading-relaxed mb-4 sm:mb-7 uppercase">
                            Five zones. Five stones. One escape. <br />
                            <span className="text-red-primary tracking-widest">Game_Map</span>
                        </p>
                    </div>
                </motion.div>
            </div>
            {/* Zone progress bar */}
            <div className="relative mb-10 hidden md:flex items-center justify-center">
                <div className="flex items-center w-full max-w-4xl">
                    {zones.map((zone, i) => (
                        <div key={zone.id} className="flex items-center flex-1">
                            <button
                                onClick={() => router.push(`/modules/${zone.moduleId}`)}
                                className="flex flex-col items-center gap-1.5 shrink-0 group/node cursor-pointer focus:outline-none"
                            >
                                <div
                                    className="w-10 h-10 flex items-center justify-center text-sm font-black border-2 transition-all group-hover/node:scale-110 font-mono"
                                    style={{ borderColor: zone.color, color: zone.color, background: "#191111" }}
                                >
                                    {zone.number}
                                </div>
                                <span
                                    className="text-[9px] font-mono tracking-wider whitespace-nowrap uppercase group-hover/node:text-gray-300 transition-colors"
                                    style={{ color: `${zone.color}80` }}
                                >
                                    {zone.stone}
                                </span>
                            </button>
                            {i < zones.length - 1 && (
                                <div
                                    className="flex-1 h-px mx-2"
                                    style={{ background: `linear-gradient(90deg, ${zone.color}50, ${zones[i + 1].color}50)` }}
                                />
                            )}
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex items-center justify-center">
                <p className="text-gray-500 text-[10px] md:text-base leading-relaxed mb-4">Tap a zone to enter</p>
            </div>
            <div className="lg:hidden relative left-1/2 right-1/2 w-screen -translate-x-1/2">
                {/* Dev Design */}
                <div
                    onClick={() => router.push("/modules/dev-design")}
                    className="absolute top-[10%] left-[5%] h-[45%] w-[20%] cursor-pointer"
                />
                <div
                    onClick={() => router.push("/modules/dev-design")}
                    className="absolute top-[5%] left-[5%] h-[35%] w-[25%] cursor-pointer"
                />
                {/* Software Engineering */}
                <div
                    onClick={() => router.push("/modules/software-eng")}
                    className="absolute top-[17%] left-[35%] h-[28%] w-[15%] cursor-pointer"
                />
                {/* Tech Quest */}
                <div
                    onClick={() => router.push("/modules/tech-quest")}
                    className="absolute top-[7%] left-[55%] h-[35%] w-[23%] cursor-pointer"
                />

                {/* AI and Data Science */}
                <div
                    onClick={() => router.push("/modules/ai-data")}
                    className="absolute top-[25%] left-[80%] h-[35%] w-[17%] cursor-pointer"
                />
                <div
                    onClick={() => router.push("/modules/ai-data")}
                    className="absolute top-[45%] left-[68%] h-[30%] w-[27%] cursor-pointer"
                />
                {/* Core Coding */}
                <div
                    onClick={() => router.push("/modules/coding")}
                    className="absolute top-[55%] left-[30%] h-[43%] w-[30%] cursor-pointer"
                />
                <Image
                    src="/zones.png"
                    alt="Game Map"
                    width={1920}
                    height={1080}
                    className="w-full h-auto mb-6 sm:mb-10"
                />
            </div>
            <div className="relative hidden lg:block">
                {/* Dev Design */}
                <div
                    onClick={() => router.push("/modules/dev-design")}
                    className="absolute top-[10%] left-[5%] h-[45%] w-[20%] cursor-pointer"
                />
                <div
                    onClick={() => router.push("/modules/dev-design")}
                    className="absolute top-[5%] left-[5%] h-[35%] w-[25%] cursor-pointer"
                />
                {/* Software Engineering */}
                <div
                    onClick={() => router.push("/modules/software-eng")}
                    className="absolute top-[17%] left-[35%] h-[28%] w-[15%] cursor-pointer"
                />
                {/* Tech Quest */}
                <div
                    onClick={() => router.push("/modules/tech-quest")}
                    className="absolute top-[7%] left-[55%] h-[35%] w-[23%] cursor-pointer"
                />

                {/* AI and Data Science */}
                <div
                    onClick={() => router.push("/modules/ai-data")}
                    className="absolute top-[25%] left-[80%] h-[35%] w-[17%] cursor-pointer"
                />
                <div
                    onClick={() => router.push("/modules/ai-data")}
                    className="absolute top-[45%] left-[68%] h-[30%] w-[27%] cursor-pointer"
                />
                {/* Core Coding */}
                <div
                    onClick={() => router.push("/modules/coding")}
                    className="absolute top-[55%] left-[30%] h-[43%] w-[30%] cursor-pointer"
                />
                <Image src="/zones.png" alt="Game Map" width={1920} height={1080} className="w-full h-auto border-1 border-red-dark rounded-2xl mb-6 sm:mb-10" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {zones.map((zone, i) => (
                    <ZoneCard key={zone.id} zone={zone} index={i} />
                ))}
            </div>
        </div>
    );
}
