export interface CompetitionWithCategory {
  id: string;
  name: string;
  category: string;
  description: string | null;
  fee: number;
  capacityLimit: number;
  earlyBirdFee:number;
  earlyBirdLimit: number;
  minTeamSize: number;
  maxTeamSize: number;
  startTime?: string | null;
  endTime?: string | null;
}

