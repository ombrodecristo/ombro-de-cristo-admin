import { supabase } from "../lib/supabaseClient";
import { type UserGender } from "../types/database";

const SITE_URL = import.meta.env.VITE_SITE_URL;
if (!SITE_URL) {
  throw new Error("VITE_SITE_URL is not set in .env files");
}

async function signIn(email: string, password: string) {
  return supabase.auth.signInWithPassword({
    email,
    password,
  });
}

async function signOut() {
  return supabase.auth.signOut();
}

async function updateUserPassword(password: string) {
  return supabase.auth.updateUser({ password });
}

async function signUp(
  fullName: string,
  gender: UserGender,
  email: string,
  password: string
) {
  return supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
        gender: gender,
      },
      emailRedirectTo: `${SITE_URL}/auth-confirmed`,
    },
  });
}

async function deleteOwnUser() {
  return supabase.rpc("delete_own_user");
}

async function getSession() {
  return supabase.auth.getSession();
}

export const authService = {
  signIn,
  signOut,
  updateUserPassword,
  signUp,
  deleteOwnUser,
  getSession,
};
