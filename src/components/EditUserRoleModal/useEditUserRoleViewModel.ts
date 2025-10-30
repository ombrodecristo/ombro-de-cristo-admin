import { useState, useEffect, type FormEvent } from "react";
import { type Profile, type UserRole } from "../../types/database";
import {
  type ProfileWithRelations,
  profileService,
} from "../../services/profileService";
import { logService } from "../../services/logService";
import { toast } from "sonner";

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

  useEffect(() => {
    setNewRole(profile.role);
  }, [profile]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (newRole === profile.role) {
      onClose();
      setLoading(false);
      return;
    }

    const { data, error } = await profileService.updateProfileRole(
      profile.id,
      newRole
    );

    setLoading(false);
    if (error) {
      toast.error(error.message);
      await logService.logError(error, {
        component: "useEditUserRoleViewModel",
        context: { profileId: profile.id, newRole },
      });
    } else if (data) {
      toast.success("Permissão alterada com sucesso!");
      onSuccess(data);
      onClose();
    }
  };

  return {
    newRole,
    setNewRole,
    loading,
    handleSubmit,
    allRoles,
  };
}
