import { supabase } from "@/core/lib/supabaseClient";
import type { ServiceResponse } from "@/core/types/service";
import type { Session } from "@supabase/supabase-js";

export async function getAuthenticatedSession(): Promise<
  ServiceResponse<Session>
> {
  const {
    data: { session },
    error: sessionError,
  } = await supabase.auth.getSession();

  if (sessionError) {
    return { data: null, error: sessionError };
  }

  if (!session) {
    return {
      data: null,
      error: new Error("Sua sessão expirou. Faça login novamente."),
    };
  }

  return { data: session, error: null };
}
