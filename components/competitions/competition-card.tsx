"use client";

import { ReactNode } from "react";
import { Button } from "@heroui/button";
import { Link } from "@heroui/link";
import Image from "next/image";
import { motion } from "framer-motion";

export interface CompetitionFeature {
  icon: ReactNode;
  label: string;
  sublabel: string;
}

export interface CompetitionCardProps {
  image?: string;
  title: string;
  titleIcon: ReactNode;
  description: string;
  features: CompetitionFeature[];
  registerHref?: string;
  variant?: "filled" | "outline";
}

export default function CompetitionCard({
  image,
  title,
  titleIcon,
  description,
  features,
  registerHref = "/register",
  variant = "filled",
}: CompetitionCardProps) {
  const w = title.split(/[\s_\n]+/).filter(Boolean);
  const lastWord = w.length > 1 ? w.pop() : null;
  const firstLine = w.join(" ");

  return (
    <motion.div
      whileHover={{ y: -4, transition: { duration: 0.25 } }}
      className="flex flex-col overflow-hidden bg-[#111214] border-[0.25px] border-[#333333]"
    >
      {/* ── Image section with overlaid title ── */}
      <div className="relative h-52 overflow-hidden flex-shrink-0 border-b-[0.25px] border-b-[#333333]">
        {/* Background image */}
        {image ? (
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover grayscale opacity-60"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-[#0e0e14] to-[#161620]" />
        )}
        {/* Bottom fade */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#111214] via-[#111214]/30 to-transparent" />

        {/* Title + icon anchored to bottom of image */}
        <div className="absolute bottom-0 left-0 right-0 flex justify-between items-end px-5 pb-4">
          <h3 className="text-white font-bold uppercase leading-tight text-2xl">
            {lastWord ? (
              <>
                <span className="block">{firstLine}</span>
                <span className="block">{lastWord}</span>
              </>
            ) : (
              firstLine
            )}
          </h3>
          <span className="text-[var(--color,#2563EB)] text-xl flex-shrink-0 mb-1">
            {titleIcon}
          </span>
        </div>
      </div>

      {/* ── Content section ── */}
      <div className="flex flex-col flex-1 px-5 pt-5 pb-5 gap-5">
        {/* Description */}
        <p className="text-white text-sm leading-relaxed">
          {description}
        </p>

        {/* Features 2×2 */}
        <div className="grid grid-cols-2 gap-3 flex-1">
          {features.map((feature, i) => (
            <div
              key={i}
              className="flex flex-col gap-2 bg-[#1a1b1e] border border-[#2a2b30] p-3"
            >
              {/* Icon on its own row */}
              <span className="text-[var(--color,#2563EB)]">
                {feature.icon}
              </span>
              <p className="text-white text-xs font-bold uppercase tracking-wide leading-tight">
                {feature.label}
              </p>
              <p className="text-gray-400 text-xs leading-snug">
                {feature.sublabel}
              </p>
            </div>
          ))}
        </div>

        {/* Register button */}
        <Button
          as={Link}
          href={registerHref}
          radius="none"
          fullWidth
          size="lg"
          className={
            variant === "filled"
              ? "bg-[var(--color,#2563EB)] text-white font-bold tracking-widest text-sm justify-between px-5"
              : "bg-transparent border-2 border-[var(--color,#2563EB)] text-[var(--color,#2563EB)] font-bold tracking-widest text-sm justify-between px-5"
          }
          endContent={
            <span className="text-lg font-bold">
              {variant === "filled" ? "→" : "↗"}
            </span>
          }
        >
          REGISTER NOW
        </Button>
      </div>
    </motion.div>
  );
}
