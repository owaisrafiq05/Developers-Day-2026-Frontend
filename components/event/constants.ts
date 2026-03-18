export const GRID_START_MINUTES = 9 * 60;
export const SLOT_DURATION = 30;
export const TOTAL_SLOTS = 14;

export const TIME_LABELS = [
    '09:00', '09:30', '10:00', '10:30',
    '11:00', '11:30', '12:00', '12:30',
    '13:00', '13:30', '14:00', '14:30',
    '15:00', '15:30'
];

export const CATEGORY_COLORS: Record<string, { bg: string; border: string; text: string }> = {
    "Project Xtreme": { bg: "bg-[#0B1200]/60", border: "border-[#C6FF00]", text: "text-[#ECFFB3]" },
    "Software Engineering": { bg: "bg-[#060010]/60", border: "border-[#7C3AED]", text: "text-[#c4b5fd]" },
    "Core Coding": { bg: "bg-[#000613]/60", border: "border-[#2563EB]", text: "text-[#bfdbfe]" },
    "Tech Quest": { bg: "bg-[#0A0600]/60", border: "border-[#F59E0B]", text: "text-[#fde68a]" },
    "Development & Design": { bg: "bg-[#000902]/60", border: "border-[#3AED5B]", text: "text-[#bbf7d0]" },
    "AI & Data Science": { bg: "bg-[#00080E]/60", border: "border-[#00F0FF]", text: "text-[#a5f3fc]" },
    "General": { bg: "bg-[#070707]/60", border: "border-[#949494]", text: "text-[#d4d4d4]" },
    "Electrical Engineering": { bg: "bg-[#0A0400]/60", border: "border-[#D35400]", text: "text-[#fed7aa]" },
    "Business": { bg: "bg-[#0B000E]/60", border: "border-[#D000FF]", text: "text-[#f5d0fe]" },
};
export const CATEGORY_HREF: Record<string, string> = {
    "Software Engineering": "/modules/software-eng",
    "Core Coding": "/modules/coding",
    "Tech Quest": "/modules/tech-quest",
    "Development & Design": "/modules/dev-design",
    "AI & Data Science": "/modules/ai-data",
    "General": "/modules/general",
    "Electrical Engineering": "/modules/electrical-eng",
    "Business": "/modules/business",
    "Project Xtreme": "/modules/project-xtreme",
};

export const DEFAULT_COLOR = {
    bg: "bg-zinc-800/60",
    border: "border-zinc-500",
    text: "text-zinc-200"
};
