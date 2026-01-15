import { supabase } from "@/core/lib/supabaseClient";
import type {
  Profile,
  UserRole,
  UserGender,
  LanguagePreference,
  Permissions,
} from "@/core/types/database";
import type { ServiceResponse } from "@/core/types/service";
import type { QueryData } from "@supabase/supabase-js";

const profilesWithRelationsQuery = supabase.from("profiles").select(
  `
    id,
    full_name,
    role,
    gender,
    language_preference,
    church_id,
    churches ( name ),
    mentor:mentor_id ( full_name ),
    permissions
  `
);

export type ProfileWithRelations = QueryData<
  typeof profilesWithRelationsQuery
>[number];

async function getProfilesWithRelations(): Promise<
  ServiceResponse<ProfileWithRelations[]>
> {
  const { data, error } = await profilesWithRelationsQuery;

  return { data, error };
}

async function updateAdminProfileDetails(
  profileId: string,
  details: {
    role: UserRole;
    gender: UserGender;
    church_id: string | null;
    mentor_id?: string | null;
    permissions?: Permissions;
  }
): Promise<ServiceResponse<Profile>> {
  const { data, error } = await supabase
    .from("profiles")
    .update(details)
    .eq("id", profileId)
    .select()
    .single();

  return { data: data as Profile | null, error };
}

async function getProfileById(id: string): Promise<ServiceResponse<Profile>> {
  const { data, error } = await supabase
    .from("profiles")
    .select("*, permissions")
    .eq("id", id)
    .single();

  return { data: data as Profile | null, error };
}

async function updateProfile(
  id: string,
  updates: {
    full_name?: string;
    language_preference?: LanguagePreference;
  }
): Promise<ServiceResponse<Profile>> {
  const { data, error } = await supabase
    .from("profiles")
    .update(updates)
    .eq("id", id)
    .select()
    .single();

  return { data: data as Profile | null, error };
}

async function resyncUserProfile(
  userId: string
): Promise<ServiceResponse<unknown>> {
  const { data, error } = await supabase.rpc("resync_user_auth_state", {
    p_user_id: userId,
  });

  return { data, error };
}

export const profileRepository = {
  getProfilesWithRelations,
  updateAdminProfileDetails,
  getProfileById,
  updateProfile,
  resyncUserProfile,
};
