"use client";

import { Button } from "@heroui/button";
import { Link } from "@heroui/link";
import { UserGroupIcon, BanknotesIcon, CalendarDaysIcon } from "@heroicons/react/24/solid";
import { motion } from "framer-motion";

export interface CompetitionCardProps {
  title: string;
  description: string;
  minTeamSize: number;
  maxTeamSize: number;
  startTime?: string | null;
  endTime?: string | null;
  capacityLimit: number;
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
  startTime,
  endTime,
  earlyBirdLimit,
  earlyBirdPrice,
  capacityLimit,
  normalPrice,
  registerHref = "/register",
}: CompetitionCardProps) {
  const parseBackendDateTimeParts = (value?: string | null) => {
    if (!value) return null;

    const match = value.trim().match(
      /^(\d{4})-(\d{2})-(\d{2})[T\s](\d{2}):(\d{2})(?::(\d{2}))?/
    );

    if (!match) return null;

    const year = Number(match[1]);
    const month = Number(match[2]);
    const day = Number(match[3]);
    const hour = Number(match[4]);
    const minute = Number(match[5]);

    if (
      year <= 0 ||
      month < 1 ||
      month > 12 ||
      day < 1 ||
      day > 31 ||
      hour < 0 ||
      hour > 23 ||
      minute < 0 ||
      minute > 59
    ) {
      return null;
    }

    return { year, month, day, hour, minute };
  };

  const formatTime12Hour = (hour: number, minute: number): string => {
    const suffix = hour >= 12 ? "PM" : "AM";
    const normalizedHour = hour % 12 || 12;
    return `${normalizedHour}:${String(minute).padStart(2, "0")} ${suffix}`;
  };

  const formatSchedule = (start?: string | null, end?: string | null): string => {
    const startParts = parseBackendDateTimeParts(start);
    const endParts = parseBackendDateTimeParts(end);
    const dateRef = startParts || endParts;

    if (!dateRef) {
      return "Schedule TBA";
    }

    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const date = `${String(dateRef.day).padStart(2, "0")} ${monthNames[dateRef.month - 1]} ${dateRef.year}`;
    const startLabel = startParts ? formatTime12Hour(startParts.hour, startParts.minute) : null;
    const endLabel = endParts ? formatTime12Hour(endParts.hour, endParts.minute) : null;

    if (startLabel && endLabel) {
      return `${date} • ${startLabel} - ${endLabel}`;
    }

    return `${date} • ${startLabel || endLabel}`;
  };

  const scheduleLabel = formatSchedule(startTime, endTime);

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
            <span className="text-white text-sm">TEAM: {maxTeamSize == 1 ? 'Individual' : (maxTeamSize == minTeamSize ? `${maxTeamSize} Members` : `${minTeamSize}-${maxTeamSize} Members`)}</span>
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

          <div className="bg-[#1A1A1A] p-3 w-full border border-[#FFFFFF0D] border-l-2 border-l-[var(--color,#2563EB)] flex flex-col items-baseline gap-2">
            <CalendarDaysIcon className="w-4 h-4 text-[var(--color,#2563EB)]" />
            <span className="text-white text-sm">{scheduleLabel}</span>
          </div>

          {/* Register Button */}
          <Button
            fullWidth
            as={capacityLimit <= 0 && earlyBirdLimit <= 0 ? "button" : Link}
            href={capacityLimit <= 0 && earlyBirdLimit <= 0 ? undefined : registerHref}
            isDisabled={capacityLimit <= 0 && earlyBirdLimit <= 0}
            radius="none"
            size="lg"
            className="font-bold tracking-widest text-sm justify-between px-5 bg-[var(--color,#2563EB)] hover:border hover:border-[var(--color,#2563EB)] hover:text-[var(--color,#2563EB)] hover:bg-transparent flex-shrink-0"
            endContent={capacityLimit <= 0 && earlyBirdLimit <= 0 ? undefined : <span className="text-lg font-bold">→</span>}
          >
            {capacityLimit <= 0 && earlyBirdLimit <= 0 ? "COMPETITION FULL" : "REGISTER NOW"}
          </Button>
        </div>
      </div>
    </motion.div>
  );
}