import { TIME_LABELS, TOTAL_SLOTS } from "./constants";

export default function TimeHeader() {
    return (
        <div
            className={`relative grid gap-1 mb-1 text-left grid-cols-7 md:grid-cols-14`}
        >
            {TIME_LABELS.map((time, index) => (
                <div
                    key={time}
                    className={`sm:-translate-x-[20%] -translate-x-[40%]  text-[9px] sm:text-xs text-gray-500 ${index % 2 !== 0 ? 'hidden md:block' : ''}`}
                >
                    {time}
                </div>
            ))}

            <div className="absolute right-0 translate-x-[50%] text-[9px] sm:text-xs text-gray-500">
                16:00
            </div>
        </div>
    );
}