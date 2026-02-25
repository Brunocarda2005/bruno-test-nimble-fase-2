import { apiClient } from "@/api";
import { API_ENDPOINTS, STORAGE_KEYS } from "@/constants";
import type { Candidate } from "@/models";

// Authentication service — handles candidate login and session persistence
export class AuthService {
  // Fetches candidate by email and persists the session
  static async login(email: string): Promise<Candidate> {
    const response = await apiClient.get<Candidate>(
      API_ENDPOINTS.CANDIDATE.GET_BY_EMAIL(email),
    );
    this.saveSession(response.data);
    return response.data;
  }

  // Persists candidate data to localStorage
  static saveSession(candidate: Candidate): void {
    localStorage.setItem(
      STORAGE_KEYS.CANDIDATE_DATA,
      JSON.stringify(candidate),
    );
  }

  // Retrieves the current session from localStorage
  static getSession(): Candidate | null {
    const data = localStorage.getItem(STORAGE_KEYS.CANDIDATE_DATA);
    return data ? JSON.parse(data) : null;
  }

  // Clears the candidate session from localStorage
  static clearSession(): void {
    localStorage.removeItem(STORAGE_KEYS.CANDIDATE_DATA);
  }
}
