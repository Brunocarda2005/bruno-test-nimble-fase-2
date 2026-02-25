import { createContext } from "react";
import type { Candidate } from "@/models";

// Type that defines the auth context structure
// Contains the current candidate (authenticated user) and login/logout functions
export interface AuthContextType {
  candidate: Candidate | null;
  loading: boolean;
  login: (email: string) => Promise<void>;
  logout: () => void;
}

// Creates the context that will be shared across the entire application
// Initially undefined until provided by AuthProvider
export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);
