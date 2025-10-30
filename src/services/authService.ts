import { supabase } from "../lib/supabaseClient";
import { type UserGender } from "../types/database";

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
    },
  });
}

export const authService = {
  signIn,
  signOut,
  updateUserPassword,
  signUp,
};
