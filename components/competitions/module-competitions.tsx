"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Ticker from "./ticker";
import CompetitionCard from "./competition-card";
import CategoryHeads from "./category-heads";

type Competition = {
  id: string,
  name: string;
  category: string;
  description: string;
  capacityLimit: number;
  earlyBirdLimit: number;
  ruleBookUrl?: string;
  fee: number;
  earlyBirdFee: number;
  minTeamSize: number;
  maxTeamSize: number;
  startTime?: string | null;
  endTime?: string | null;
};

/* ── animation variants ── */
const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15, delayChildren: 0.25 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 48 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as const },
  },
};

export interface CompetitionsCateogoryProps {
  id: string;
  icon: any;
  title: string;
  categoryDescription: Array<string>;
  color: string;
  bgColor: string;
  categoryCompetitions: Competition[];
  zone: string | null;
}

export default function ModuleCompetitions({
  id,
  icon,
  title,
  categoryDescription,
  color,
  bgColor,
  categoryCompetitions,
  zone
}: CompetitionsCateogoryProps) {

  return (
    <section
      className="bg-[var(--bg-color)] text-white py-16 md:py-24 px-4"
      style={{ "--color": color, "--bg-color": bgColor } as React.CSSProperties}
    >
      <div className="container mx-auto max-w-6xl ">
        {/* ── Header ── */}
        <motion.div
          animate={{ opacity: 1, x: 0 }}
          className="flex gap-4 sm:gap-5 items-stretch mb-10 sm:mb-14"
          initial={{ opacity: 0, x: -40 }}
          transition={{ duration: 0.65, ease: [0.25, 0.1, 0.25, 1] }}
        >
          {/* Vertical accent line */}
          <motion.div
            animate={{ scaleY: 1 }}
            className="w-1 bg-[var(--color)] self-stretch flex-shrink-0"
            initial={{ scaleY: 0 }}
            style={{ originY: 0 }}
            transition={{ duration: 0.55, delay: 0.3, ease: "easeOut" }}
          />

          {/* Content */}
          <div className="flex flex-col gap-3 sm:gap-4 w-full">
            {/* Row 1: Heading + Icon */}
            <div className="flex items-center justify-between gap-3 sm:gap-6">
              <div>
                {(() => {
                  const w = title.split(/[\s_\n]+/).filter(Boolean);
                  const last = w.pop();

                  return (
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold uppercase text-white leading-tight">
                      {w.join(" ")}
                      {w.length > 0 && <br />}
                      <span className="text-[var(--color)]">{last}</span>
                    </h1>
                  );
                })()}
              </div>

              <motion.div
                animate={{ opacity: 1, scale: 1 }}
                className="flex-shrink-0 select-none"
                initial={{ opacity: 0, scale: 0.6 }}
                transition={{ duration: 0.55, delay: 0.35, ease: "easeOut" }}
              >
                <Image
                  alt={id}
                  className="w-14 h-14 sm:w-20 sm:h-20 md:w-24 md:h-24"
                  height={100}
                  src={icon}
                  width={100}
                />
              </motion.div>
            </div>

            {/* Row 2: Description */}
            <motion.p
              animate={{ opacity: 1, y: 0 }}
              className="text-gray-400 text-[10px] sm:text-xs md:text-sm leading-relaxed uppercase tracking-widest"
              initial={{ opacity: 0, y: 16 }}
              transition={{ duration: 0.55, delay: 0.45, ease: "easeOut" }}
            >
              {categoryDescription[0]}
              <br className="hidden sm:block" />
              {categoryDescription[1]}
            </motion.p>
          </div>
        </motion.div>


        <motion.div
          animate="visible"
          className="absolute w-full w-vw left-0"
          initial="hidden"
          variants={containerVariants}
        >
          <Ticker categoryId={id} color={color} bgColor={bgColor} />
        </motion.div>

        {/* ── Zone Context ── */}
        {zone && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
            className="mt-28 sm:mt-32 relative overflow-hidden"
          >

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

              {/* Left: Zone Info */}
              <div>
                <p className="text-[10px] sm:text-xs font-mono tracking-[0.3em] text-gray-500 uppercase sm:mb-2">
                  Simulation_Context
                </p>

                <h3 className="text-lg sm:text-xl md:text-2xl font-mono font-bold uppercase text-white sm:mb-2">
                  <span style={{ color }}>{zone}</span>
                </h3>

                <p className="text-gray-400 text-[11px] sm:text-xs font-mono uppercase tracking-wider">
                  Environment initialized. Modules operating within this zone.
                </p>
              </div>

              {/* Right: CTA */}
              <button
                onClick={() => window.location.href = "/the-simulation"}
                className="font-mono text-[10px] font-bold sm:text-xs tracking-[0.25em] uppercase px-4 py-2 border transition-all hover:bg-[var(--color)]/20 cursor-pointer"
                style={{
                  borderColor: color,
                  color: color
                }}
              >
                View_Full_Lore →
              </button>
            </div>
          </motion.div>
        )}

        {/* ── Cards Grid ── */}
        <motion.div
          animate="visible"
          className={`grid grid-cols-1 md:grid-cols-2 gap-6 ${zone ? "mt-8 sm:mt-10" : "mt-28 sm:mt-32"}`}
          initial="hidden"
          variants={containerVariants}
        >
          {categoryCompetitions.map((comp: Competition) => (
            <motion.div key={comp.id} variants={cardVariants}>
              <CompetitionCard
                id={comp.id}
                title={comp.name}
                description={comp.description}
                minTeamSize={comp.minTeamSize}
                maxTeamSize={comp.maxTeamSize}
                startTime={comp.startTime}
                ruleBookUrl={comp.ruleBookUrl}
                endTime={comp.endTime}
                capacityLimit={comp.capacityLimit}
                earlyBirdLimit={comp.earlyBirdLimit}
                earlyBirdPrice={comp.earlyBirdFee}
                normalPrice={comp.fee}
                registerHref={"/register" + `?competition=${comp.id}`}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* ── Header 2 ── */}
        <motion.div
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          className="flex gap-4 sm:gap-5 items-stretch mb-10 sm:mb-14 mt-14 sm:mt-20"
          initial={{ opacity: 0, y: 30 }}
          transition={{ duration: 0.65, ease: [0.25, 0.1, 0.25, 1] }}
        >
          {/* Vertical accent line */}
          <motion.div
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            className="w-1 bg-[var(--color)] self-stretch flex-shrink-0"
            initial={{ scaleY: 0 }}
            style={{ originY: 0 }}
            transition={{ duration: 0.55, delay: 0.2, ease: "easeOut" }}
          />

          {/* Content */}
          <div className="flex flex-col gap-3 sm:gap-4 w-full">
            {/* Row 1: Heading + Icon */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold uppercase text-white leading-tight">
              Command_Structure_
            </h1>

            {/* Row 2: Description */}
            <motion.p
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-gray-400 text-[10px] sm:text-xs md:text-sm leading-relaxed uppercase tracking-widest max-w-xl"
              initial={{ opacity: 0, y: 16 }}
              transition={{ duration: 0.55, delay: 0.3, ease: "easeOut" }}
            >
              HEADS & CO-HEADS OVERSEEING ALL COMPETITION MODULES
            </motion.p>
          </div>
        </motion.div>



        <motion.div
          className="sm:mt-10 mt-2"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={{
            hidden: { opacity: 0, y: 40 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }
            }
          }}
        >
          <CategoryHeads categoryId={id} color={color} bgColor={bgColor} />
        </motion.div>
      </div>
    </section>
  );
}
