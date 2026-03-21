import { Metadata } from "next";
import BrandAmbassadors from "@/components/brand-ambassadors/brand-ambassadors";
import { RegistrationBanner } from "@/components/registration";


const title = "Brand Ambassadors";
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

async function getBrandAmbassadors() {
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/ambassadors/public`,
            { next: { revalidate: 600 } }
        );

        if (!res.ok) {
            throw new Error(`API returned ${res.status}: ${res.statusText}`);
        }

        const data = await res.json();
        return data.data;
    } catch (err) {
        console.error("getBrandAmbassadors failed:", err);
        throw err; // let error.tsx catch it
    }
}


export default async function ModulePage() {

    const brandAmbassadors = await getBrandAmbassadors();
    return (
        <>
            <BrandAmbassadors brandAmbassadors={brandAmbassadors} />
            <RegistrationBanner />
        </>
    );
}

