import { supabase } from "../lib/supabaseClient";
import { type Church } from "../types/database";

const churchesQuery = supabase
  .from("churches")
  .select("id, name, created_at, updated_at")
  .order("name");

async function getChurches() {
  return await churchesQuery.overrideTypes<Church[]>();
}

async function createChurch(name: string) {
  return supabase.from("churches").insert({ name }).select().single<Church>();
}

async function updateChurch(id: string, name: string) {
  return supabase
    .from("churches")
    .update({ name })
    .eq("id", id)
    .select()
    .single<Church>();
}

async function deleteChurch(id: string) {
  return supabase.from("churches").delete().eq("id", id);
}

export const churchService = {
  getChurches,
  createChurch,
  updateChurch,
  deleteChurch,
};
