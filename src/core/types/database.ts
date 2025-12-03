import { type User as SupabaseUser } from "@supabase/supabase-js";
import { type Database } from "../../types/supabase";

type DbTables = Database["public"]["Tables"];
type DbEnums = Database["public"]["Enums"];

export type UserRole = DbEnums["user_roles"];
export type UserGender = DbEnums["user_genders"];
export type Church = DbTables["churches"]["Row"];
export type Profile = DbTables["profiles"]["Row"];
export type Devotional = DbTables["devotionals"]["Row"];

export type AppMetadata = {
  role: UserRole;
  gender: UserGender;
};

export type User = SupabaseUser & {
  app_metadata: AppMetadata;
};
