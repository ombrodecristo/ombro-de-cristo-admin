import { BaseViewModel } from "@/shared/view-models/BaseViewModel";
import { churchRepository } from "@/data/repositories/churchRepository";
import { logService } from "@/shared/services/logService";
import type { Church } from "@/types/database";
import type { SortConfig } from "../view/components/ChurchTable";

export class ChurchManagementViewModel extends BaseViewModel {
  public churches: Church[] = [];
  public loading = true;
  public error: string | null = null;
  public selectedChurch: Church | null = null;
  public isFormOpen = false;
  public isDeleteAlertOpen = false;
  public isDeleting = false;
  public searchQuery = "";
  public sortConfig: SortConfig = {
    key: "name",
    direction: "ascending",
  };

  constructor() {
    super();
    this.fetchChurches();
  }

  public setSearchQuery = (query: string) => {
    this.searchQuery = query;
    this.notify();
  };

  public get sortedChurches(): Church[] {
    const filteredChurches = this.churches.filter(church =>
      church.name.toLowerCase().includes(this.searchQuery.toLowerCase())
    );

    const sortableChurches = [...filteredChurches];
    if (this.sortConfig.key !== null) {
      sortableChurches.sort((a, b) => {
        const aValue = a[this.sortConfig.key as keyof Church];
        const bValue = b[this.sortConfig.key as keyof Church];
        if (aValue < bValue) {
          return this.sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (aValue > bValue) {
          return this.sortConfig.direction === "ascending" ? 1 : -1;
        }

        return 0;
      });
    }

    return sortableChurches;
  }

  public requestSort = (key: keyof Church) => {
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

  public handleOpenCreate = () => {
    this.selectedChurch = null;
    this.isFormOpen = true;
    this.notify();
  };

  public handleOpenEdit = (church: Church) => {
    this.selectedChurch = church;
    this.isFormOpen = true;
    this.notify();
  };

  public handleOpenDelete = (church: Church) => {
    this.selectedChurch = church;
    this.isDeleteAlertOpen = true;
    this.notify();
  };

  public handleCloseModals = () => {
    this.selectedChurch = null;
    this.isFormOpen = false;
    this.isDeleteAlertOpen = false;
    this.notify();
  };

  public handleFormSuccess = () => {
    this.fetchChurches();
  };

  public handleDeleteConfirm = async () => {
    if (!this.selectedChurch) return;
    this.isDeleting = true;
    this.notify();

    const { error: deleteError } = await churchRepository.deleteChurch(
      this.selectedChurch.id
    );

    this.isDeleting = false;
    if (deleteError) {
      this.error = "Erro ao excluir a igreja.";
      await logService.logError(deleteError, {
        component: "ChurchManagementViewModel",
        context: { churchId: this.selectedChurch.id },
      });
    } else {
      this.handleCloseModals();
      this.fetchChurches();
    }
    this.notify();
  };

  private fetchChurches = async () => {
    this.loading = true;
    this.notify();
    const { data, error } = await churchRepository.getChurches();
    if (error) {
      this.error = "Erro ao carregar igrejas.";
      await logService.logError(error, {
        component: "ChurchManagementViewModel",
      });
    } else if (data) {
      this.churches = data;
    }
    this.loading = false;
    this.notify();
  };
}
