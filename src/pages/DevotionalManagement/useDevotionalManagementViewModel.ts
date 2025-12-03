import { useEffect, useState, useMemo } from "react";
import {
  devotionalService,
  type DevotionalWithAuthor,
} from "../../services/devotionalService";
import { logService } from "../../services/logService";
import type { SortConfig } from "@/components/DevotionalTable/index";

export function useDevotionalManagementViewModel() {
  const [devotionals, setDevotionals] = useState<DevotionalWithAuthor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedDevotional, setSelectedDevotional] =
    useState<DevotionalWithAuthor | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: "updated_at",
    direction: "descending",
  });
  const [searchQuery, setSearchQuery] = useState("");

  async function fetchDevotionals() {
    setLoading(true);
    setError(null);
    const { data, error: fetchError } =
      await devotionalService.getDevotionals();

    if (fetchError) {
      setError("Erro ao carregar devocionais.");
      await logService.logError(fetchError, {
        component: "useDevotionalManagementViewModel",
      });
    } else if (data) {
      setDevotionals(data);
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchDevotionals();
  }, []);

  const sortedDevotionals = useMemo(() => {
    const filteredDevotionals = devotionals.filter(devotional =>
      devotional.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const sortableDevotionals = [...filteredDevotionals];
    if (sortConfig.key !== null) {
      sortableDevotionals.sort((a, b) => {
        let aValue: any;
        let bValue: any;

        if (sortConfig.key === "author") {
          aValue = a.author?.full_name ?? "";
          bValue = b.author?.full_name ?? "";
        } else {
          aValue = a[sortConfig.key as keyof DevotionalWithAuthor];
          bValue = b[sortConfig.key as keyof DevotionalWithAuthor];
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
    return sortableDevotionals;
  }, [devotionals, sortConfig, searchQuery]);

  const requestSort = (key: keyof DevotionalWithAuthor | "author") => {
    let direction: "ascending" | "descending" = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const handleOpenCreate = () => {
    setSelectedDevotional(null);
    setIsFormOpen(true);
  };

  const handleOpenEdit = (devotional: DevotionalWithAuthor) => {
    setSelectedDevotional(devotional);
    setIsFormOpen(true);
  };

  const handleOpenDelete = (devotional: DevotionalWithAuthor) => {
    setSelectedDevotional(devotional);
    setIsDeleteAlertOpen(true);
  };

  const handleCloseModals = () => {
    setSelectedDevotional(null);
    setIsFormOpen(false);
    setIsDeleteAlertOpen(false);
  };

  const handleFormSuccess = () => {
    fetchDevotionals();
  };

  const handleDeleteConfirm = async () => {
    if (!selectedDevotional) return;
    setIsDeleting(true);
    setError(null);
    const { error: deleteError } = await devotionalService.deleteDevotional(
      selectedDevotional.id
    );
    setIsDeleting(false);

    if (deleteError) {
      setError("Erro ao excluir o devocional.");
      await logService.logError(deleteError, {
        component: "useDevotionalManagementViewModel",
        context: { devotionalId: selectedDevotional.id },
      });
    } else {
      handleCloseModals();
      fetchDevotionals();
    }
  };

  return {
    loading,
    error,
    searchQuery,
    setSearchQuery,
    sortConfig,
    sortedDevotionals,
    requestSort,
    isFormOpen,
    isDeleteAlertOpen,
    isDeleting,
    selectedDevotional,
    handleOpenCreate,
    handleOpenEdit,
    handleOpenDelete,
    handleCloseModals,
    handleFormSuccess,
    handleDeleteConfirm,
  };
}
