import { useState, useEffect, type FormEvent } from "react";
import {
  type Profile,
  type UserRole,
  type UserGender,
  type Church,
} from "../../types/database";
import {
  type ProfileWithRelations,
  profileService,
} from "../../services/profileService";
import { logService } from "../../services/logService";
import { churchService } from "@/services/churchService";

export const allRoles: UserRole[] = ["MISSIONARY", "MENTOR", "ADMIN"];
export const allGenders: UserGender[] = ["MALE", "FEMALE"];

type UseEditUserModalViewModelProps = {
  profile: ProfileWithRelations;
  onClose: () => void;
  onSuccess: (updatedProfile: Profile) => void;
};

export function useEditUserModalViewModel({
  profile,
  onClose,
  onSuccess,
}: UseEditUserModalViewModelProps) {
  const [newRole, setNewRole] = useState<UserRole>(profile.role);
  const [newGender, setNewGender] = useState<UserGender>(profile.gender);

  const [newChurchId, setNewChurchId] = useState<string | null>(
    profile.church_id
  );

  const [churches, setChurches] = useState<Church[]>([]);
  const [loadingChurches, setLoadingChurches] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    async function fetchChurches() {
      setLoadingChurches(true);
      const { data, error: churchError } = await churchService.getChurches();
      if (churchError) {
        setError("Falha ao carregar a lista de igrejas.");
        logService.logError(churchError, {
          component: "useEditUserModalViewModel",
          context: { action: "fetchChurches" },
        });
      } else {
        setChurches(data);
      }
      setLoadingChurches(false);
    }

    fetchChurches();
  }, []);

  useEffect(() => {
    setNewRole(profile.role);
    setNewGender(profile.gender);
    setNewChurchId(profile.church_id);
    setError(null);
    setSuccess(false);
  }, [profile]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    if (
      newRole === profile.role &&
      newGender === profile.gender &&
      newChurchId === profile.church_id
    ) {
      onClose();
      setLoading(false);

      return;
    }

    const { data, error: updateError } =
      await profileService.updateAdminProfileDetails(profile.id, {
        role: newRole,
        gender: newGender,
        church_id: newChurchId,
      });

    setLoading(false);
    if (updateError) {
      setError(updateError.message);
      await logService.logError(updateError, {
        component: "useEditUserModalViewModel",
        context: { profileId: profile.id, newRole, newGender, newChurchId },
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
    newGender,
    setNewGender,
    newChurchId,
    setNewChurchId,
    churches,
    loadingChurches,
    loading,
    error,
    success,
    handleSubmit,
    allRoles,
    allGenders,
  };
}
