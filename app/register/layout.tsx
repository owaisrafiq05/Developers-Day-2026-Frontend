import { Metadata } from "next";

const title = "Register";
const description =
  "Register for Developer's Day 2026 competitions, partnerships, and strategic collaborations.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/register",
  },
  openGraph: {
    title,
    description,
    url: "/register",
    images: [{ url: "/logo-1.png", alt: "Developer's Day 2026 registration" }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/logo-1.png"],
  },
};

export default function RegisterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}