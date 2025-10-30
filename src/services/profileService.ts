import { supabase } from "../lib/supabaseClient";
import { type Profile, type UserRole } from "../types/database";
import { type QueryData } from "@supabase/supabase-js";

const profilesWithRelationsQuery = supabase.from("profiles").select(
  `
    id,
    full_name,
    role,
    gender,
    churches ( name ),
    mentor:mentor_id ( full_name )
  `
);

export type ProfileWithRelations = QueryData<
  typeof profilesWithRelationsQuery
>[number];

async function getProfilesWithRelations() {
  return profilesWithRelationsQuery.overrideTypes<ProfileWithRelations[]>();
}

async function updateProfileRole(profileId: string, newRole: UserRole) {
  return supabase
    .from("profiles")
    .update({ role: newRole })
    .eq("id", profileId)
    .select()
    .single<Profile>();
}

async function getProfileById(id: string) {
  return supabase.from("profiles").select("*").eq("id", id).single<Profile>();
}

async function updateProfile(id: string, { full_name }: { full_name: string }) {
  return supabase
    .from("profiles")
    .update({ full_name })
    .eq("id", id)
    .select()
    .single<Profile>();
}

export const profileService = {
  getProfilesWithRelations,
  updateProfileRole,
  getProfileById,
  updateProfile,
};
