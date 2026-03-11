"use client";

import { Button } from "@heroui/button";
import { Link } from "@heroui/link";
import { UserGroupIcon, BanknotesIcon } from "@heroicons/react/24/solid";
import { motion } from "framer-motion";

export interface CompetitionCardProps {
  title: string;
  description: string;
  minTeamSize: number;
  maxTeamSize: number;
  earlyBirdLimit: number;
  earlyBirdPrice: number;
  normalPrice: number;
  registerHref?: string;
}

export default function CompetitionCard({
  title,
  description,
  minTeamSize,
  maxTeamSize,
  earlyBirdLimit,
  earlyBirdPrice,
  normalPrice,
  registerHref = "/register",
}: CompetitionCardProps) {
  return (
    <motion.div
      className="flex flex-col h-full overflow-hidden bg-[#111214] border-[0.25px] border-[#333333]"
      whileHover={{ y: -4, transition: { duration: 0.25 } }}
    >
      {/* Title */}
      <div className="bg-[#1A1A1A] border border-[#333333] p-4 flex-shrink-0">
        <h2 className="text-white text-2xl font-bold uppercase tracking-wide">
          {title}
        </h2>
      </div>

      {/* Content */}
      <div className="p-8 flex flex-col gap-6 flex-1">
        <p className="text-[#CBD5E1] text-sm leading-6 flex-1">{description}</p>

        {/* Info Row */}
        <div className="flex flex-col sm:flex-col gap-4 w-full">
          {/* Team Size */}
          <div className="bg-[#1A1A1A] p-3 w-full border border-[#FFFFFF0D] border-l-2 border-l-[var(--color,#2563EB)] flex flex-col items-baseline gap-2">
            <UserGroupIcon className="w-4 h-4 text-[var(--color,#2563EB)]" />
            <span className="text-white text-sm">TEAM: {maxTeamSize==1 ? 'Individual' : `${minTeamSize}-${maxTeamSize} Members`}</span>
          </div>

          {/* Fees */}
          <div className="bg-[#1A1A1A] p-3 w-full border border-[#FFFFFF0D] border-l-2 border-l-[var(--color,#2563EB)] flex flex-col items-baseline gap-2">
            {earlyBirdLimit > 0 ? (
              <>
                <div className="flex gap-4 items-center">
                  <BanknotesIcon className="w-4 h-4 text-[var(--color,#2563EB)]" />
                  <span className="text-white text-xs">Early Bird Discount</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-gray-500 line-through">PKR {normalPrice}</span>
                  <span className="text-white font-semibold">PKR {earlyBirdPrice}</span>
                </div>
              </>
            ) :
              <>
                <BanknotesIcon className="w-4 h-4 text-[var(--color,#2563EB)]" />
                <span className="text-white">PKR {normalPrice}</span>
              </>
            }
          </div>

          {/* Register Button */}
          <Button
            fullWidth
            as={Link}
            href={registerHref}
            radius="none"
            size="lg"
            className="font-bold tracking-widest text-sm justify-between px-5 bg-[var(--color,#2563EB)] hover:border hover:border-[var(--color,#2563EB)] hover:text-[var(--color,#2563EB)] hover:bg-transparent flex-shrink-0"
            endContent={<span className="text-lg font-bold">→</span>}
          >
            REGISTER NOW
          </Button>
        </div>
        </div>  
    </motion.div>
  );
}