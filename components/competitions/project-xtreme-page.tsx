"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@heroui/button";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";
import CompetitionCard from "./competition-card";
import type { CompetitionWithCategory } from "@/types/competitions";

type Info = {
  id: string;
  title: string;
  short: string;
  lines: string[];
};

const projectXtremePanels: Info[] = [
  {
    id: "why",
    title: "Why Project Xtreme",
    short: "Turn your final-year project into a career launchpad.",
    lines: [
      "Present your product live to industry judges, founders, and technical leaders.",
      "Compete for massive winner rewards and high-value prizes that make your effort truly worth it.",
      "Get direct visibility that can convert into interviews, internships, and collaboration offers.",
      "Stand out from generic portfolios by demonstrating a working solution under expert scrutiny.",
    ],
  },
  {
    id: "benefits",
    title: "High-Impact Benefits",
    short: "Massive credibility, feedback, and growth in one arena.",
    lines: [
      "Receive real-world feedback on scalability, usability, architecture, and business value.",
      "Build your confidence by pitching to the same people who hire and fund technical talent.",
      "Create momentum for your project beyond campus with mentors and future partners.",
    ],
  },
  {
    id: "winner-perks",
    title: "Rewards and Perks",
    short: "Walk away with rewards, recognition, and momentum.",
    lines: [
      "Top teams get major cash prizes, industry recognition, and premium spotlight across the event.",
      "Winning projects gain visibility that can open doors to internships, placements, and funded opportunities.",
      "Your team earns a strong credibility boost that can accelerate your product journey after the event.",
    ],
  },
  {
    id: "audience",
    title: "Who Should Join",
    short: "Perfect for students ready to prove their product is real.",
    lines: [
      "Final-year teams with working FYPs and ambitious prototypes.",
      "Student builders seeking recruitment opportunities and expert validation.",
      "Creators who want their project to be remembered, referenced, and recommended.",
    ],
  },
];

interface ProjectXtremePageProps {
  initialCompetition: CompetitionWithCategory | null;
  initialError?: string | null;
}

export default function ProjectXtremePage({
  initialCompetition,
  initialError = null,
}: ProjectXtremePageProps) {
  const [activePanelId, setActivePanelId] = useState<string | null>(null);
  const projectCompetition = initialCompetition;
  const competitionError = initialError;

  const cardDescription = projectCompetition?.description?.trim()
    ? projectCompetition.description
    : "Show your project or FYP to an industry audience, receive direct expert feedback, and position your team for real opportunities. Project Xtreme is where your student idea is treated like the next serious product.";

  const competitionId = projectCompetition?.id || "comp-project-xtreme";
  const registerHref = `/register?competition=${competitionId}&category=project-xtreme`;

  return (
    <section
      className="bg-[var(--bg-color)] text-white py-16 md:py-24 px-4"
      style={{ "--color": "#C6FF00", "--bg-color": "#0B1200" } as React.CSSProperties}
    >
      <div className="container mx-auto max-w-6xl">
        <motion.div
          animate={{ opacity: 1, x: 0 }}
          className="flex gap-4 sm:gap-5 items-stretch mb-10 sm:mb-14"
          initial={{ opacity: 0, x: -40 }}
          transition={{ duration: 0.65, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <motion.div
            animate={{ scaleY: 1 }}
            className="w-1 bg-[var(--color)] self-stretch flex-shrink-0"
            initial={{ scaleY: 0 }}
            style={{ originY: 0 }}
            transition={{ duration: 0.55, delay: 0.3, ease: "easeOut" }}
          />

          <div className="flex flex-col gap-3 sm:gap-4 w-full">
            <div className="flex items-center justify-between gap-3 sm:gap-6">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold uppercase text-white leading-tight">
                PROJECT
                <br />
                <span className="text-[var(--color)]">XTREME</span>
              </h1>
              <motion.div
                animate={{ opacity: 1, scale: 1 }}
                className="flex-shrink-0 select-none"
                initial={{ opacity: 0, scale: 0.6 }}
                transition={{ duration: 0.55, delay: 0.35, ease: "easeOut" }}
              >
                <div
                  aria-label="Project Xtreme"
                  className="w-16 h-16 sm:w-24 sm:h-24 md:w-28 md:h-28 bg-[var(--color)]"
                  style={{
                    WebkitMaskImage: "url('/icons/project-xtreme.svg')",
                    maskImage: "url('/icons/project-xtreme.svg')",
                    WebkitMaskRepeat: "no-repeat",
                    maskRepeat: "no-repeat",
                    WebkitMaskPosition: "center",
                    maskPosition: "center",
                    WebkitMaskSize: "140%",
                    maskSize: "140%",
                  }}
                />
              </motion.div>
            </div>

            <p className="text-gray-300 text-[10px] sm:text-xs md:text-sm leading-relaxed uppercase tracking-widest max-w-3xl">
              IT IS YOUR CHANCE TO SHOWCASE YOUR PROJECT OR FYP IN FRONT OF INDUSTRY PROFESSIONALS.
              <br className="hidden sm:block" />
              STEP INTO PROJECT XTREME AND TURN STUDENT WORK INTO A REAL OPPORTUNITY.
            </p>
          </div>
        </motion.div>

        <motion.div
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start"
          initial="hidden"
          variants={{
            hidden: {},
            visible: {
              transition: { staggerChildren: 0.15, delayChildren: 0.2 },
            },
          }}
        >
          {/* LEFT — pinned to top, never grows */}
          <motion.div
            className="self-start"
            variants={{
              hidden: { opacity: 0, y: 40 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.55, ease: [0.25, 0.1, 0.25, 1] },
              },
            }}
          >
            <CompetitionCard
              id="project-xtreme"
              title="Project Xtreme"
              description={cardDescription}
              minTeamSize={projectCompetition?.minTeamSize ?? 1}
              maxTeamSize={projectCompetition?.maxTeamSize ?? 5}
              startTime={projectCompetition?.startTime ?? null}
              endTime={projectCompetition?.endTime ?? null}
              capacityLimit={projectCompetition?.capacityLimit ?? 1}
              earlyBirdLimit={projectCompetition?.earlyBirdLimit ?? 0}
              earlyBirdPrice={projectCompetition?.earlyBirdFee ?? 0}
              normalPrice={projectCompetition?.fee ?? 0}
              registerHref={registerHref}
            />
            {competitionError && (
              <p className="text-xs text-red-300 mt-3 uppercase tracking-wider">{competitionError}</p>
            )}
          </motion.div>

          {/* RIGHT — expands independently */}
          <motion.div
            className="grid grid-cols-1 gap-4 content-start"
            variants={{
              hidden: { opacity: 0, y: 40 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.55, ease: [0.25, 0.1, 0.25, 1] },
              },
            }}
          >
            {projectXtremePanels.map((panel) => {
              const isOpen = activePanelId === panel.id;
              return (
                <div
                  key={panel.id}
                  className="bg-[#111214] border border-[#2E3642] overflow-hidden"
                >
                  <div className="px-4 py-3 sm:p-5 flex items-center justify-between gap-4">
                    <div>
                      <h2 className="text-lg font-bold uppercase tracking-wide">{panel.title}</h2>
                      <p className="text-xs sm:text-sm text-gray-300 mt-1">{panel.short}</p>
                    </div>
                    <Button
                      isIconOnly
                      radius="none"
                      className="border border-[var(--color)] bg-transparent text-[var(--color)] hover:bg-[var(--color)]/10 w-10 h-10 min-w-10 flex-shrink-0"
                      aria-label={isOpen ? "Collapse" : "Expand"}
                      onPress={() => setActivePanelId(isOpen ? null : panel.id)}
                    >
                      {isOpen
                        ? <ChevronUpIcon className="w-5 h-5" />
                        : <ChevronDownIcon className="w-5 h-5" />
                      }
                    </Button>
                  </div>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
                      >
                        <div className="px-5 pb-5 border-t border-[#2E3642] pt-4">
                          <ul className="space-y-2 list-disc px-6">
                            {panel.lines.map((line) => (
                              <li key={line}>
                                <p className="text-sm text-gray-200 leading-relaxed">{line}</p>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}