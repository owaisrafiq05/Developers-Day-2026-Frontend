import { Metadata } from "next";
import { ComingSoon } from "@/components/global";

const title = "Event Details";
const description =
  "View schedule, venue, and key information for Developer's Day 2026 at FAST NUCES Karachi.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/event-details",
  },
  openGraph: {
    title,
    description,
    url: "/event-details",
    images: [{ url: "/logo-1.png", alt: "Developer's Day 2026 event details" }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/logo-1.png"],
  },
};

export default function EventDetailsPage() {
  return (
    <ComingSoon
      title="EVENT_DETAILS"
      description="SCHEDULE,_VENUE_AND_EVENT_INFO._THIS_PAGE_IS_UNDER_CONSTRUCTION."
    />
  );
}
