import { Metadata } from "next";
import { ComingSoon } from "@/components/global";
import { ModuleCategories } from "@/components/modules";

const title = "Competition Modules";
const description =
  "Explore all Developer's Day 2026 competition modules, categories, and tracks to find where you can compete.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/modules",
  },
  openGraph: {
    title,
    description,
    url: "/modules",
    images: [{ url: "/logo-1.png", alt: "Developer's Day 2026 competition modules" }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/logo-1.png"],
  },
};

export default function ModulesPage() {
  return (
    // <ComingSoon
    //   title="MODULES"
    //   description="EXPLORE_COMPETITION_MODULES_AND_TRACKS._THIS_PAGE_IS_UNDER_CONSTRUCTION."
    // />
    <ModuleCategories />
  );
}
