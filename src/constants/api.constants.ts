// API endpoints
export const API_ENDPOINTS = {
  CANDIDATE: {
    GET_BY_EMAIL: (email: string) =>
      `/api/candidate/get-second-challenge?email=${encodeURIComponent(email)}`,
    APPLY_TO_JOB: "/api/candidate/apply-to-job",
  },
  POSITIONS: {
    GET_LIST: "/api/jobs/get-list",
  },
} as const;

// localStorage keys
export const STORAGE_KEYS = {
  CANDIDATE_DATA: "candidateData",
} as const;
