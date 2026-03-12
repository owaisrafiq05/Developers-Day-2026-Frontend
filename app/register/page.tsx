"use client";

import { Suspense, useEffect, useState } from "react";
import { Link } from "@heroui/link";
import { Button } from "@heroui/button";
import { ArrowLeftIcon, Squares2X2Icon } from "@heroicons/react/24/outline";
import RegistrationForm from "@/components/registration/registration-form";

// 5:00 PM PKT = UTC+5, so 12:00 UTC on March 12 2026
const OPEN_AT = new Date("2026-03-12T12:00:00.000Z");

function getTimeLeft() {
  const diff = OPEN_AT.getTime() - Date.now();
  if (diff <= 0) return null;
  const totalSeconds = Math.floor(diff / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return { hours, minutes, seconds };
}

function CountdownGate({ children }: { children: React.ReactNode }) {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (!getTimeLeft()) return;

    const interval = setInterval(() => {
      const t = getTimeLeft();
      setTimeLeft(t);
      if (!t) clearInterval(interval);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // SSR / hydration guard — don't flash either state
  if (!mounted) return null;

  // Registration is open
  if (!timeLeft) return <>{children}</>;

  // Registration is not yet open — show countdown
  const hh = String(timeLeft.hours).padStart(2, "0");
  const mm = String(timeLeft.minutes).padStart(2, "0");
  const ss = String(timeLeft.seconds).padStart(2, "0");

  return (
    <section className="min-h-[calc(100vh-5rem)] bg-dark-red text-white flex items-center justify-center px-4 py-16">
      <div className="max-w-xl mx-auto text-center">
        {/* Badge */}
        <div className="inline-block border-2 border-red-primary bg-red-primary/15 px-4 py-2 mb-8">
          <p className="text-red-primary text-xs md:text-sm font-mono tracking-wider">
            REGISTRATION_NOT_YET_OPEN
          </p>
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold uppercase mb-4 font-mono tracking-wide">
          OPENS AT 5:00 PM
        </h1>
        <div className="w-20 h-1 bg-red-primary mx-auto mb-8" />

        {/* Countdown blocks */}
        <div className="flex items-center justify-center gap-3 md:gap-6 mb-10">
          {[{ label: "HH", value: hh }, { label: "MM", value: mm }, { label: "SS", value: ss }].map(
            ({ label, value }, i) => (
              <div key={label} className="flex items-center gap-3 md:gap-6">
                <div className="flex flex-col items-center">
                  <div className="bg-dark-red-1 border-2 border-gray-800 px-5 py-4 min-w-[72px]">
                    <span className="text-4xl md:text-5xl font-bold font-mono text-white tabular-nums">
                      {value}
                    </span>
                  </div>
                  <span className="text-red-primary text-[10px] font-mono tracking-widest mt-2">
                    {label}
                  </span>
                </div>
                {i < 2 && (
                  <span className="text-3xl md:text-4xl font-bold text-red-primary font-mono mb-4">
                    :
                  </span>
                )}
              </div>
            )
          )}
        </div>

        <p className="text-gray-400 text-sm font-mono tracking-wider mb-10">
          REGISTRATION OPENS 12 MARCH 2026 · 17:00 PKT
        </p>

        <div className="w-4/5 mx-auto grid grid-cols-1 sm:grid-cols-2 gap-6">

          <Button
            as={Link}
            href="/"
            className="bg-red-primary hover:bg-red-700 text-white font-bold"
            radius="none"
            startContent={<ArrowLeftIcon className="w-5 h-5" />}
          >
            BACK TO HOME
          </Button>
          <Button
            as={Link}
            href="/modules"
            className="bg-red-primary hover:bg-red-700 text-white font-bold"
            radius="none"
            endContent={<Squares2X2Icon className="w-5 h-5" />}
          >
            EXPLORE MODULES
          </Button>
        </div>
      </div>
    </section>
  );
}

function RegistrationFallback() {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center font-mono">
      <div className="inline-block border-2 border-red-primary bg-red-primary/15 px-4 py-2 mb-6">
        <p className="text-red-primary text-xs tracking-wider">LOADING_MODULE</p>
      </div>
      <h2 className="text-xl md:text-2xl font-bold tracking-wide mb-4">
        INITIALIZING_REGISTRATION
      </h2>
      <div className="w-16 h-1 bg-red-primary mb-6" />
      <p className="text-gray-400 text-sm tracking-wider">
        ESTABLISHING_CONNECTION_WITH_SERVER...
      </p>
    </div>
  );
}

export default function RegisterPage() {
  return (
    <CountdownGate>
      <section className="bg-dark-red text-white py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <Suspense fallback={<RegistrationFallback />}>
            <div className="flex gap-4 mb-12 md:mb-16">
              <div className="w-1 bg-red-primary flex-shrink-0" />
              <div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
                  REGISTRATION
                </h1>
                <p className="text-gray-400 text-sm md:text-base leading-relaxed">
                  ESTABLISH CONNECTION FOR COMPETITIONS,
                  <br />
                  SPONSORSHIPS AND STRATEGIC ALLIANCES.
                </p>
              </div>
            </div>
            <RegistrationForm />
          </Suspense>
        </div>
      </section>
    </CountdownGate>
  );
}