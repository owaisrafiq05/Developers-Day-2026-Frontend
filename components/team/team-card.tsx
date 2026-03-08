"use client";

import { Button } from "@heroui/button";
import { Link } from "@heroui/link";
import { ArrowUpRightIcon, XMarkIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { useState } from "react";

interface TeamCardProps {
  name: string;
  role: string;
  image: string;
  linkedInUrl?: string;
  gradientVariant: "red" | "cyan";
  isMiddle?: boolean;
}

export default function TeamCard({ name, role, image, linkedInUrl, gradientVariant, isMiddle }: TeamCardProps) {
  const [showModal, setShowModal] = useState(false);

  const roleColorClass =
    gradientVariant === "red" ? "text-[#ED5554]" : "text-[#00F0FF]";
  const gradientStyle =
    gradientVariant === "red"
      ? "radial-gradient(ellipse 90% 80% at 85% 85%, rgba(237,85,84,0.5) 0%, transparent 60%)"
      : "radial-gradient(ellipse 90% 80% at 85% 85%, rgba(0,240,255,0.5) 0%, transparent 60%)";

  const accentColor = gradientVariant === "red" ? "#ED5554" : "#00F0FF";

  return (
    <>
      <div
        className={`relative bg-[#232323] border border-gray-700/50 overflow-hidden flex flex-col ${isMiddle
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
        <div className="relative z-10 p-3 pr-0 pb-0 sm:p-5 sm:pr-0 sm:pb-0 flex items-end justify-between gap-2 sm:gap-2">
          {linkedInUrl ? (
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
          ) : (
            <Button
              onPress={() => setShowModal(true)}
              className="mb-8 sm:mb-10 bg-[#353535] hover:bg-gray-700 text-white font-mono text-xs sm:text-sm"
              radius="full"
              size="sm"
              endContent={<ArrowUpRightIcon className="w-3 h-3 sm:w-4 sm:h-4" />}
            >
              LinkedIn
            </Button>
          )}
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

      {/* Modal */}
      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={() => setShowModal(false)}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

          {/* Modal box */}
          <div
            className="relative bg-[#1a1a1a] border border-gray-700/60 rounded-2xl p-8 max-w-sm w-full text-center shadow-2xl"
            style={{ boxShadow: `0 0 40px ${accentColor}22, 0 25px 50px rgba(0,0,0,0.6)` }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Accent glow top */}
            <div
              className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-px"
              style={{ background: `linear-gradient(90deg, transparent, ${accentColor}, transparent)` }}
            />

            {/* Close button */}
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-white transition-colors p-1 rounded-full hover:bg-white/10"
            >
              <XMarkIcon className="w-4 h-4" />
            </button>

            {/* Heading */}
            <h4
              className="font-mono uppercase tracking-widest text-xs font-bold mb-3"
              style={{ color: accentColor }}
            >
              {name}
            </h4>

            {/* Fun message */}
            <p className="text-white font-bold text-xl mb-2 leading-snug">
              Too cool for LinkedIn.
            </p>
            <p className="text-gray-400 text-sm font-mono">
              Some legends don't need a profile. You already know the name.
            </p>

            {/* Dismiss */}
            <button
              onClick={() => setShowModal(false)}
              className="mt-6 px-6 py-2 rounded-full font-mono text-xs uppercase tracking-wider text-black font-bold transition-opacity hover:opacity-80"
              style={{ background: accentColor }}
            >
              Fair enough
            </button>
          </div>
        </div>
      )}
    </>
  );
}