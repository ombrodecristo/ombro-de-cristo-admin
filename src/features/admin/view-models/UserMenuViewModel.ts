import { BaseViewModel } from "@/shared/view-models/BaseViewModel";
import type { User, Profile } from "@/core/types/database";
import { authRepository } from "@/data/repositories/authRepository";
import { logService } from "@/shared/services/logService";
import { profileRepository } from "@/data/repositories/profileRepository";
import { validateFullName } from "@/core/lib/validators";
import i18n from "@/core/i18n";

type UserMenuViewModelProps = {
  user: User | null;
  signOut: () => Promise<void>;
  refreshUserContext: () => Promise<void>;
};

export class UserMenuViewModel extends BaseViewModel {
  public isOpen = false;
  public isDeleting = false;
  public isDeleteConfirmOpen = false;
  public profile: Profile | null = null;
  public isEditingName = false;
  public fullName = "";
  public nameError? = "";
  public isSavingName = false;
  public isChangePasswordOpen = false;

  private user: User | null;
  private signOut: () => Promise<void>;
  private refreshUserContext: () => Promise<void>;

  constructor({ user, signOut, refreshUserContext }: UserMenuViewModelProps) {
    super();
    this.user = user;
    this.signOut = signOut;
    this.refreshUserContext = refreshUserContext;
  }

  public setIsOpen = (isOpen: boolean) => {
    this.isOpen = isOpen;
    this.isEditingName = false;
    this.notify();
  };

  public loadProfile = async () => {
    if (!this.user || this.profile) return;

    const { data, error } = await profileRepository.getProfileById(
      this.user.id
    );

    if (error) {
      await logService.logError(error, {
        component: "UserMenuViewModel.loadProfile",
      });
    } else {
      this.profile = data;
      this.fullName = data?.full_name ?? "";
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
    if (this.profile) {
      this.fullName = this.profile.full_name;
    }
    this.nameError = "";
    this.notify();
  };
  public setFullName = (value: string) => {
    this.fullName = value;
    if (this.nameError) this.nameError = "";
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

      return { error: i18n.t("auth_error_delete_account") };
    } else {
      await this.signOut();
      this.setIsOpen(false);

      return { error: null };
    }
  };

  public handleSaveName = async () => {
    const nameValidation = validateFullName(this.fullName);
    if (!nameValidation.isValid) {
      this.nameError = nameValidation.message;
      this.notify();

      return { error: nameValidation.message };
    }
    if (
      !this.user ||
      !this.profile ||
      this.fullName.trim() === this.profile.full_name
    ) {
      this.isEditingName = false;
      this.notify();

      return { error: null };
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
      await logService.logError(error, {
        component: "UserMenuViewModel.handleSaveName",
      });

      return { error: i18n.t("auth_error_update_name") };
    } else {
      this.profile = data;
      this.fullName = data?.full_name ?? "";
      this.isEditingName = false;
      await this.refreshUserContext();
      this.notify();

      return { error: null };
    }
  };
}
