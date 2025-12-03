import { useState, useEffect, type FormEvent } from "react";
import { type User } from "@/types/database";
import { authService } from "@/services/authService";
import { logService } from "@/services/logService";
import { profileService } from "@/services/profileService";
import { type Profile } from "@/types/database";
import { validateFullName } from "@/lib/validators";

type UseUserMenuViewModelProps = {
  user: User | null;
  signOut: () => Promise<void>;
};

export function useUserMenuViewModel({
  user,
  signOut,
}: UseUserMenuViewModelProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isDeleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isEditingName, setIsEditingName] = useState(false);
  const [fullName, setFullName] = useState("");
  const [isSavingName, setIsSavingName] = useState(false);
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);

  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    async function loadProfile() {
      if (user && isOpen) {
        const { data, error: profileError } =
          await profileService.getProfileById(user.id);

        if (profileError) {
          setError("Não foi possível carregar os dados da sua conta.");
          logService.logError(profileError, {
            component: "UserMenu.loadProfile",
          });
        } else {
          setProfile(data);
          setFullName(data.full_name);
        }
      }
    }

    loadProfile();
  }, [user, isOpen]);

  const handleDeleteAccount = async () => {
    setIsDeleting(true);
    setError(null);

    const { error: deleteError } = await authService.deleteOwnUser();
    if (deleteError) {
      setError("Não foi possível excluir sua conta. Tente novamente.");
      await logService.logError(deleteError, {
        component: "UserMenu.handleDeleteAccount",
      });
      setIsDeleting(false);
    } else {
      setSuccessMessage("Sua conta foi excluída com sucesso.");
      await signOut();
      setIsOpen(false);
    }
  };

  const handleSaveName = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    const nameValidation = validateFullName(fullName);
    if (!nameValidation.isValid) {
      setError(nameValidation.message);

      return;
    }

    if (!user || !profile) return;

    if (fullName.trim() === profile.full_name) {
      setIsEditingName(false);

      return;
    }

    setIsSavingName(true);

    const { data, error: updateError } = await profileService.updateProfile(
      user.id,
      {
        full_name: fullName.trim(),
      }
    );

    setIsSavingName(false);

    if (updateError) {
      setError("Não foi possível atualizar seu nome.");
      logService.logError(updateError, {
        component: "UserMenu.handleSaveName",
      });
    } else {
      setProfile(data);
      setFullName(data.full_name);
      setIsEditingName(false);
      setSuccessMessage("Seu nome foi atualizado!");
    }
  };

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (!open) {
      setIsEditingName(false);
      if (profile) {
        setFullName(profile.full_name);
      }
    }
    setError(null);
    setSuccessMessage(null);
  };

  return {
    isOpen,
    setIsOpen,
    isDeleting,
    isDeleteConfirmOpen,
    setDeleteConfirmOpen,
    profile,
    isEditingName,
    setIsEditingName,
    fullName,
    setFullName,
    isSavingName,
    isChangePasswordOpen,
    setIsChangePasswordOpen,
    error,
    successMessage,
    handleDeleteAccount,
    handleSaveName,
    handleOpenChange,
    setError,
    setSuccessMessage,
  };
}
