import { useEffect, useState, useMemo } from "react";
import { type Church } from "../../types/database";
import { churchService } from "../../services/churchService";
import { logService } from "../../services/logService";

export type SortConfig = {
  key: keyof Church | null;
  direction: "ascending" | "descending";
};

export function useChurchManagementViewModel() {
  const [churches, setChurches] = useState<Church[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedChurch, setSelectedChurch] = useState<Church | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: "name",
    direction: "ascending",
  });
  const [searchQuery, setSearchQuery] = useState("");

  async function fetchChurches() {
    setLoading(true);
    setError(null);
    const { data, error: fetchError } = await churchService.getChurches();
    if (fetchError) {
      setError("Erro ao carregar igrejas.");
      await logService.logError(fetchError, {
        component: "useChurchManagementViewModel",
      });
    } else if (data) {
      setChurches(data);
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchChurches();
  }, []);

  const sortedChurches = useMemo(() => {
    const filteredChurches = churches.filter(church =>
      church.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const sortableChurches = [...filteredChurches];
    if (sortConfig.key !== null) {
      sortableChurches.sort((a, b) => {
        const aValue = a[sortConfig.key as keyof Church];
        const bValue = b[sortConfig.key as keyof Church];
        if (aValue < bValue) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }

        if (aValue > bValue) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }

        return 0;
      });
    }
    return sortableChurches;
  }, [churches, sortConfig, searchQuery]);

  const requestSort = (key: keyof Church) => {
    let direction: "ascending" | "descending" = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const handleOpenCreate = () => {
    setSelectedChurch(null);
    setIsFormOpen(true);
  };

  const handleOpenEdit = (church: Church) => {
    setSelectedChurch(church);
    setIsFormOpen(true);
  };

  const handleOpenDelete = (church: Church) => {
    setSelectedChurch(church);
    setIsDeleteAlertOpen(true);
  };

  const handleCloseModals = () => {
    setSelectedChurch(null);
    setIsFormOpen(false);
    setIsDeleteAlertOpen(false);
  };

  const handleFormSuccess = () => {
    fetchChurches();
  };

  const handleDeleteConfirm = async () => {
    if (!selectedChurch) return;
    setIsDeleting(true);
    setError(null);
    const { error: deleteError } = await churchService.deleteChurch(
      selectedChurch.id
    );
    setIsDeleting(false);

    if (deleteError) {
      setError("Erro ao excluir a igreja.");
      await logService.logError(deleteError, {
        component: "useChurchManagementViewModel",
        context: { churchId: selectedChurch.id },
      });
    } else {
      handleCloseModals();
      fetchChurches();
    }
  };

  return {
    loading,
    error,
    searchQuery,
    setSearchQuery,
    sortConfig,
    sortedChurches,
    requestSort,
    isFormOpen,
    isDeleteAlertOpen,
    isDeleting,
    selectedChurch,
    handleOpenCreate,
    handleOpenEdit,
    handleOpenDelete,
    handleCloseModals,
    handleFormSuccess,
    handleDeleteConfirm,
  };
}
