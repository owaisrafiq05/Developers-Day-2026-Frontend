import { Metadata } from "next";
import OurExcom from "@/components/team/our-excom";
import OurTeam from "@/components/team/our-team";
import RegistrationBanner from "@/components/registration/registration-banner";

const title = "Our Team";
const description =
  "Meet the executive and organizing team behind Developer's Day 2026 at FAST NUCES Karachi.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/our-team",
  },
  openGraph: {
    title,
    description,
    url: "/our-team",
    images: [{ url: "/hero.png", alt: "Developer's Day 2026 organizing team" }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/hero.png"],
  },
};

export default function OurTeamPage() {
  return (
    <>
      <OurExcom />
      <OurTeam />
      <RegistrationBanner />
    </>
  );
}
