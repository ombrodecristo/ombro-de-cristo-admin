import { useState, useEffect, type FormEvent } from 'react'
import { supabase } from '../../lib/supabaseClient'
import { type Profile, type UserRole } from '../../types/database'

export const allRoles: UserRole[] = ['MISSIONARY', 'MENTOR', 'ADMIN']

type UseEditUserRoleViewModelProps = {
  profile: Profile
  onClose: () => void
  onSuccess: (updatedProfile: Profile) => void
}

export function useEditUserRoleViewModel({
  profile,
  onClose,
  onSuccess,
}: UseEditUserRoleViewModelProps) {
  const [newRole, setNewRole] = useState<UserRole>(profile.role)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setNewRole(profile.role)
  }, [profile])

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    if (newRole === profile.role) {
      onClose()
      return
    }

    const { data, error } = await supabase
      .from('profiles')
      .update({ role: newRole })
      .eq('id', profile.id)
      .select()
      .single()

    setLoading(false)
    if (error) {
      setError(error.message)
    } else if (data) {
      onSuccess(data)
      onClose()
    }
  }

  return {
    newRole,
    setNewRole,
    loading,
    error,
    handleSubmit,
    allRoles,
  }
}