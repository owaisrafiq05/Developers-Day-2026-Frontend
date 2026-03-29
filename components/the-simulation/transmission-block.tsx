"use client";

import { motion } from "framer-motion";

export default function TransmissionBlock() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="border border-[#382929] bg-[#1D0E0E] p-6 md:p-10"
        >
            <p className="font-mono text-sm font-bold md:text-base text-red-primary tracking-[0.3em] uppercase mb-4">
                Objective: Escape_the_Simulation
            </p>
            <p className="text-[#CBD5E1] text-xs md:text-sm leading-relaxed">
                You received a strange VR invite — no name, no description, just a single entry point. The moment you put on the headset, you're pulled into a fractured simulation of shifting landscapes, broken physics, and unpredictable zones.
                <br /><br />

                You are the Narrator’s final gamble — an outsider sent in with one goal: reach the Control Room. Conquer each Competition Zone, complete missions, and collect the scattered Stones to move forward.
                <br /><br />

                But the Mastermind is watching — adapting, resisting — because your success means his end.
                <br /><br />

                To survive, you must push through every zone and face the final choice: <span className="text-red-primary font-bold">save the creator — or destroy the only being fighting to survive?</span>
            </p>
        </motion.div>
    );
}
