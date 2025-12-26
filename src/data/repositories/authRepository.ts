import i18n from "@/core/i18n";
import { supabase } from "@/core/lib/supabaseClient";
import type { ServiceResponse } from "@/core/types/service";
import type { Session, User } from "@supabase/supabase-js";

const SITE_URL = import.meta.env.VITE_SITE_URL;
if (!SITE_URL) {
  throw new Error("VITE_SITE_URL is not set in .env files");
}

function formatAuthError(error: Error): Error {
  const msg = (error.message || "").toLowerCase();
  let friendlyMsg = i18n.t("error_generic");

  if (msg.includes("user already registered")) {
    friendlyMsg = i18n.t("auth_error_user_already_registered");
  } else if (msg.includes("invalid login credentials")) {
    friendlyMsg = i18n.t("auth_error_invalid_login_credentials");
  } else if (msg.includes("email not confirmed")) {
    friendlyMsg = i18n.t("auth_error_invalid_login_credentials");
  } else if (msg.includes("password should be at least")) {
    friendlyMsg = i18n.t("auth_error_password_too_short");
  } else if (
    msg.includes("rate limit") ||
    msg.includes("for security purposes")
  ) {
    friendlyMsg = i18n.t("auth_error_rate_limit");
  } else if (
    msg.includes("user is already confirmed") ||
    msg.includes("already been confirmed")
  ) {
    friendlyMsg = i18n.t("auth_error_user_already_confirmed");
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
