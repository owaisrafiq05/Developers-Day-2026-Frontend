"use client";

import HeroSection from "./hero-section";
import CharactersSection from "./characters-section";
import TransmissionBlock from "./transmission-block";
import ZonesSection from "./zones-section";
import SideQuestsSection from "./side-quests-section";
import ProtocolSection from "./protocol-section";
import IncomingTransmission from "./incoming-transmission";
import { ZoneType } from "./zone-card";
import { ProtocolStep } from "./protocol-section";

const ZONES: ZoneType[] = [
    {
        id: "zone-1",
        number: "01",
        name: "THE WIZARD'S ATELIER",
        category: "Development & Design",
        moduleId: "dev-design",
        color: "#3AED5B",
        stone: "Sigil of Creation",
        lore: "A magical realm where pixels become spells and interfaces are conjured from raw creativity. The Narrator built this zone inspired by fantasy universes — a place where design is alchemy.",
        missions: [
            { name: "Design Arena by WebApp Fusion", mission: "Mission 1: The Mirage-Maker's Trial", object: "Crystal Quill" },
            { name: "Hackathon", mission: "Mission 2: The Architect's Crucible", object: "The Inventor's Spellbook" },
            { name: "Stack Breach", mission: "Mission 3: Script-Fire at Hogwarts", object: "The Elder Wand" },
        ],
    },
    {
        id: "zone-2",
        number: "02",
        name: "THE UPSIDE DOWN",
        category: "Tech Quest",
        moduleId: "tech-quest",
        color: "#F59E0B",
        stone: "Mindflayer Anchor",
        lore: "An inverted dimension where logic warps and signals are scrambled. Clues are hidden in corrupted data streams. Only those who can decode the anomalies will find the exit.",
        missions: [
            { name: "Digital Scavenger Hunt", mission: "Mission 1: The Wormhole's Call", object: "Demogorgon Detector" },
            { name: "Recursion Hell: Find the Exit", mission: "Mission 2: The Loop-Breaker's Trial", object: "Vecna's Mind Dial" },
        ],
    },
    {
        id: "zone-3",
        number: "03",
        name: "OPERATION: WARZONE",
        category: "Software Engineering",
        moduleId: "software-eng",
        color: "#7C3AED",
        stone: "The Iron Bastion",
        lore: "Architectures collide in a military-grade digital battleground. Systems are under siege. Stack integrity is the only thing standing between order and chaos.",
        missions: [
            { name: "API Blitz", mission: "Mission 1: Operation Urzikstan", object: "Amethyst Blade" },
            { name: "Syscore", mission: "Mission 2: Operation Shadow", object: "Warzone Map" },
            { name: "SQL Showdown", mission: "Mission 3: Operation Paper Trail", object: "Encrypted Ledger" },
            { name: "Class Wars", mission: "Mission 4: Operation 141", object: "Logic Gear" },
        ],
    },
    {
        id: "zone-4",
        number: "04",
        name: "THE GAMING ARENA",
        category: "AI & Data Science",
        moduleId: "ai-data",
        color: "#00F0FF",
        stone: "AI-Arcade Kernel",
        lore: "A neon-drenched arcade where the machines have learned to fight back. Train the model. Crack the dataset. Outsmart the AI that the Mastermind deployed to guard this zone.",
        missions: [
            { name: "AI Got Talent", mission: "Mission 1: Refactor the Fighter", object: "Neural Combat Chip" },
            { name: "Guilty by Data", mission: "Mission 2: The Ashworth Affair", object: "Case File: Ashworth Affair" },
            { name: "Prompt Prognosis", mission: "Mission 3: Whisper to the AM Machine", object: "AM's Repair Node" },
            { name: "Today We Are Vibecoding", mission: "Mission 4: Reality-Bender Battle", object: "Battle Bot Token" },
        ],
    },
    {
        id: "zone-5",
        number: "05",
        name: "THE CONTROL ROOM",
        category: "Core Coding",
        moduleId: "coding",
        color: "#2563EB",
        stone: "Master Key",
        lore: "The Mastermind's fortress. The final zone. The source code itself is your battlefield. Break the encryption, purge the swarm, and override the system before he locks you out forever.",
        missions: [
            { name: "Debug Relay", mission: "Mission 1: The Swarm Purge", object: "Trace Lens" },
            { name: "Code Sprint", mission: "Mission 2: Deletion Defiance", object: "Execution Gear" },
            { name: "Competitive Programming", mission: "Mission 3: The Final Battle", object: "Simulation Override Chip" },
        ],
    },
];

const PROTOCOL: ProtocolStep[] = [
    { step: "01", title: "FOLLOW THE SEQUENCE", desc: "Clear every Zone in order — no shortcuts through the code." },
    { step: "02", title: "FINISH THE MISSIONS", desc: "Conquer every module to break the Mastermind's grip." },
    { step: "03", title: "CLAIM THE OBJECTS", desc: "Each victory drops a unique relic into your inventory." },
    { step: "04", title: "FORGE THE STONES", desc: "Collect all objects in a Zone to fuse them into a Category Stone." },
    { step: "05", title: "TRIGGER THE REBOOT", desc: "Secure all 5 Stones to override the system and escape the simulation." },
];

export default function VRSimulation() {
    return (
        <section className="bg-dark-red text-white py-16 md:py-16">
            <div className="container mx-auto px-4 md:px-6">
                <HeroSection zones={ZONES} />

                <div id="characters" className="container mx-auto max-w-6xl py-8 scroll-mt-24">
                    <CharactersSection />
                    <TransmissionBlock />
                </div>

                <div id="zones" className="scroll-mt-24">
                    <ZonesSection zones={ZONES} />
                </div>
                <div id="side-quests" className="scroll-mt-24">
                    <SideQuestsSection />
                </div>
                <div id="protocol" className="scroll-mt-24">
                    <ProtocolSection protocol={PROTOCOL} zones={ZONES} />
                </div>
                <IncomingTransmission />
            </div>
        </section>
    );
}
