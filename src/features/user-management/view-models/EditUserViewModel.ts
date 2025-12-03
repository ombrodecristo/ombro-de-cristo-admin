import { type FormEvent } from "react";
import { BaseViewModel } from "@/shared/view-models/BaseViewModel";
import type { Profile, UserRole, UserGender, Church } from "@/types/database";
import {
  profileRepository,
  type ProfileWithRelations,
} from "@/data/repositories/profileRepository";
import { churchRepository } from "@/data/repositories/churchRepository";
import { logService } from "@/shared/services/logService";

export const allRoles: UserRole[] = ["MISSIONARY", "MENTOR", "ADMIN"];
export const allGenders: UserGender[] = ["MALE", "FEMALE"];

type EditUserViewModelProps = {
  profile: ProfileWithRelations;
  onClose: () => void;
  onSuccess: (updatedProfile: Profile) => void;
};

export class EditUserViewModel extends BaseViewModel {
  public newRole: UserRole;
  public newGender: UserGender;
  public newChurchId: string | null;
  public churches: Church[] = [];
  public loadingChurches = true;
  public loading = false;
  public error: string | null = null;
  private profile: ProfileWithRelations;
  private onClose: () => void;
  private onSuccess: (updatedProfile: Profile) => void;

  constructor(props: EditUserViewModelProps) {
    super();
    this.profile = props.profile;
    this.onClose = props.onClose;
    this.onSuccess = props.onSuccess;
    this.newRole = props.profile.role;
    this.newGender = props.profile.gender;
    this.newChurchId = props.profile.church_id;
    this.fetchChurches();
  }

  public setNewRole = (role: UserRole) => {
    this.newRole = role;
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

  private fetchChurches = async () => {
    this.loadingChurches = true;
    this.notify();
    const { data, error } = await churchRepository.getChurches();
    if (error) {
      this.error = "Falha ao carregar a lista de igrejas.";
      logService.logError(error, { component: "EditUserViewModel" });
    } else {
      this.churches = data;
    }
    this.loadingChurches = false;
    this.notify();
  };

  public handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (
      this.newRole === this.profile.role &&
      this.newGender === this.profile.gender &&
      this.newChurchId === this.profile.church_id
    ) {
      this.onClose();

      return;
    }

    this.loading = true;
    this.error = null;
    this.notify();

    const { data, error: updateError } =
      await profileRepository.updateAdminProfileDetails(this.profile.id, {
        role: this.newRole,
        gender: this.newGender,
        church_id: this.newChurchId,
      });

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
