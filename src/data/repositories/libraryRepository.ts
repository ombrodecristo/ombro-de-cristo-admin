import { supabase } from "@/core/lib/supabaseClient";
import type { LibraryItem } from "@/core/types/database";
import type { TablesInsert, TablesUpdate } from "@/core/types/supabase";
import type { ServiceResponse } from "@/core/types/service";

async function getLibraryItems(): Promise<ServiceResponse<LibraryItem[]>> {
  const { data, error } = await supabase
    .from("library_items")
    .select("*")
    .order("updated_at", { ascending: false });

  return { data, error };
}

async function createLibraryItem(
  item: TablesInsert<"library_items">
): Promise<ServiceResponse<LibraryItem>> {
  const { data, error } = await supabase
    .from("library_items")
    .insert(item)
    .select()
    .single();

  return { data, error };
}

async function updateLibraryItem(
  id: string,
  updates: TablesUpdate<"library_items">
): Promise<ServiceResponse<LibraryItem>> {
  const { data, error } = await supabase
    .from("library_items")
    .update(updates)
    .eq("id", id)
    .select()
    .single();

  return { data, error };
}

async function deleteLibraryItem(id: string): Promise<ServiceResponse<null>> {
  const { error } = await supabase.from("library_items").delete().eq("id", id);

  return { data: null, error };
}

async function uploadFile(
  filePath: string,
  file: File
): Promise<ServiceResponse<{ path: string }>> {
  const { data, error } = await supabase.storage
    .from("library")
    .upload(filePath, file, { upsert: true });

  if (error) {
    return { data: null, error };
  }

  return { data, error: null };
}

async function deleteFile(filePath: string): Promise<ServiceResponse<null>> {
  const { error } = await supabase.storage.from("library").remove([filePath]);

  return { data: null, error };
}

function getFilePublicUrl(filePath: string): string {
  const { data } = supabase.storage.from("library").getPublicUrl(filePath);

  return data.publicUrl;
}

export const libraryRepository = {
  getLibraryItems,
  createLibraryItem,
  updateLibraryItem,
  deleteLibraryItem,
  uploadFile,
  deleteFile,
  getFilePublicUrl,
};
