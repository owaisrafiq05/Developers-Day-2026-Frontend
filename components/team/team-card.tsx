"use client";

import { Button } from "@heroui/button";
import { Link } from "@heroui/link";
import { ArrowUpRightIcon } from "@heroicons/react/24/outline";
import Image from "next/image";

interface TeamCardProps {
  name: string;
  role: string;
  image: string;
  linkedInUrl: string;
  gradientVariant: "red" | "cyan";
  isMiddle?: boolean;
}

export default function TeamCard({ name, role, image, linkedInUrl, gradientVariant, isMiddle }: TeamCardProps) {
  const roleColorClass =
    gradientVariant === "red" ? "text-[#ED5554]" : "text-[#00F0FF]";
  const gradientStyle =
    gradientVariant === "red"
      ? "radial-gradient(ellipse 90% 80% at 85% 85%, rgba(237,85,84,0.5) 0%, transparent 60%)"
      : "radial-gradient(ellipse 90% 80% at 85% 85%, rgba(0,240,255,0.5) 0%, transparent 60%)";

  return (
    <div
      className={`relative bg-[#232323] border border-gray-700/50 overflow-hidden flex flex-col ${
        isMiddle
          ? "min-h-[340px] sm:min-h-[380px] md:min-h-[420px] lg:min-h-[450px]"
          : "min-h-[300px] sm:min-h-[330px] md:min-h-[360px] lg:min-h-[390px]"
      }`}
    >
      {/* Gradient background */}
      <div
        className="absolute inset-0 z-0"
        style={{ background: gradientStyle }}
        aria-hidden
      />

      {/* Card content */}
      <div className="relative z-10 p-4 pt-8 sm:p-6 sm:pt-12 flex flex-col h-[160px] sm:h-[180px]">
        <p className={`text-sm sm:text-base font-mono uppercase tracking-wider mb-1 ${roleColorClass}`}>
          {role}
        </p>
        <h3 className="text-white text-lg sm:text-xl md:text-3xl font-bold uppercase mb-3 sm:mb-4 mt-4 sm:mt-6">
          {name}
        </h3>
      </div>

      {/* Bottom row: Button left, Image right */}
      <div className="relative z-10 p-3 pr-0 pb-0 sm:p-5 sm:pr-0 sm:pb-0 flex items-end justify-between gap-2 sm:gap-3">
        <Button
          as={Link}
          href={linkedInUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mb-8 sm:mb-10 bg-[#353535] hover:bg-gray-700 text-white font-mono text-xs sm:text-sm"
          radius="full"
          size="sm"
          endContent={<ArrowUpRightIcon className="w-3 h-3 sm:w-4 sm:h-4" />}
        >
          LinkedIn
        </Button>
        <div className="relative flex-shrink-0 flex items-end justify-end w-[180px] sm:w-[200px] md:w-[220px] lg:w-[250px]">
          <Image
            src={image}
            alt={name}
            width={1000}
            height={1000}
            className="object-contain object-bottom w-full h-auto grayscale min-h-[220px] sm:min-h-[230px] md:min-h-[240px]"
          />
        </div>
      </div>
    </div>
  );
}