import { motion } from "framer-motion";
import GridTrack from "./grid-track";
import { Competition } from "./types";

interface Props {
    competition: Competition;
    index: number;
    onClick: (c: Competition) => void;
}

export default function CompetitionRow({ competition, index, onClick }: Props) {
    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            className="flex items-center"
        >
            <GridTrack competition={competition} onClick={onClick} />
        </motion.div>
    );
}