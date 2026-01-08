import { type User as SupabaseUser } from "@supabase/supabase-js";
import { type Database } from "./supabase";

type DbTables = Database["public"]["Tables"];
type DbEnums = Database["public"]["Enums"];

export type UserRole = DbEnums["user_roles"];
export type UserGender = DbEnums["user_genders"];
export type LanguagePreference = "pt" | "en" | "es";
export type Church = DbTables["churches"]["Row"];
export type Devotional = DbTables["devotionals"]["Row"];
export type LibraryItem = DbTables["library_items"]["Row"];

export type Permissions = {
  can_manage_users?: boolean;
  can_manage_churches?: boolean;
  can_manage_devotionals?: boolean;
  can_manage_library?: boolean;
};

export type Profile = DbTables["profiles"]["Row"] & {
  permissions: Permissions;
};

export type AppMetadata = {
  role: UserRole;
  gender: UserGender;
  permissions: Permissions;
};

export type User = SupabaseUser & {
  app_metadata: AppMetadata;
};
