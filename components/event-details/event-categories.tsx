"use client";
import ModuleCard from "@/components/modules/module-card";
import { Link } from "@heroui/link";
import { CalendarClock, Handshake, ChefHat, GamepadDirectional } from "lucide-react";
import { motion } from "framer-motion";

export function EventCategories() {
    const categories = [
        {
            id: "event-itinerary",
            icon: <CalendarClock size={32} className="text-[#00d2ff]" />,
            title: "EVENT ITINERARY",
            description: "Explore the full schedule, timings, and locations for all competitions and activities.",
            code: "E_01",
            url: "/event-itinerary",
        },
        {
            id: "job-fair",
            icon: <Handshake size={32} className="text-[#ffd700]" />,
            title: "JOB FAIR",
            description: "Connect with top tech companies, network with professionals, and secure career opportunities.",
            code: "E_02",
            url: "/job-fair",
        },
        {
            id: "food-fest",
            icon: <ChefHat size={32} className="text-[#ff6b6b]" />,
            title: "FOOD FEST",
            description: "Enjoy a wide variety of delicious meals and snacks from top food vendors.",
            code: "E_03",
            url: "/food-fest",
        },
        {
            id: "mini-games",
            icon: <GamepadDirectional size={32} className="text-[#b19cd9]" />,
            title: "MINI GAMES",
            description: "Take a break and participate in fun, interactive mini-games to win exciting prizes.",
            code: "E_04",
            url: "/mini-games",
        },
    ];

    return (
        <section className="bg-dark-red text-white py-16 md:py-24 px-4">
            <div className="container mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.65, ease: [0.25, 0.1, 0.25, 1] }}
                    className="flex justify-between items-center mb-6"
                >
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold pr-3">
                        EVENT_<wbr />DETAILS
                    </h2>
                    <span className="bg-red-primary text-white text-xs font-mono px-3 py-1">
                        V1
                    </span>
                </motion.div>
                <motion.div
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
                    style={{ originX: 0 }}
                    className="h-0.5 bg-red-primary mb-8"
                />

        
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    {categories.map((category, index) => (
                        <motion.div
                            key={category.code}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-60px" }}
                            transition={{
                                duration: 0.55,
                                delay: index * 0.1,
                                ease: [0.25, 0.1, 0.25, 1],
                            }}
                        >
                            <ModuleCard {...category} />
                        </motion.div>
                    ))}
                </div>


                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.55, delay: 0.15, ease: "easeOut" }}
                    className="flex justify-between items-center"
                >
                    <div className="flex gap-2">
                        <div className="w-2 h-2 bg-red-primary rounded-none" />
                        <div className="w-2 h-2 bg-red-primary rounded-none" />
                        <div className="w-2 h-2 bg-red-primary rounded-none" />
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
