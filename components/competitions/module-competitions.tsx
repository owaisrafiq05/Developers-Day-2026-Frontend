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
  description: string;
  color: string;
  bgColor: string;
  categoryCompetitions: Competition[];
}

export default function ModuleCompetitions({
  id,
  icon,
  title,
  description: _description,
  color,
  bgColor,
  categoryCompetitions
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
              className="text-gray-400 text-[10px] sm:text-xs md:text-sm leading-relaxed uppercase tracking-widest max-w-xl"
              initial={{ opacity: 0, y: 16 }}
              transition={{ duration: 0.55, delay: 0.45, ease: "easeOut" }}
            >
              PROVE YOUR WORTH IN THE DIGITAL ARENA. TWO TRACKS. HIGH STAKES.
              PURE CODE.
              <br className="hidden sm:block" /> SELECT YOUR PROTOCOL AND
              EXECUTE
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
        {/* ── Cards Grid ── */}
        <motion.div
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-32 sm:mt-40"
          initial="hidden"
          variants={containerVariants}
        >
          {categoryCompetitions.map((comp: Competition) => (
            <motion.div key={comp.id} variants={cardVariants}>
              <CompetitionCard
                title={comp.name}
                description={comp.description}
                minTeamSize={comp.minTeamSize}
                maxTeamSize={comp.maxTeamSize}
                startTime={comp.startTime}
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
