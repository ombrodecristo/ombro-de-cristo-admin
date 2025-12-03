import { type FormEvent } from "react";
import type { User } from "@/types/database";
import { authRepository } from "@/data/repositories/authRepository";
import { logService } from "@/shared/services/logService";
import { profileRepository } from "@/data/repositories/profileRepository";
import type { Profile } from "@/types/database";
import { validateFullName } from "@/lib/validators";
import { BaseViewModel } from "@/shared/view-models/BaseViewModel";

type UserMenuViewModelProps = {
  user: User | null;
  signOut: () => Promise<void>;
};

export class UserMenuViewModel extends BaseViewModel {
  public isOpen = false;
  public isDeleting = false;
  public isDeleteConfirmOpen = false;
  public profile: Profile | null = null;
  public isEditingName = false;
  public fullName = "";
  public isSavingName = false;
  public isChangePasswordOpen = false;

  private user: User | null;
  private signOut: () => Promise<void>;

  constructor({ user, signOut }: UserMenuViewModelProps) {
    super();
    this.user = user;
    this.signOut = signOut;
  }

  public setIsOpen = async (isOpen: boolean) => {
    this.isOpen = isOpen;
    if (isOpen && this.user && !this.profile) {
      await this.loadProfile();
    }
    this.notify();
  };

  private loadProfile = async () => {
    if (!this.user) return;

    const { data, error } = await profileRepository.getProfileById(
      this.user.id
    );

    if (error) {
      logService.logError(error, {
        component: "UserMenuViewModel.loadProfile",
      });
    } else {
      this.profile = data;
      this.fullName = data.full_name;
      this.notify();
    }
  };

  public setIsDeleting = (value: boolean) => {
    this.isDeleting = value;
    this.notify();
  };
  public setDeleteConfirmOpen = (value: boolean) => {
    this.isDeleteConfirmOpen = value;
    this.notify();
  };
  public setIsEditingName = (value: boolean) => {
    this.isEditingName = value;
    this.notify();
  };
  public setFullName = (value: string) => {
    this.fullName = value;
    this.notify();
  };
  public setIsChangePasswordOpen = (value: boolean) => {
    this.isChangePasswordOpen = value;
    this.notify();
  };

  public handleDeleteAccount = async () => {
    this.isDeleting = true;
    this.notify();
    const { error: deleteError } = await authRepository.deleteOwnUser();
    this.isDeleting = false;
    this.isDeleteConfirmOpen = false;
    this.notify();

    if (deleteError) {
      await logService.logError(deleteError, {
        component: "UserMenuViewModel.handleDeleteAccount",
      });

      return { error: "Não foi possível excluir sua conta. Tente novamente." };
    } else {
      await this.signOut();
      this.setIsOpen(false);

      return { error: null };
    }
  };

  public handleSaveName = async (e: FormEvent) => {
    e.preventDefault();
    const nameValidation = validateFullName(this.fullName);
    if (!nameValidation.isValid) {
      return { error: nameValidation.message, success: false };
    }
    if (
      !this.user ||
      !this.profile ||
      this.fullName.trim() === this.profile.full_name
    ) {
      this.isEditingName = false;
      this.notify();

      return { error: null, success: false };
    }
    this.isSavingName = true;
    this.notify();

    const { data, error } = await profileRepository.updateProfile(
      this.user.id,
      {
        full_name: this.fullName.trim(),
      }
    );

    this.isSavingName = false;
    if (error) {
      logService.logError(error, {
        component: "UserMenuViewModel.handleSaveName",
      });

      return { error: "Não foi possível atualizar seu nome.", success: false };
    } else {
      this.profile = data;
      this.fullName = data.full_name;
      this.isEditingName = false;
      this.notify();

      return { error: null, success: true };
    }
  };
}
