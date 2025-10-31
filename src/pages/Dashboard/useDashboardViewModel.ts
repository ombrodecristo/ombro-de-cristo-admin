import { useEffect, useState, useMemo } from "react";
import { type Profile } from "../../types/database";
import {
  profileService,
  type ProfileWithRelations,
} from "../../services/profileService";
import { logService } from "../../services/logService";

export type { ProfileWithRelations };

export type SortConfig = {
  key: keyof ProfileWithRelations | null;
  direction: "ascending" | "descending";
};

type UseDashboardViewModelProps = {
  currentUserId: string;
};

export function useDashboardViewModel({
  currentUserId,
}: UseDashboardViewModelProps) {
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
      setError("Erro ao carregar usuários.");
      await logService.logError(fetchError, {
        component: "useDashboardViewModel",
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
      (profile) =>
        profile.full_name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        profile.id !== currentUserId
    );
    let sortableProfiles = [...filteredProfiles];

    if (sortConfig.key !== null) {
      sortableProfiles.sort((a, b) => {
        let aValue: any;
        let bValue: any;
        if (sortConfig.key === "churches") {
          aValue = a.churches?.name ?? "";
          bValue = b.churches?.name ?? "";
        } else if (sortConfig.key === "mentor") {
          aValue = a.mentor?.full_name ?? "";
          bValue = b.mentor?.full_name ?? "";
        } else {
          aValue = a[sortConfig.key as keyof ProfileWithRelations];
          bValue = b[sortConfig.key as keyof ProfileWithRelations];
        }

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
