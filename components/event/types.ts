export type Competition = {
    id: string;
    name: string;
    category: string;
    description: string;
    capacityLimit: number;
    earlyBirdLimit: number;
    fee: number;
    earlyBirdFee: number;
    minTeamSize: number;
    maxTeamSize: number;
    startTime?: string | null;
    endTime?: string | null;
};

export interface CompetitionProps {
    competitions: Competition[];
}