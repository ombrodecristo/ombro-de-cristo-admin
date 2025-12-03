import { BaseViewModel } from "@/shared/view-models/BaseViewModel";
import {
  devotionalRepository,
  type DevotionalWithAuthor,
} from "@/data/repositories/devotionalRepository";
import { logService } from "@/shared/services/logService";
import type { SortConfig } from "../view/components/DevotionalTable";

export class DevotionalManagementViewModel extends BaseViewModel {
  public devotionals: DevotionalWithAuthor[] = [];
  public loading = true;
  public error: string | null = null;
  public selectedDevotional: DevotionalWithAuthor | null = null;
  public isFormOpen = false;
  public isDeleteAlertOpen = false;
  public isDeleting = false;
  public searchQuery = "";
  public sortConfig: SortConfig = {
    key: "updated_at",
    direction: "descending",
  };

  constructor() {
    super();
    this.fetchDevotionals();
  }

  public setSearchQuery = (query: string) => {
    this.searchQuery = query;
    this.notify();
  };

  public get sortedDevotionals(): DevotionalWithAuthor[] {
    const filteredDevotionals = this.devotionals.filter(devotional =>
      devotional.title.toLowerCase().includes(this.searchQuery.toLowerCase())
    );

    const sortableDevotionals = [...filteredDevotionals];
    if (this.sortConfig.key !== null) {
      sortableDevotionals.sort((a, b) => {
        let aValue: string;
        let bValue: string;

        if (this.sortConfig.key === "author") {
          aValue = a.author?.full_name ?? "";
          bValue = b.author?.full_name ?? "";
        } else {
          aValue = a[
            this.sortConfig.key as keyof DevotionalWithAuthor
          ] as string;
          bValue = b[
            this.sortConfig.key as keyof DevotionalWithAuthor
          ] as string;
        }

        if (aValue < bValue) {
          return this.sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (aValue > bValue) {
          return this.sortConfig.direction === "ascending" ? 1 : -1;
        }

        return 0;
      });
    }

    return sortableDevotionals;
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

  public handleOpenCreate = () => {
    this.selectedDevotional = null;
    this.isFormOpen = true;
    this.notify();
  };

  public handleOpenEdit = (devotional: DevotionalWithAuthor) => {
    this.selectedDevotional = devotional;
    this.isFormOpen = true;
    this.notify();
  };

  public handleOpenDelete = (devotional: DevotionalWithAuthor) => {
    this.selectedDevotional = devotional;
    this.isDeleteAlertOpen = true;
    this.notify();
  };

  public handleCloseModals = () => {
    this.selectedDevotional = null;
    this.isFormOpen = false;
    this.isDeleteAlertOpen = false;
    this.notify();
  };

  public handleFormSuccess = () => {
    this.fetchDevotionals();
  };

  public handleDeleteConfirm = async () => {
    if (!this.selectedDevotional) return;
    this.isDeleting = true;
    this.notify();

    const { error: deleteError } = await devotionalRepository.deleteDevotional(
      this.selectedDevotional.id
    );

    this.isDeleting = false;
    if (deleteError) {
      this.error = "Erro ao excluir o devocional.";
      await logService.logError(deleteError, {
        component: "DevotionalManagementViewModel",
        context: { devotionalId: this.selectedDevotional.id },
      });
    } else {
      this.handleCloseModals();
      this.fetchDevotionals();
    }
    this.notify();
  };

  private fetchDevotionals = async () => {
    this.loading = true;
    this.notify();
    const { data, error } = await devotionalRepository.getDevotionals();
    if (error) {
      this.error = "Erro ao carregar devocionais.";
      await logService.logError(error, {
        component: "DevotionalManagementViewModel",
      });
    } else if (data) {
      this.devotionals = data;
    }
    this.loading = false;
    this.notify();
  };
}
