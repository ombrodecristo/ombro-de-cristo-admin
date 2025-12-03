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

  useEffect(() => {
    async function loadProfile() {
      if (user && isOpen) {
        const { data, error: profileError } =
          await profileService.getProfileById(user.id);

        if (profileError) {
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
    const { error: deleteError } = await authService.deleteOwnUser();
    setIsDeleting(false);
    setDeleteConfirmOpen(false);

    if (deleteError) {
      await logService.logError(deleteError, {
        component: "UserMenu.handleDeleteAccount",
      });

      return { error: "Não foi possível excluir sua conta. Tente novamente." };
    } else {
      await signOut();
      setIsOpen(false);

      return { error: null };
    }
  };

  const handleSaveName = async (e: FormEvent) => {
    e.preventDefault();
    const nameValidation = validateFullName(fullName);
    if (!nameValidation.isValid) {
      return { error: nameValidation.message, success: false };
    }
    if (!user || !profile || fullName.trim() === profile.full_name) {
      setIsEditingName(false);

      return { error: null, success: false };
    }
    setIsSavingName(true);

    const { data, error: updateError } = await profileService.updateProfile(
      user.id,
      { full_name: fullName.trim() }
    );

    setIsSavingName(false);
    if (updateError) {
      logService.logError(updateError, {
        component: "UserMenu.handleSaveName",
      });

      return { error: "Não foi possível atualizar seu nome.", success: false };
    } else {
      setProfile(data);
      setFullName(data.full_name);
      setIsEditingName(false);

      return { error: null, success: true };
    }
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
    handleDeleteAccount,
    handleSaveName,
  };
}
