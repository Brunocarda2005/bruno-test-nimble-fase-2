// API endpoints
export const API_ENDPOINTS = {
  CANDIDATE: {
    GET_BY_EMAIL: (email: string) =>
      `/api/candidate/get-second-challenge?email=${encodeURIComponent(email)}`,
    SUBMIT_CHALLENGE: "/api/candidate/submit-second-challenge",
  },
} as const;

// localStorage keys
export const STORAGE_KEYS = {
  CANDIDATE_DATA: "candidateData",
} as const;
