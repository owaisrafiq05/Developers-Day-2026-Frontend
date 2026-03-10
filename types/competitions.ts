export interface CompetitionWithCategory {
  id: string;
  name: string;
  category: string;
  description: string | null;
  fee: number;
  minTeamSize: number;
  maxTeamSize: number;
}

