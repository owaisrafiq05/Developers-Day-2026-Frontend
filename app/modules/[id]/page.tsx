import Image from "next/image";
import ModuleCompetitions from "@/components/competitions/module-competitions";
import { RegistrationBanner } from "@/components/registration";
import ModuleNotFound from "@/components/competitions/module-not-found";

const modules = [
    {
        id: "coding",
        icon: "/icons/coding.svg",
        title: "CODING_COMPETITIONS",
        description:
            "Solve algorithmic challenges and compete in real-time coding competitions.",
        color: "#2563EB",
        bgColor: "#000613",
    },
    {
        id: "software-eng",
        icon: "/icons/software.svg",
        title: "SOFTWARE ENG_COMPETITIONS",
        description:
            "Architecting resilient systems that withstand the pressure of high-throughput operations.",
        color: "#7C3AED",
        bgColor: "#060010",
    },
    {
        id: "tech-quest",
        icon: "/icons/tech.svg",
        title: "TECH_QUEST",
        description:
            "Exploration and tech testing platform digital innovations.",
        color: "#F59E0B",
        bgColor: "#0A0600",

    },
    {
        id: "dev-design",
        icon: "/icons/dev.svg",
        title: "DEV & DESIGN_COMPETITIONS",
        description:
            "Stress-testing structures through adversarial design and deconstruction.",
        color: "#3AED5B",
        bgColor: "#000902",
    },
    {
        id: "ai-data",
        icon: "/icons/ai.svg",
        title: "AI & DATA SCI._COMPETITIONS",
        description:
            "Deep neural modeling and predictive analytics processing vast datasets logic warfare.",
        color: "#00F0FF",
        bgColor: "#00080E",
    },
    {
        id: "general",
        icon: "/icons/general.svg",
        title: "GENERAL_COMPETITIONS",
        description:
            "Open competitions across multiple disciplines testing creativity and problem solving.",
        color: "#949494",
        bgColor: "#070707",
    },
    {
        id: "electrical-eng",
        icon: "/icons/electrical.svg",
        title: "ELECTRICAL ENG._COMPETITIONS",
        description:
            "Hardware systems, circuit design and embedded engineering challenges.",
        color: "#D35400",
        bgColor: "#0A0400",
    },
    {
        id: "business",
        icon: "/icons/business.svg",
        title: "BUSINESS_COMPETITIONS",
        description:
            "Strategy, entrepreneurship and business case competitions.",
        color: "#D000FF",
        bgColor: "#0B000E",
    },
];

async function getCompetitions() {
    await new Promise((resolve) => setTimeout(resolve, 3000)); // 👈 add this
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/competitions/public`,
        {
            next: { revalidate: 3600 }, // cache for 1 hour
        }
    );

    if (!res.ok) {
        throw new Error("Failed to fetch competitions");
    }

    const data = await res.json();
    return data.data;
}

const idToCategoryMap: { [key: string]: string } = {
    "coding": "Core Coding",
    "software-eng": "Software Engineering",
    "tech-quest": "Tech Quest",
    "dev-design": "Development & Design",
    "ai-data": "AI & Data Science",
    "general": "General",
    "electrical-eng": "Electrical Engineering",
    "business": "Business",
};

export default async function ModulePage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id: moduleId } = await params;
    const selectedModule = modules.find((m) => m.id === moduleId);

    if (!selectedModule) {
        return (
            <ModuleNotFound moduleId={moduleId} />
        );
    }

    const competitions = await getCompetitions();
    const category = idToCategoryMap[moduleId];
    const categoryCompetitions = competitions.filter(
        (c: any) => c.category === category
    );
    return (
        <>
            <ModuleCompetitions {...selectedModule} categoryCompetitions={categoryCompetitions} />
            <RegistrationBanner />
        </>
    );
}

