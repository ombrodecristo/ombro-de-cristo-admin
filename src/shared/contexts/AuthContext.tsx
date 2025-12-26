import {
  useEffect,
  useState,
  type ReactNode,
  useCallback,
  useMemo,
} from "react";
import i18n from "i18next";
import { supabase } from "@/core/lib/supabaseClient";
import type {
  User,
  UserRole,
  Profile,
  LanguagePreference,
} from "@/core/types/database";
import type { Session } from "@supabase/supabase-js";
import { profileRepository } from "@/data/repositories/profileRepository";
import { AuthContext } from "../hooks/useAuth";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [role, setRole] = useState<UserRole | null>(null);
  const [loading, setLoading] = useState(true);
  const [initialHash] = useState(() => window.location.hash);

  const refreshUserContext = useCallback(async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session?.user) {
      setUser(null);
      setProfile(null);
      setRole(null);

      return;
    }

    const currentUser = session.user as User;

    const { data: profileData } = await profileRepository.getProfileById(
      currentUser.id
    );

    setUser(currentUser);
    setProfile(profileData);
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
        setProfile(profileData);
        setRole(profileData?.role ?? null);

        const savedLang =
          profileData?.language_preference ||
          localStorage.getItem("i18nextLng");

        const targetLang = savedLang?.split("-")[0];

        if (targetLang && i18n.language !== targetLang) {
          await i18n.changeLanguage(targetLang);
        }
      } else {
        setUser(null);
        setProfile(null);
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
    setProfile(null);
    setRole(null);
  };

  const changeLanguage = useCallback(
    async (lang: string) => {
      await i18n.changeLanguage(lang);
      if (user) {
        profileRepository.updateProfile(user.id, {
          language_preference: lang as LanguagePreference,
        });
      }
    },
    [user]
  );

  const value = useMemo(
    () => ({
      user,
      profile,
      role,
      loading,
      signOut,
      initialHash,
      refreshUserContext,
      changeLanguage,
    }),
    [
      user,
      profile,
      role,
      loading,
      initialHash,
      refreshUserContext,
      changeLanguage,
    ]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
