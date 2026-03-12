"use client";

import { useEffect, useState } from "react";
import { Space_Grotesk } from "next/font/google";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function EventInfo() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const targetDate = new Date("2026-04-16T00:00:00").getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, []);

  const CountdownBlock = ({
    value,
    label,
  }: {
    value: number;
    label: string;
  }) => (
    <div className={`${spaceGrotesk.className} relative flex flex-1 flex-col items-center overflow-hidden border border-[#392828] bg-[#271C1C] p-6 max-sm:p-3 min-w-0`}>

      <div className="text-white font-bold text-6xl max-sm:text-3xl">
        {value.toString().padStart(2, "0")}
      </div>

      <div className="mt-1 text-xs font-semibold tracking-[0.25em] max-sm:tracking-[0.1em] text-white/40 uppercase max-sm:text-[8px]">
        {label}
      </div>

      <div className="absolute top-1 right-1 border-t-1 border-r-1 border-[#D411114D] h-2 w-2" />
      <div className="absolute bottom-1 left-1 border-b-1 border-l-1 border-[#D411114D] h-2 w-2" />
    </div>
  );

  return (
    <div className="mb-6 w-full max-w-3xl mx-auto">
      <div className="flex justify-between mb-2">
        <div className="text-[10px] tracking-[0.12em] text-white/40 uppercase font-mono">
          COUNTDOWN_TIMER_INIT
        </div>

        <div className="text-[10px] tracking-[0.12em] text-white/40 uppercase font-mono">
          FAST_NUCES_KHI
        </div>
      </div>

      {/* countdown blocks */}
      <div className="grid grid-cols-2 sm:flex gap-2 border border-[#392828] p-2">
        <CountdownBlock value={timeLeft.days} label="DAYS" />
        <CountdownBlock value={timeLeft.hours} label="HOURS" />
        <CountdownBlock value={timeLeft.minutes} label="MINUTES" />
        <CountdownBlock value={timeLeft.seconds} label="SECONDS" />
      </div>
    </div>
  );
}