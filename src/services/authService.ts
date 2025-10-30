import { supabase } from "../lib/supabaseClient";

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

export const authService = {
  signIn,
  signOut,
  updateUserPassword,
};
