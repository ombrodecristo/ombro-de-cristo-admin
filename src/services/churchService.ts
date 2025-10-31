import { supabase } from "../lib/supabaseClient";
import { type Church } from "../types/database";

const churchesQuery = supabase
  .from("churches")
  .select("id, name")
  .order("name");

async function getChurches() {
  return await churchesQuery.overrideTypes<Church[]>();
}

export const churchService = {
  getChurches,
};
