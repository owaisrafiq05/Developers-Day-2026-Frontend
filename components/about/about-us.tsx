"use client";

import StatCard from "./stat-card";
import Image from "next/image";
import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useRef, useState } from "react";

function useCountAnimation(target: number, duration: number = 2, shouldStart: boolean = false) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!shouldStart) return;

    const controls = animate(0, target, {
      duration,
      ease: [0.25, 0.1, 0.25, 1],
      onUpdate(value) {
        setCount(Math.floor(value));
      },
    });

    return () => controls.stop();
  }, [target, duration, shouldStart]);

  return count;
}

function AnimatedStat({ stat }: { stat: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  // Parse number and suffix (e.g. "4500+" → 4500, "+")
  const match = stat.match(/^(\d+)(\+?)$/);
  const numericValue = match ? parseInt(match[1], 10) : null;
  const suffix = match ? match[2] : "";

  const count = useCountAnimation(numericValue ?? 0, 2, isInView && numericValue !== null);

  return (
    <span ref={ref}>
      {numericValue !== null ? `${count}${suffix}` : stat}
    </span>
  );
}

export default function AboutUs() {
  const stats = [
    {
      stat: "4500+",
      title: "PARTICIPANTS",
      icon: (
        <Image
          src="/icons/participants.svg"
          alt="Participants"
          width={40}
          height={40}
        />
      ),
      variant: "red" as const,
    },
    {
      stat: "25+",
      title: "COMPETITION TRACKS",
      icon: (
        <Image
          src="/icons/competition-tracks.svg"
          alt="Competition Tracks"
          width={30}
          height={30}
        />
      ),
      variant: "dark" as const,
    },
    {
      stat: "30+",
      title: "PARTNER INSTITUTIONS",
      icon: (
        <Image
          src="/icons/partner.svg"
          alt="Partner Institutions"
          width={30}
          height={30}
        />
      ),
      variant: "red" as const,
    },
    {
      stat: "16",
      title: "YEARS OF LEGACY",
      icon: (
        <Image
          src="/icons/legacy.svg"
          alt="Years of Legacy"
          width={30}
          height={30}
        />
      ),
      variant: "dark" as const,
    },
  ];

  return (
    <section className="bg-dark-red text-white py-16 md:py-24 px-4">
      <div className="container mx-auto">
        {/* Header with Red Line */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
          className="flex gap-4 mb-12 md:mb-16"
        >
          <div className="w-1 bg-red-primary flex-shrink-0" />
          <div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              ABOUT_US
            </h2>
            <p className="text-gray-400 text-base md:text-lg font-light leading-relaxed">
              DEVDAY&apos;26 IS A DEVELOPER-FIRST COMPETITION EMPOWERING
              <br />
              INNOVATORS TO BUILD, COMPETE, AND PUSH BOUNDARIES THROUGH REAL-
              <br />
              WORLD CHALLENGES, COLLABORATION, AND CUTTING-EDGE TECHNOLOGY.
            </p>
            <div className="mt-6">
              <span className="inline-block bg-red-primary text-white text-xs font-mono px-3 py-1">
                V1
              </span>
            </div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0">
          {stats.map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.6,
                delay: index * 0.12,
                ease: [0.25, 0.1, 0.25, 1],
              }}
            >
              <StatCard
                {...card}
                stat={<AnimatedStat stat={card.stat} />}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}