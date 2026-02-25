// Candidate model — represents the authenticated user
export interface Candidate {
  uuid: string;
  candidateId: string;
  applicationId: string;
  firstName: string;
  lastName: string;
  email: string;
}

export interface CandidateInfoCardProps {
  candidate: Candidate;
  onLogout: () => void;
}
