import { useEffect, useState, useMemo } from "react";
import { type Profile } from "../../types/database";
import {
  profileService,
  type ProfileWithRelations,
} from "../../services/profileService";
import { logService } from "../../services/logService";
import type { SortConfig } from "@/components/UserTable/index";

export type { ProfileWithRelations };

type UseUserManagementViewModelProps = {
  currentUserId: string;
};

export function useUserManagementViewModel({
  currentUserId,
}: UseUserManagementViewModelProps) {
  const [profiles, setProfiles] = useState<ProfileWithRelations[]>([]);
  const [loading, setLoading] = useState(true);

  const [editingProfile, setEditingProfile] =
    useState<ProfileWithRelations | null>(null);

  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: "full_name",
    direction: "ascending",
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState<string | null>(null);

  async function fetchProfiles() {
    setLoading(true);
    setError(null);

    const { data, error: fetchError } =
      await profileService.getProfilesWithRelations();

    if (fetchError) {
      setError("Erro ao carregar perfis.");
      await logService.logError(fetchError, {
        component: "useUserManagementViewModel",
      });
    } else if (data) {
      setProfiles(data);
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchProfiles();
  }, []);

  const sortedProfiles = useMemo(() => {
    const filteredProfiles = profiles.filter(
      profile =>
        profile.full_name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        profile.id !== currentUserId
    );

    const sortableProfiles = [...filteredProfiles];
    if (sortConfig.key !== null) {
      sortableProfiles.sort((a, b) => {
        let aValue: string | null;
        let bValue: string | null;

        if (sortConfig.key === "churches") {
          aValue = a.churches?.name ?? "";
          bValue = b.churches?.name ?? "";
        } else if (sortConfig.key === "mentor") {
          aValue = a.mentor?.full_name ?? "";
          bValue = b.mentor?.full_name ?? "";
        } else {
          aValue = a[sortConfig.key as keyof ProfileWithRelations] as
            | string
            | null;
          bValue = b[sortConfig.key as keyof ProfileWithRelations] as
            | string
            | null;
        }

        if (aValue === null) return 1;
        if (bValue === null) return -1;
        if (aValue < bValue) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }

        return 0;
      });
    }

    return sortableProfiles;
  }, [profiles, sortConfig, searchQuery, currentUserId]);

  const requestSort = (key: keyof ProfileWithRelations) => {
    let direction: "ascending" | "descending" = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const handleUpdateSuccess = (_: Profile) => {
    fetchProfiles();
  };

  const handleEdit = (profile: ProfileWithRelations) => {
    setEditingProfile(profile);
  };

  const handleCloseModal = () => {
    setEditingProfile(null);
  };

  return {
    profiles,
    loading,
    error,
    editingProfile,
    searchQuery,
    setSearchQuery,
    sortConfig,
    sortedProfiles,
    requestSort,
    handleUpdateSuccess,
    handleEdit,
    handleCloseModal,
  };
}
