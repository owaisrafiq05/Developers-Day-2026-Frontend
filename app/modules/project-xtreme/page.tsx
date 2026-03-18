import { Metadata } from "next";
import ProjectXtremePage from "@/components/competitions/project-xtreme-page";
import type { CompetitionWithCategory } from "@/types/competitions";

const title = "Project Xtreme | Developer's Day 2026";
const description =
  "Project Xtreme gives students the spotlight to present FYPs and standout products in front of industry professionals, recruiters, and founders.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/modules/project-xtreme",
  },
  openGraph: {
    title,
    description,
    url: "/modules/project-xtreme",
    images: [{ url: "/logo-1.png", alt: "Project Xtreme at Developer's Day 2026" }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/logo-1.png"],
  },
};

async function getProjectXtremeCompetition(): Promise<CompetitionWithCategory> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/competitions/public`,
    { next: { revalidate: 600 } }
  );

  if (!res.ok) {
    throw new Error(`API returned ${res.status}: ${res.statusText}`);
  }

  const data = await res.json();
  const competitions = (data?.data || []) as CompetitionWithCategory[];
  const projectXtreme = competitions.find((comp) => comp.id === "comp-project-xtreme");

  if (!projectXtreme) {
    throw new Error("Project Xtreme competition not found.");
  }

  return projectXtreme;
}

export default async function ProjectXtremeRoutePage() {
  const initialCompetition = await getProjectXtremeCompetition();
  return <ProjectXtremePage initialCompetition={initialCompetition} />;
}
