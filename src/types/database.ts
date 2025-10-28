import { type User as SupabaseUser } from '@supabase/supabase-js'

export type UserRole = 'ADMIN' | 'MENTOR' | 'MISSIONARY'
export type UserGender = 'MALE' | 'FEMALE'

export type AppMetadata = {
  role: UserRole
  gender: UserGender
}

export type User = SupabaseUser & {
  app_metadata: AppMetadata
}

export type Church = {
  id: string
  name: string
  created_at: string
  updated_at: string
}

export type Profile = {
  id: string
  role: UserRole
  full_name: string
  gender: UserGender
  church_id: string | null
  mentor_id: string | null
  created_at: string
  updated_at: string
  churches?: Church | null
  profiles?: Profile | null
}