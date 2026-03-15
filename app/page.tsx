import { Metadata } from "next";
import { Hero } from "@/components/hero";
import { AboutUs } from "@/components/about";
import { ModuleCategories } from "@/components/modules";
import { ReconLogs } from "@/components/recon";
import { Testimonials } from "@/components/testimonials";
import { RegistrationBanner } from "@/components/registration";
// import CampusReservationMap from "@/components/campusReservationMap";

const title = "Developer's Day 2026 | FAST NUCES Karachi";
const description =
  "Join Developer's Day 2026 at FAST NUCES Karachi for coding competitions, networking, and innovation-led experiences.";
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.devday26.com";

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Developer's Day",
  url: siteUrl,
  logo: `${siteUrl}/logo-1.png`,
  sameAs: ["https://www.linkedin.com/company/developersday/","https://www.instagram.com/developersday/","https://www.facebook.com/developersday/"],
};

const eventJsonLd = {
  "@context": "https://schema.org",
  "@type": "Event",
  name: "Developer's Day 2026",
  description,
  "startDate": "2026-04-16T09:00:00+05:00",
  "endDate": "2026-04-16T18:00:00+05:00",
  eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
  eventStatus: "https://schema.org/EventScheduled",
  url: siteUrl,
  image: [`${siteUrl}/logo-1.png`],
  organizer: {
    "@type": "Organization",
    name: "Developer's Day",
    url: siteUrl,
  },
  location: {
    "@type": "Place",
    name: "FAST NUCES Karachi",
    address: {
      "@type": "PostalAddress",
      streetAddress: "ST-4 Sector 17-D, NH 5", 
      addressLocality: "Karachi",
      addressRegion: "Sindh", 
      postalCode: "75030",
      addressCountry: "PK",
    },
  },
};

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title,
    description,
    url: "/",
    images: [{ url: "/logo-1.png", alt: "Developer's Day 2026 logo-1 banner" }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/logo-1.png"],
  },
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(eventJsonLd) }}
      />
      <Hero />
      <AboutUs />
      <ModuleCategories />
      {/* <CampusReservationMap /> */}
      <ReconLogs />
      <Testimonials />
      <RegistrationBanner />
    </>
  );
}
