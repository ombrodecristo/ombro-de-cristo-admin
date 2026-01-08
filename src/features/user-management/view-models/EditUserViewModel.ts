import { type FormEvent } from "react";
import { BaseViewModel } from "@/shared/view-models/BaseViewModel";
import type {
  Profile,
  UserRole,
  UserGender,
  Church,
  Permissions,
} from "@/core/types/database";
import {
  profileRepository,
  type ProfileWithRelations,
} from "@/data/repositories/profileRepository";
import { churchRepository } from "@/data/repositories/churchRepository";
import { logService } from "@/shared/services/logService";
import i18n from "@/core/i18n";

export const allRoles: UserRole[] = ["MISSIONARY", "MENTOR", "ADMIN"];
export const allGenders: UserGender[] = ["MALE", "FEMALE"];

type EditUserViewModelProps = {
  profile: ProfileWithRelations;
  onClose: () => void;
  onSuccess: (updatedProfile: Profile) => void;
  currentUserPermissions: Permissions;
};

export class EditUserViewModel extends BaseViewModel {
  public newRole: UserRole;
  public newGender: UserGender;
  public newChurchId: string | null;
  public permissions: Permissions;
  public churches: Church[] = [];
  public loadingChurches = true;
  public loading = false;
  public error: string | null = null;
  public canEditPermissions: boolean;

  private profile: ProfileWithRelations;
  private onClose: () => void;
  private onSuccess: (updatedProfile: Profile) => void;

  constructor(props: EditUserViewModelProps) {
    super();
    this.profile = props.profile;
    this.onClose = props.onClose;
    this.onSuccess = props.onSuccess;
    this.newRole = props.profile.role;
    this.newGender = props.profile.gender ?? "MALE";
    this.newChurchId = props.profile.church_id;
    this.permissions = {
      ...((props.profile.permissions as Permissions) || {}),
    };
    this.canEditPermissions =
      props.currentUserPermissions.can_manage_users || false;
    this.fetchChurches();
  }

  public setNewRole = (role: UserRole) => {
    this.newRole = role;
    if (role !== "ADMIN") {
      this.permissions = {};
    }
    this.notify();
  };

  public setNewGender = (gender: UserGender) => {
    this.newGender = gender;
    this.notify();
  };

  public setNewChurchId = (churchId: string | null) => {
    this.newChurchId = churchId;
    this.notify();
  };

  public setPermission = (key: keyof Permissions, value: boolean) => {
    this.permissions[key] = value;
    this.notify();
  };

  private fetchChurches = async () => {
    this.loadingChurches = true;
    this.notify();
    const { data, error } = await churchRepository.getChurches();
    if (error) {
      this.error = i18n.t("error_loading_resource", {
        resource: i18n.t("resource_churches"),
      });
      await logService.logError(error, { component: "EditUserViewModel" });
    } else if (data) {
      this.churches = data;
    }
    this.loadingChurches = false;
    this.notify();
  };

  public handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const hasChanged =
      this.newRole !== this.profile.role ||
      this.newGender !== this.profile.gender ||
      this.newChurchId !== this.profile.church_id ||
      JSON.stringify(this.permissions) !==
        JSON.stringify(this.profile.permissions);

    if (!hasChanged) {
      this.onClose();

      return;
    }

    this.loading = true;
    this.error = null;
    this.notify();

    const finalPermissions = this.newRole === "ADMIN" ? this.permissions : {};

    const detailsToUpdate = {
      role: this.newRole,
      gender: this.newGender,
      church_id: this.newChurchId,
      permissions: finalPermissions,
    };

    const { data, error: updateError } =
      await profileRepository.updateAdminProfileDetails(
        this.profile.id,
        detailsToUpdate
      );

    this.loading = false;
    if (updateError) {
      this.error = updateError.message;
      await logService.logError(updateError, {
        component: "EditUserViewModel",
        context: { profileId: this.profile.id },
      });
    } else if (data) {
      this.onSuccess(data);
      this.onClose();
    }
    this.notify();
  };
}
