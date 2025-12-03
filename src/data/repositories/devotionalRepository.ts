import { supabase } from "@/core/lib/supabaseClient";
import type { Devotional } from "@/core/types/database";
import type { ServiceResponse } from "@/core/types/service";
import type { QueryData } from "@supabase/supabase-js";

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

async function getDevotionals(): Promise<
  ServiceResponse<DevotionalWithAuthor[]>
> {
  const { data, error } = await devotionalsWithAuthorQuery;

  return { data, error };
}

async function createDevotional(
  title: string,
  content: string,
  author_id: string
): Promise<ServiceResponse<Devotional>> {
  const { data, error } = await supabase
    .from("devotionals")
    .insert({ title, content, author_id })
    .select()
    .single();

  return { data, error };
}

async function updateDevotional(
  id: string,
  title: string,
  content: string
): Promise<ServiceResponse<Devotional>> {
  const { data, error } = await supabase
    .from("devotionals")
    .update({ title, content })
    .eq("id", id)
    .select()
    .single();

  return { data, error };
}

async function deleteDevotional(id: string): Promise<ServiceResponse<null>> {
  const { error } = await supabase.from("devotionals").delete().eq("id", id);

  return { data: null, error };
}

export const devotionalRepository = {
  getDevotionals,
  createDevotional,
  updateDevotional,
  deleteDevotional,
};
