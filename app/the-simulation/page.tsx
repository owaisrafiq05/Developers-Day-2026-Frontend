import { Metadata } from "next";
import VRSimulation from "@/components/the-simulation/vr-simulation";
import RegistrationBanner from "@/components/registration/registration-banner";

const title = "VR Simulation";
const description =
    "Experience the thrill of the future with our VR Simulation experience at Developer's Day 2026!";

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
            <VRSimulation />
            <RegistrationBanner />
        </>
    );
}
