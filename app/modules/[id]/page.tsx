import Image from "next/image";
import ModuleCompetitions from "@/components/competitions/module-competitions";
import { RegistrationBanner } from "@/components/registration";
import ModuleNotFound from "@/components/competitions/module-not-found";

const modules = [
    {
        id: "coding-competitions",
        icon: (
            <Image src="/icons/coding.svg" alt="Coding" width={32} height={32} />
        ),
        title: "CODE_CODING",
        description:
            "Solve algorithmic challenges and compete in real-time coding competitions.",
        color: "#2563EB"
    },
    {
        id: "software-engineering",
        icon: (
            <Image
                src="/icons/software.svg"
                alt="Software"
                width={32}
                height={32}
            />
        ),
        title: "SOFTWARE_ENGINEERING",
        description:
            "Architecting resilient systems that withstand the pressure of high-throughput operations.",
        color: "#7C3AED",
    },
    {
        id: "tech-quest",
        icon: (
            <Image src="/icons/tech.svg" alt="Tech" width={32} height={32} />
        ),
        title: "TECH_QUEST",
        description:
            "Exploration and tech testing platform digital innovations.",
        color: "#F59E0B",
    },
    {
        id: "build-break",
        icon: (
            <Image src="/icons/build.svg" alt="Build" width={32} height={32} />
        ),
        title: "BUILD_&_BREAK",
        description:
            "Stress-testing structures through adversarial design and deconstruction.",
        color: "#F59E0B",
    },
    {
        id: "ai-data",
        icon: <Image src="/icons/ai.svg" alt="AI" width={32} height={32} />,
        title: "AI_&_DATA",
        description:
            "Deep neural modeling and predictive analytics processing vast datasets logic warfare.",
        color: "#F59E0B",
    },
];

export default async function ModulePage({
    params,
}: {
    params: { id: string };
}) {
    const { id: moduleId } = await params;
    const selectedModule = modules.find((m) => m.id === moduleId);

    if (!selectedModule) {
        return (
            <ModuleNotFound moduleId={moduleId} />
        );
    }

    return (
        <>
            <ModuleCompetitions {...selectedModule}/>
            <RegistrationBanner />
        </>
    );
}

