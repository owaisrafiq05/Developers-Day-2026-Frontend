"use client";

import { motion } from "framer-motion";

export default function IncomingTransmission() {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="mt-8 text-center border border-dashed border-[#382929] py-8 px-4"
        >
            <p className="text-gray-600 font-mono text-xs md:text-sm tracking-[0.3em] uppercase">Transmission Incoming</p>
            <p className="text-yellow-500/70 font-mono text-sm md:text-base mt-3 tracking-wide">
                Stay tuned. The Narrator is injecting the coordinates soon.
            </p>
        </motion.div>
    );
}
