import { useState, useEffect, type FormEvent } from "react";
import { type User } from "@/types/database";
import { authService } from "@/services/authService";
import { logService } from "@/services/logService";
import { profileService } from "@/services/profileService";
import { type Profile } from "@/types/database";

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
          setError("Erro ao buscar dados da conta.");
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
      setError("Erro ao excluir sua conta. Tente novamente.");
      await logService.logError(deleteError, {
        component: "UserMenu.handleDeleteAccount",
      });
      setIsDeleting(false);
    } else {
      setSuccessMessage("Conta excluída com sucesso.");
      await signOut();
      setIsOpen(false);
    }
  };

  const handleSaveName = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!user || !profile || fullName.trim().length < 3) {
      setError("O nome completo deve ter pelo menos 3 caracteres.");
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
      setError("Erro ao atualizar o nome.");
      logService.logError(updateError, {
        component: "UserMenu.handleSaveName",
      });
    } else {
      setProfile(data);
      setFullName(data.full_name);
      setIsEditingName(false);
      setSuccessMessage("Nome atualizado com sucesso!");
    }
  };

  const handleCloseModals = () => {
    setIsChangePasswordOpen(false);
    setIsOpen(false);
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

  const handleSignOut = async () => {
    await signOut();
    setIsOpen(false);
  };

  return {
    isOpen,
    isDeleting,
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
    handleCloseModals,
    handleOpenChange,
    handleSignOut,
    setError,
    setSuccessMessage,
  };
}
