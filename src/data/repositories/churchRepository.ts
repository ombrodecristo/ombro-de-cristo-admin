import { supabase } from "@/core/lib/supabaseClient";
import type { Church } from "@/core/types/database";
import type { ServiceResponse } from "@/core/types/service";

async function getChurches(): Promise<ServiceResponse<Church[]>> {
  const { data, error } = await supabase
    .from("churches")
    .select("id, name, created_at, updated_at")
    .order("name");

  return { data, error };
}

async function createChurch(name: string): Promise<ServiceResponse<Church>> {
  const { data, error } = await supabase
    .from("churches")
    .insert({ name })
    .select()
    .single();

  return { data, error };
}

async function updateChurch(
  id: string,
  name: string
): Promise<ServiceResponse<Church>> {
  const { data, error } = await supabase
    .from("churches")
    .update({ name })
    .eq("id", id)
    .select()
    .single();

  return { data, error };
}

async function deleteChurch(id: string): Promise<ServiceResponse<null>> {
  const { error } = await supabase.from("churches").delete().eq("id", id);

  return { data: null, error };
}

export const churchRepository = {
  getChurches,
  createChurch,
  updateChurch,
  deleteChurch,
};
