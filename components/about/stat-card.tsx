"use client";

import { ReactNode } from "react";

interface StatCardProps {
  stat: React.ReactNode;
  title: string;
  icon: ReactNode;
  variant?: "red" | "dark";
}

export default function StatCard({ stat, title, icon, variant = "red" }: StatCardProps) {
  return (
    <div
      className={`relative p-6 md:p-8 flex flex-col justify-between min-h-[320px] md:min-h-[430px] ${
        variant === "red" ? "bg-red-medium" : "bg-dark-red-4"
      }`}
    >
      {/* Header with icon */}
      <div className="flex justify-between items-start mb-12">
        <p className={`text-xs font-mono ${variant === "red" ? "text-white" : "text-red-primary"}`}>STATS_01 //</p>
        <div className="text-white text-3xl md:text-4xl">{icon}</div>
      </div>

      {/* Stat Number */}
      <div className="mb-10">
        <h3 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4">{stat}</h3>
        <p className="text-sm md:text-base text-white font-mono uppercase tracking-wide">{title}</p>
      </div>

      {/* Footer */}
      <p className="text-xs text-white font-mono">STATUS: VERIFIED</p>
    </div>
  );
}
