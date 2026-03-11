import { supabase } from "@/core/lib/supabaseClient";
import type { Devotional, DevotionalTranslation } from "@/core/types/database";
import type { ServiceResponse } from "@/core/types/service";
import type { TablesInsert } from "@/core/types/supabase";
import type { QueryData } from "@supabase/supabase-js";

const devotionalsWithTranslationsQuery = supabase.from("devotionals").select(
  `
    id,
    published_at,
    created_at,
    updated_at,
    original_language,
    author:author_id ( full_name ),
    translations:devotional_translations (
      id,
      language_code,
      title,
      content,
      is_original,
      status
    )
  `
);

export type DevotionalWithTranslations = QueryData<
  typeof devotionalsWithTranslationsQuery
>[number];

type DevotionalTranslationInsert = TablesInsert<"devotional_translations">;

async function getDevotionals(): Promise<
  ServiceResponse<DevotionalWithTranslations[]>
> {
  const { data, error } = await devotionalsWithTranslationsQuery.order(
    "published_at",
    { ascending: false }
  );

  return { data, error };
}

async function createDevotional(
  original: Omit<
    DevotionalTranslationInsert,
    "id" | "devotional_id" | "status" | "created_at" | "updated_at"
  >,
  authorId: string
): Promise<ServiceResponse<Devotional>> {
  const { data: devotional, error: devotionalError } = await supabase
    .from("devotionals")
    .insert({
      author_id: authorId,
      original_language: original.language_code,
    })
    .select()
    .single();

  if (devotionalError) return { data: null, error: devotionalError };

  const translationPayload: DevotionalTranslationInsert = {
    ...original,
    devotional_id: devotional.id,
    status: "completed",
  };

  const { error: translationError } = await supabase
    .from("devotional_translations")
    .insert(translationPayload);

  if (translationError) {
    await supabase.from("devotionals").delete().eq("id", devotional.id);

    return { data: null, error: translationError };
  }

  return { data: devotional, error: null };
}

async function createDevotionalTranslation(
  translation: Omit<DevotionalTranslation, "id" | "created_at" | "updated_at">
): Promise<ServiceResponse<DevotionalTranslation>> {
  const { data, error } = await supabase
    .from("devotional_translations")
    .insert(translation)
    .select()
    .single();

  return { data, error };
}

async function updateDevotionalTranslation(
  translationId: string,
  updates: { title: string; content: string }
): Promise<ServiceResponse<DevotionalTranslation>> {
  const { data, error } = await supabase
    .from("devotional_translations")
    .update({ ...updates, status: "completed" })
    .eq("id", translationId)
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
  createDevotionalTranslation,
  updateDevotionalTranslation,
  deleteDevotional,
};
