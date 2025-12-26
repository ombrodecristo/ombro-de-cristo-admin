import { BaseViewModel } from "@/shared/view-models/BaseViewModel";
import {
  profileRepository,
  type ProfileWithRelations,
} from "@/data/repositories/profileRepository";
import { logService } from "@/shared/services/logService";
import type { Profile } from "@/core/types/database";
import i18n from "@/core/i18n";

export type SortConfig = {
  key: string | null;
  direction: "ascending" | "descending";
};

export class UserManagementViewModel extends BaseViewModel {
  public profiles: ProfileWithRelations[] = [];
  public loading = true;
  public error: string | null = null;
  public editingProfile: ProfileWithRelations | null = null;
  public viewingProfile: ProfileWithRelations | null = null;
  public searchQuery = "";
  public sortConfig: SortConfig = {
    key: "full_name",
    direction: "ascending",
  };
  private currentUserId: string;

  constructor({ currentUserId }: { currentUserId: string }) {
    super();
    this.currentUserId = currentUserId;
  }

  public init = () => {
    if (this.profiles.length > 0) return;
    this.fetchProfiles();
  };

  public setSearchQuery = (query: string) => {
    this.searchQuery = query;
    this.notify();
  };

  public get sortedProfiles(): ProfileWithRelations[] {
    const filteredProfiles = this.profiles.filter(
      profile =>
        profile.full_name
          .toLowerCase()
          .includes(this.searchQuery.toLowerCase()) &&
        profile.id !== this.currentUserId
    );

    const sortableProfiles = [...filteredProfiles];
    if (this.sortConfig.key !== null) {
      sortableProfiles.sort((a, b) => {
        const key = this.sortConfig.key as keyof ProfileWithRelations;
        let aValue: string | null;
        let bValue: string | null;

        if (key === "churches") {
          aValue = a.churches?.name ?? "";
          bValue = b.churches?.name ?? "";
        } else if (key === "mentor") {
          aValue = a.mentor?.full_name ?? "";
          bValue = b.mentor?.full_name ?? "";
        } else {
          aValue = a[key] as string | null;
          bValue = b[key] as string | null;
        }

        if (aValue === null) return 1;
        if (bValue === null) return -1;
        if (aValue < bValue) {
          return this.sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (aValue > bValue) {
          return this.sortConfig.direction === "ascending" ? 1 : -1;
        }

        return 0;
      });
    }

    return sortableProfiles;
  }

  public requestSort = (key: string) => {
    let direction: "ascending" | "descending" = "ascending";
    if (
      this.sortConfig.key === key &&
      this.sortConfig.direction === "ascending"
    ) {
      direction = "descending";
    }
    this.sortConfig = { key, direction };
    this.notify();
  };

  public handleEdit = (profile: ProfileWithRelations) => {
    this.editingProfile = profile;
    this.notify();
  };

  public handleCloseModal = () => {
    this.editingProfile = null;
    this.notify();
  };

  public handleOpenDetailsModal = (profile: ProfileWithRelations) => {
    this.viewingProfile = profile;
    this.notify();
  };

  public handleCloseDetailsModal = () => {
    this.viewingProfile = null;
    this.notify();
  };

  public handleUpdateSuccess = (updatedProfileData: Profile) => {
    const index = this.profiles.findIndex(p => p.id === updatedProfileData.id);

    if (index !== -1) {
      const currentProfile = this.profiles[index];

      const updatedProfile = {
        ...currentProfile,
        ...updatedProfileData,
        churches: this.profiles[index].churches,
        mentor: this.profiles[index].mentor,
      };

      this.profiles[index] = updatedProfile;
      this.fetchProfiles();
      this.notify();
    } else {
      this.fetchProfiles();
    }
  };

  private fetchProfiles = async () => {
    this.loading = true;
    this.error = null;
    this.notify();

    const { data, error: fetchError } =
      await profileRepository.getProfilesWithRelations();

    if (fetchError) {
      this.error = i18n.t("error_loading_resource", {
        resource: i18n.t("resource_profile"),
      });
      await logService.logError(fetchError, {
        component: "UserManagementViewModel",
      });
    } else if (data) {
      this.profiles = data;
    }
    this.loading = false;
    this.notify();
  };
}
