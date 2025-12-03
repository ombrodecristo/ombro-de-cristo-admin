import { createContext, useContext } from "react";
import { type User, type UserRole } from "../types/database";

type AuthContextType = {
  user: User | null;
  role: UserRole | null;
  loading: boolean;
  signOut: () => Promise<void>;
  initialHash: string;
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export function useAuth() {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}
