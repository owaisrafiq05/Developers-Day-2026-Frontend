import { Metadata } from "next";
import { ContactUs } from "@/components/contact";
import RegistrationBanner from "@/components/registration/registration-banner";

const title = "Contact Us";
const description =
  "Contact the Developer's Day 2026 team for event details, collaboration, sponsorship, and support.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/contact-us",
  },
  openGraph: {
    title,
    description,
    url: "/contact-us",
    images: [{ url: "/logo-1.png", alt: "Contact Developer's Day 2026" }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/logo-1.png"],
  },
};

export default function ContactUsPage() {
  return (
    <>
      <ContactUs />
      <RegistrationBanner />
    </>
  );
}
