import { useContext } from "react";
import { AuthContext } from "@/contexts/auth.context";
import type { AuthContextType } from "@/contexts/auth.context";

// Custom hook to access the auth context
// Validates that it's being used inside the AuthProvider
// and returns the complete context with candidate, login and logout
export const useAuthContext = (): AuthContextType => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }

  return context;
};
