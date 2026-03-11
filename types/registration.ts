export interface TeamMemberInput {
  fullName: string;
  email: string;
  cnic: string;
  phone?: string;
  institution?: string;
}

export interface PublicRegistrationRequest {
  competitionId: string;
  teamName: string;
  referenceCode?: string;
  leaderFullName: string;
  leaderEmail: string;
  leaderCnic: string;
  leaderPhone?: string;
  leaderInstitution?: string;
  members: TeamMemberInput[];
  paymentScreenshot: File;
  isEarlyBird: boolean;
}

export interface PublicRegistrationResponse {
  id: string;
  teamName: string;
  referenceId: string;
  paymentStatus: string;
  paymentProofUrl: string;
  competition: {
    id: string;
    name: string;
    fee: string | number;
  };
  memberCount: number;
}

