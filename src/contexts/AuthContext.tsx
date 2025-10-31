import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { supabase } from "../lib/supabaseClient";
import { type User, type UserRole } from "../types/database";
import { authService } from "../services/authService";

type AuthContextType = {
  user: User | null;
  role: UserRole | null;
  loading: boolean;
  signOut: () => Promise<void>;
  initialHash: string;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<UserRole | null>(null);
  const [loading, setLoading] = useState(true);
  const [initialHash] = useState(() => window.location.hash);

  useEffect(() => {
    setLoading(true);

    const hasRecoveryToken = initialHash.includes("type=recovery");
    const hasError =
      initialHash.includes("error_code") ||
      initialHash.includes("error=access_denied");
    const isRecoveryFlow = hasRecoveryToken && !hasError;

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      const currentUser = session?.user as User | null;
      setUser(currentUser);
      setRole(currentUser?.app_metadata?.role ?? null);

      if (isRecoveryFlow) {
        if (
          event === "PASSWORD_RECOVERY" ||
          (event === "SIGNED_IN" && session)
        ) {
          setLoading(false);
        } else if (
          event === "SIGNED_OUT" ||
          (event === "INITIAL_SESSION" && !session)
        ) {
        }
      } else {
        if (
          event === "INITIAL_SESSION" ||
          event === "SIGNED_OUT" ||
          event === "SIGNED_IN"
        ) {
          setLoading(false);
        }
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [initialHash]);

  const signOut = async () => {
    await authService.signOut();
    setUser(null);
    setRole(null);
  };

  const value = {
    user,
    role,
    loading,
    signOut,
    initialHash,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}
