import { createContext, useContext } from "react";
import type { User, UserRole, Profile } from "@/core/types/database";

export type AuthContextType = {
  user: User | null;
  profile: Profile | null;
  role: UserRole | null;
  loading: boolean;
  signOut: () => Promise<void>;
  initialHash: string;
  refreshUserContext: () => Promise<void>;
  changeLanguage: (lang: string) => void;
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
