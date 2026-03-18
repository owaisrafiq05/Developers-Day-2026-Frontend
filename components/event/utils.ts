import { GRID_START_MINUTES, SLOT_DURATION, TOTAL_SLOTS } from "./constants";

export function isoToMinutes(iso: string): number {
    const date = new Date(iso);
    return date.getUTCHours() * 60 + date.getUTCMinutes();
}

export function getGridCols(startTime: string, endTime: string) {
    const startMin = isoToMinutes(startTime);
    const endMin = isoToMinutes(endTime);

    const colStart = Math.max(
        1,
        Math.round((startMin - GRID_START_MINUTES) / SLOT_DURATION) + 1
    );

    const colEnd = Math.min(
        TOTAL_SLOTS + 1,
        Math.round((endMin - GRID_START_MINUTES) / SLOT_DURATION) + 1
    );

    return { colStart, colEnd };
}