import { type User as SupabaseUser } from '@supabase/supabase-js'

export type UserRole = 'ADMIN' | 'MENTOR' | 'MISSIONARY'
export type UserGender = 'MALE' | 'FEMALE'

export type AppMetaData = {
  role: UserRole
  gender: UserGender
}

export type User = SupabaseUser & {
  app_meta_data: AppMetaData
}