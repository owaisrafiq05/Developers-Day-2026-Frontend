"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

interface SplashScreenProps {
  onComplete?: () => void;
  onFadeOutStart?: () => void;
  duration?: number;
}

export default function SplashScreen({
  onComplete,
  onFadeOutStart,
  duration = 3500,
}: SplashScreenProps) {
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);

  useEffect(() => {
    const fadeTimer = setTimeout(() => {
      setIsAnimatingOut(true);
      onFadeOutStart?.();
    }, duration - 1000);

    const completeTimer = setTimeout(() => {
      onComplete?.();
    }, duration);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(completeTimer);
    };
  }, [duration, onComplete, onFadeOutStart]);

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-gradient-to-b from-black via-[#140909] to-black
        transition-all duration-900 ease-in-out
        ${isAnimatingOut
          ? "opacity-0 scale-95 pointer-events-none"
          : "opacity-100 scale-100"
        }`}
    >
      {/* Subtle grid + corner glow */}
      <div className="pointer-events-none absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] [background-size:120px_120px]" />
      <div className="pointer-events-none absolute -top-32 -left-24 h-72 w-72 rounded-full bg-red-primary/25 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -right-32 h-80 w-80 rounded-full bg-red-primary/20 blur-3xl" />

      {/* Center content */}
      <div className="relative z-10 flex flex-col items-center gap-8">
        {/* Logo + title block */}
        <div className="relative flex items-center gap-6 px-6 py-5 md:px-10 md:py-7 rounded-md border border-red-primary/60 bg-black/40 backdrop-blur-sm">
          {/* Card glow */}
          <motion.div
            className="pointer-events-none absolute -inset-1 rounded-md border border-red-primary/30"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
          />

          {/* Logo stack with animated rings */}
          <div className="relative w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 shrink-0">
            {/* Pulsing ring */}
            <motion.div
              className="absolute inset-[-10px] rounded-full border border-red-primary/40"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: [0, 1, 0], scale: [0.9, 1.05, 1.1] }}
              transition={{
                duration: 1.8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            {/* Rotating dashed ring */}
            <motion.div
              className="absolute inset-[-6px] rounded-full border border-dashed border-red-primary/50"
              initial={{ rotate: 0, opacity: 0.7 }}
              animate={{ rotate: 360, opacity: 1 }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "linear",
              }}
            />
            {/* Logo */}
            <motion.div
              className="absolute inset-0"
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.9, ease: "easeOut" }}
            >
              <Image
                src="/logo-updated.png"
                alt="Developers Day Logo"
                fill
                className="object-contain"
                priority
              />
            </motion.div>
          </div>

          <div className="flex flex-col gap-2">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6, ease: "easeOut" }}
              className="font-mono text-[0.7rem] md:text-xs tracking-[0.28em] text-red-primary uppercase"
            >
              SYSTEM_BOOT_SEQUENCE
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55, duration: 0.6, ease: "easeOut" }}
              className="whitespace-nowrap text-xl md:text-2xl lg:text-3xl font-bold tracking-[0.3em] uppercase text-white"
            >
              DEVDAY_2026
            </motion.p>
          </div>
        </div>

        {/* Progress / status bar */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.5, ease: "easeOut" }}
          className="flex flex-col items-center gap-2 text-[0.7rem] md:text-xs font-mono tracking-[0.18em] text-gray-400 uppercase text-center px-4"
        >
          <p>INITIALIZING_MODULES // UI_CORE · MAP_ENGINE · MOTION_LAYER</p>
          <div className="relative w-52 md:w-64 h-[2px] bg-white/10 overflow-hidden">
            <motion.div
              className="absolute inset-y-0 left-0 w-1/3 bg-red-primary"
              initial={{ x: "-100%" }}
              animate={{ x: "200%" }}
              transition={{
                duration: 1.6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.35, 1, 0.35] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
            className="text-[0.65rem] md:text-[0.7rem] tracking-[0.2em] text-gray-500"
          >
            STATUS: READY_FOR_DEPLOY
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
}

