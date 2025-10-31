import { supabase } from "../lib/supabaseClient";
import {
  type Profile,
  type UserRole,
  type UserGender,
} from "../types/database";
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
  return await profilesWithRelationsQuery.overrideTypes<
    ProfileWithRelations[]
  >();
}

async function updateAdminProfileDetails(
  profileId: string,
  details: { role: UserRole; gender: UserGender }
) {
  return supabase
    .from("profiles")
    .update({ role: details.role, gender: details.gender })
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
  updateAdminProfileDetails,
  getProfileById,
  updateProfile,
};
