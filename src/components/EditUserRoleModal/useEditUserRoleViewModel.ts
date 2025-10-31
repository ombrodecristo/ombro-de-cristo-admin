import { useState, useEffect, type FormEvent } from "react";
import { type Profile, type UserRole } from "../../types/database";
import {
  type ProfileWithRelations,
  profileService,
} from "../../services/profileService";
import { logService } from "../../services/logService";

export const allRoles: UserRole[] = ["MISSIONARY", "MENTOR", "ADMIN"];

type UseEditUserRoleViewModelProps = {
  profile: ProfileWithRelations;
  onClose: () => void;
  onSuccess: (updatedProfile: Profile) => void;
};

export function useEditUserRoleViewModel({
  profile,
  onClose,
  onSuccess,
}: UseEditUserRoleViewModelProps) {
  const [newRole, setNewRole] = useState<UserRole>(profile.role);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    setNewRole(profile.role);
    setError(null);
    setSuccess(false);
  }, [profile]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    if (newRole === profile.role) {
      onClose();
      setLoading(false);
      return;
    }

    const { data, error: updateError } = await profileService.updateProfileRole(
      profile.id,
      newRole
    );

    setLoading(false);

    if (updateError) {
      setError(updateError.message);
      await logService.logError(updateError, {
        component: "useEditUserRoleViewModel",
        context: { profileId: profile.id, newRole },
      });
    } else if (data) {
      setSuccess(true);
      onSuccess(data);
      onClose();
    }
  };

  return {
    newRole,
    setNewRole,
    loading,
    error,
    success,
    handleSubmit,
    allRoles,
  };
}
