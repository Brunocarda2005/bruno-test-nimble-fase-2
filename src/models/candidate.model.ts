// DB credentials returned by the challenge API
export interface DbCredentials {
  host: string;
  port: number;
  database: string;
  username: string;
  password: string;
}

// Candidate model — represents the authenticated user + challenge data
export interface Candidate {
  uuid: string;
  candidateId: string;
  applicationId: string;
  firstName: string;
  lastName: string;
  email: string;

  // Challenge Step 1 response fields
  dbCredentials?: DbCredentials;
  instructions?: string;
  challenge?: string;
  // Fallback: API may return flat DB fields instead of nested
  dbHost?: string;
  dbPort?: number;
  dbName?: string;
  dbDatabase?: string;
  dbUsername?: string;
  dbUser?: string;
  dbPassword?: string;
}

export interface CandidateInfoCardProps {
  candidate: Candidate;
  onLogout: () => void;
}
