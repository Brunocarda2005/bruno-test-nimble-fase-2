import React, { useState, useEffect } from "react";
import type { ReactNode } from "react";
import { AuthService } from "@/services";
import type { Candidate } from "@/models";
import { AuthContext } from "./auth.context";

const initialState = { candidate: null, loading: true };

interface AuthProviderProps {
  children: ReactNode;
}

// Provides authentication state to the entire application
// Restores session from localStorage on mount
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [candidate, setCandidate] = useState<Candidate | null>(initialState.candidate);
  const [loading, setLoading] = useState(initialState.loading);

  useEffect(() => {
    const savedCandidate = AuthService.getSession();
    if (savedCandidate) {
      setCandidate(savedCandidate);
    }
    setLoading(false);
  }, []);

  const login = async (email: string) => {
    try {
      const candidateData = await AuthService.login(email);
      setCandidate(candidateData);
    } catch (error) {
      setCandidate(null);
      throw error;
    }
  };

  const logout = () => {
    AuthService.clearSession();
    setCandidate(null);
  };

  return (
    <AuthContext.Provider value={{ candidate, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
