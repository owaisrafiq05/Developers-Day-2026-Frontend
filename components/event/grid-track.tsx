import { motion } from "framer-motion";
import { TOTAL_SLOTS, CATEGORY_COLORS, DEFAULT_COLOR, CATEGORY_HREF } from "./constants";
import { getGridCols } from "./utils";
import { Competition } from "./types";

interface Props {
    competition: Competition;
    onClick: (c: Competition) => void;
}

export default function GridTrack({ competition: c, onClick }: Props) {
    const { colStart, colEnd } = getGridCols(c.startTime!, c.endTime!);
    const colors = CATEGORY_COLORS[c.category] ?? DEFAULT_COLOR;
    const href = CATEGORY_HREF[c.category];

    return (
        <div
            className="relative flex-1 h-9"
            style={{ display: "grid", gridTemplateColumns: `repeat(${TOTAL_SLOTS}, 1fr)` }}
        >
            {Array.from({ length: TOTAL_SLOTS }).map((_, i) => (
                <div key={i} className={`h-full border-l border-gray-700/30 ${i == TOTAL_SLOTS - 1 ? 'border-r' : ''}`} />
            ))}

            <motion.div
                whileHover={{ scale: 1.02, zIndex: 10 }}
                onClick={() => onClick(c)}
                title={`${c.name} — click to view`}
                className={`
                    absolute inset-y-1 rounded border
                    ${colors.bg} ${colors.border} ${colors.text}
                    flex items-center justify-center
                    text-[10px] font-semibold px-2
                    transition-all duration-200 hover:brightness-125
                    ${href ? "cursor-pointer" : "cursor-default"}
                `}
                style={{
                    left: `${((colStart - 1) / TOTAL_SLOTS) * 100}%`,
                    width: `${((colEnd - colStart) / TOTAL_SLOTS) * 100}%`,
                }}
            >
                <span className="truncate">{c.name}</span>
            </motion.div>
        </div>
    );
}