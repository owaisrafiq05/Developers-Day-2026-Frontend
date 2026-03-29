import { Metadata } from "next";
import ModuleCompetitions from "@/components/competitions/module-competitions";
import { RegistrationBanner } from "@/components/registration";
import ModuleNotFound from "@/components/competitions/module-not-found";

const modules = [
    {
        id: "coding",
        icon: "/icons/coding.svg",
        title: "CODING_COMPETITIONS",
        categoryDescription: [
            "PROVE YOUR WORTH IN THE DIGITAL ARENA. THREE TRACKS. HIGH STAKES. PURE CODE.",
            "SELECT YOUR PROTOCOL AND EXECUTE."
        ],
        color: "#2563EB",
        bgColor: "#000613",
    },
    {
        id: "software-eng",
        icon: "/icons/software.svg",
        title: "SOFTWARE ENG_COMPETITIONS",
        categoryDescription: [
            "SYSTEMS RUN. ARCHITECTURES COLLIDE. LOGIC PREVAILS.",
            "ENGINEER THE CORE AND DOMINATE THE STACK."
        ],
        color: "#7C3AED",
        bgColor: "#060010",
    },
    {
        id: "tech-quest",
        icon: "/icons/tech.svg",
        title: "TECH_QUEST",
        categoryDescription: [
            "CLUES HIDDEN. SYSTEMS LOCKED. SECRETS EVERYWHERE.",
            "DECODE THE SIGNALS AND FIND THE EXIT."
        ],
        color: "#F59E0B",
        bgColor: "#0A0600",

    },
    {
        id: "dev-design",
        icon: "/icons/dev.svg",
        title: "DEV & DESIGN_COMPETITIONS",
        categoryDescription: [
            "BUILD THE PRODUCT. DESIGN THE EXPERIENCE. SHIP THE IDEA.",
            "FROM PIXELS TO PROTOTYPES — CREATE WHAT COMES NEXT."
        ],
        color: "#3AED5B",
        bgColor: "#000902",
    },
    {
        id: "ai-data",
        icon: "/icons/ai.svg",
        title: "AI & DATA SCI._COMPETITIONS",
        categoryDescription: [
            "TRAIN THE MODEL. CRACK THE DATA. OUTSMART THE MACHINE.",
            "AI IS THE WEAPON. INTELLIGENCE IS THE ADVANTAGE."
        ],
        color: "#00F0FF",
        bgColor: "#00080E",
    },
    {
        id: "general",
        icon: "/icons/general.svg",
        title: "GENERAL_COMPETITIONS",
        categoryDescription: [
            "PURE CHAOS. ZERO RULES. MAXIMUM FUN.",
            "GAMES, CHALLENGES, AND MOMENTS YOU WON'T FORGET."
        ],
        color: "#949494",
        bgColor: "#070707",
    },
    {
        id: "electrical-eng",
        icon: "/icons/electrical.svg",
        title: "ELECTRICAL ENG._COMPETITIONS",
        categoryDescription: [
            "CIRCUITS LIVE. MOTORS ROAR. ROBOTS COLLIDE.",
            "ENGINEER. BUILD. BATTLE. LET YOUR MACHINE DO THE TALKING."
        ],
        color: "#D35400",
        bgColor: "#0A0400",
    },
    {
        id: "business",
        icon: "/icons/business.svg",
        title: "BUSINESS_COMPETITIONS",
        categoryDescription: [
            "BUILD EMPIRES. BREAK MARKETS. THINK LIKE A CEO.",
            "ANALYZE THE NUMBERS. PITCH THE FUTURE. OUTPLAY THE COMPETITION."
        ],
        color: "#D000FF",
        bgColor: "#0B000E",
    },
];

function formatModuleTitle(rawTitle: string) {
    return rawTitle.replace(/_/g, " ").replace(/\s+/g, " ").trim();
}

function buildModuleJsonLd(moduleId: string, moduleTitle: string, moduleDescription: string) {
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.devday26.com";
    const moduleUrl = `${siteUrl}/modules/${moduleId}`;

    return {
        breadcrumb: {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
                {
                    "@type": "ListItem",
                    position: 1,
                    name: "Home",
                    item: siteUrl,
                },
                {
                    "@type": "ListItem",
                    position: 2,
                    name: "Modules",
                    item: `${siteUrl}/modules`,
                },
                {
                    "@type": "ListItem",
                    position: 3,
                    name: moduleTitle,
                    item: moduleUrl,
                },
            ],
        },
        collection: {
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: `${moduleTitle} Competitions`,
            description: moduleDescription,
            url: moduleUrl,
            isPartOf: {
                "@type": "WebSite",
                name: "Developer's Day 2026",
                url: siteUrl,
            },
        },
    };
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ id: string }>;
}): Promise<Metadata> {
    const { id } = await params;
    const selectedModule = modules.find((m) => m.id === id);

    if (!selectedModule) {
        return {
            title: "Module Not Found",
            description: "The requested competition module could not be found.",
            robots: {
                index: false,
                follow: false,
            },
        };
    }

    const moduleTitle = formatModuleTitle(selectedModule.title);
    const title = `${moduleTitle} | Developer's Day 2026`;
    const description = `${moduleTitle} competitions at Developer's Day 2026. ${selectedModule.categoryDescription[0]}`;
    const canonicalPath = `/modules/${selectedModule.id}`;

    return {
        title,
        description,
        alternates: {
            canonical: canonicalPath,
        },
        openGraph: {
            title,
            description,
            url: canonicalPath,
            images: [{ url: "/logo-1.png", alt: `${moduleTitle} competitions` }],
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
            images: ["/logo-1.png"],
        },
    };
}

async function getCompetitions() {
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/competitions/public`,
            { next: { revalidate: 600 } }
        );

        if (!res.ok) {
            throw new Error(`API returned ${res.status}: ${res.statusText}`);
        }

        const data = await res.json();
        return data.data;
    } catch (err) {
        console.error("getCompetitions failed:", err);
        throw err; // let error.tsx catch it
    }
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

const idToZonesMap: { [key: string]: string | null } = {
    "coding": "The Control Room",
    "software-eng": "Operation: Warzone",
    "tech-quest": "The Upside Down",
    "dev-design": "The Wizard’s Atelier",
    "ai-data": "The Gaming Arena",
    "general": null,
    "electrical-eng": null,
    "business": null,
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

    const moduleTitle = formatModuleTitle(selectedModule.title);
    const moduleDescription = `${moduleTitle} competitions at Developer's Day 2026. ${selectedModule.categoryDescription[0]}`;
    const moduleJsonLd = buildModuleJsonLd(moduleId, moduleTitle, moduleDescription);

    const competitions = await getCompetitions();
    const category = idToCategoryMap[moduleId];
    const categoryCompetitions = competitions.filter(
        (c: any) => c.category === category
    );
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(moduleJsonLd.breadcrumb) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(moduleJsonLd.collection) }}
            />
            <ModuleCompetitions
                id={selectedModule.id}
                icon={selectedModule.icon}
                title={selectedModule.title}
                categoryDescription={selectedModule.categoryDescription}
                color={selectedModule.color}
                bgColor={selectedModule.bgColor}
                categoryCompetitions={categoryCompetitions}
                zone={idToZonesMap[moduleId]}
            />
            <RegistrationBanner />
        </>
    );
}

