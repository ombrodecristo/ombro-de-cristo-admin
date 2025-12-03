import { useEffect, useState, type ReactNode, useCallback } from "react";
import { supabase } from "@/core/lib/supabaseClient";
import type { User, UserRole } from "@/core/types/database";
import type { Session } from "@supabase/supabase-js";
import { profileRepository } from "@/data/repositories/profileRepository";
import { AuthContext } from "../hooks/useAuth";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<UserRole | null>(null);
  const [loading, setLoading] = useState(true);
  const [initialHash] = useState(() => window.location.hash);

  const refreshUserContext = useCallback(async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session?.user) {
      setUser(null);
      setRole(null);

      return;
    }

    const currentUser = session.user as User;

    const { data: profileData } = await profileRepository.getProfileById(
      currentUser.id
    );

    setUser(currentUser);
    setRole(profileData?.role ?? null);
  }, []);

  useEffect(() => {
    const updateUserState = async (session: Session | null) => {
      if (session?.user) {
        const currentUser = session.user as User;

        const { data: profileData } = await profileRepository.getProfileById(
          currentUser.id
        );

        setUser(currentUser);
        setRole(profileData?.role ?? null);
      } else {
        setUser(null);
        setRole(null);
      }
    };

    const initializeSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      await updateUserState(session);
      setLoading(false);
    };

    initializeSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      updateUserState(session);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setRole(null);
  };

  const value = {
    user,
    role,
    loading,
    signOut,
    initialHash,
    refreshUserContext,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
