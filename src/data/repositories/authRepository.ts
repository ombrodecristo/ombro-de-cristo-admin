import { supabase } from "@/core/lib/supabaseClient";
import type { ServiceResponse } from "@/core/types/service";
import type { Session, User } from "@supabase/supabase-js";

const SITE_URL = import.meta.env.VITE_SITE_URL;
if (!SITE_URL) {
  throw new Error("VITE_SITE_URL is not set in .env files");
}

function formatAuthError(error: Error): Error {
  const msg = (error.message || "").toLowerCase();
  let friendlyMsg = "Algo deu errado. Por favor, tente novamente.";

  if (msg.includes("user already registered")) {
    friendlyMsg = "Este e-mail já foi cadastrado. Tente fazer login.";
  } else if (msg.includes("invalid login credentials")) {
    friendlyMsg = "E-mail ou senha incorretos. Verifique e tente novamente.";
  } else if (msg.includes("email not confirmed")) {
    friendlyMsg = "E-mail ou senha incorretos. Verifique e tente novamente.";
  } else if (msg.includes("password should be at least")) {
    friendlyMsg = "Sua senha é muito curta. Tente uma mais longa.";
  } else if (
    msg.includes("rate limit") ||
    msg.includes("for security purposes")
  ) {
    friendlyMsg =
      "Muitas tentativas. Para sua segurança, tente novamente mais tarde.";
  } else if (
    msg.includes("user is already confirmed") ||
    msg.includes("already been confirmed")
  ) {
    friendlyMsg = "Este e-mail já foi confirmado. Você pode fazer o login.";
  }

  return new Error(friendlyMsg);
}

async function signIn(
  email: string,
  password: string
): Promise<ServiceResponse<{ session: Session; user: User | null }>> {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) return { data: null, error: formatAuthError(error) };

  return { data, error: null };
}

async function signOut(): Promise<{ error: Error | null }> {
  const { error } = await supabase.auth.signOut();

  return { error: error ? formatAuthError(error) : null };
}

async function updateUserPassword(
  password: string
): Promise<ServiceResponse<{ user: User }>> {
  const { data, error } = await supabase.auth.updateUser({ password });

  if (error) return { data: null, error: formatAuthError(error) };

  return { data, error: null };
}

async function deleteOwnUser(): Promise<ServiceResponse<null>> {
  const { error } = await supabase.rpc("delete_own_user");
  if (error) return { data: null, error: formatAuthError(error) };

  return { data: null, error: null };
}

async function getSession(): Promise<
  ServiceResponse<{ session: Session | null }>
> {
  const { data, error } = await supabase.auth.getSession();
  if (error) return { data: null, error: formatAuthError(error) };

  return { data, error: null };
}

async function sendPasswordRecovery(
  email: string
): Promise<ServiceResponse<null>> {
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${SITE_URL}/password-recovery`,
  });

  if (error) return { data: null, error: formatAuthError(error) };

  return { data: null, error: null };
}

export const authRepository = {
  signIn,
  signOut,
  updateUserPassword,
  deleteOwnUser,
  getSession,
  sendPasswordRecovery,
};
