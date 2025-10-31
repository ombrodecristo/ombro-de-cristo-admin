import { supabase } from "../lib/supabaseClient";
import { type Devotional } from "../types/database";
import { type QueryData } from "@supabase/supabase-js";

const devotionalsWithAuthorQuery = supabase
  .from("devotionals")
  .select(
    `
    id,
    title,
    content,
    published_at,
    created_at,
    updated_at,
    author:author_id ( full_name )
  `
  )
  .order("published_at", { ascending: false });

export type DevotionalWithAuthor = QueryData<
  typeof devotionalsWithAuthorQuery
>[number];

async function getDevotionals() {
  return await devotionalsWithAuthorQuery.overrideTypes<
    DevotionalWithAuthor[]
  >();
}

async function createDevotional(
  title: string,
  content: string,
  author_id: string
) {
  return supabase
    .from("devotionals")
    .insert({ title, content, author_id })
    .select()
    .single<Devotional>();
}

async function updateDevotional(id: string, title: string, content: string) {
  return supabase
    .from("devotionals")
    .update({ title, content })
    .eq("id", id)
    .select()
    .single<Devotional>();
}

async function deleteDevotional(id: string) {
  return supabase.from("devotionals").delete().eq("id", id);
}

export const devotionalService = {
  getDevotionals,
  createDevotional,
  updateDevotional,
  deleteDevotional,
};
