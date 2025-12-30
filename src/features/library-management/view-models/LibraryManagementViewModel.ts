import { BaseViewModel } from "@/shared/view-models/BaseViewModel";
import { libraryRepository } from "@/data/repositories/libraryRepository";
import { logService } from "@/shared/services/logService";
import type { LibraryItem } from "@/core/types/database";
import type { SortConfig } from "../view/components/LibraryTable";
import i18n from "@/core/i18n";

export class LibraryManagementViewModel extends BaseViewModel {
  public items: LibraryItem[] = [];
  public loading = true;
  public error: string | null = null;
  public selectedItem: LibraryItem | null = null;
  public isFormOpen = false;
  public isDeleteAlertOpen = false;
  public isDeleting = false;
  public searchQuery = "";
  public sortConfig: SortConfig = {
    key: "updated_at",
    direction: "descending",
  };

  public init = () => {
    if (this.items.length > 0) return;
    this.fetchItems();
  };

  public setSearchQuery = (query: string) => {
    this.searchQuery = query;
    this.notify();
  };

  public get sortedItems(): LibraryItem[] {
    const filteredItems = this.items.filter(item =>
      item.title.toLowerCase().includes(this.searchQuery.toLowerCase())
    );

    const sortableItems = [...filteredItems];
    if (this.sortConfig.key !== null) {
      sortableItems.sort((a, b) => {
        const aValue = a[this.sortConfig.key as keyof LibraryItem];
        const bValue = b[this.sortConfig.key as keyof LibraryItem];

        if (aValue === null && bValue !== null) return -1;
        if (aValue !== null && bValue === null) return 1;
        if (aValue === null && bValue === null) return 0;

        if (aValue! < bValue!) {
          return this.sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (aValue! > bValue!) {
          return this.sortConfig.direction === "ascending" ? 1 : -1;
        }

        return 0;
      });
    }

    return sortableItems;
  }

  public requestSort = (key: keyof LibraryItem) => {
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
    this.selectedItem = null;
    this.isFormOpen = true;
    this.notify();
  };

  public handleOpenEdit = (item: LibraryItem) => {
    this.selectedItem = item;
    this.isFormOpen = true;
    this.notify();
  };

  public handleOpenDelete = (item: LibraryItem) => {
    this.selectedItem = item;
    this.isDeleteAlertOpen = true;
    this.notify();
  };

  public handleCloseModals = () => {
    this.selectedItem = null;
    this.isFormOpen = false;
    this.isDeleteAlertOpen = false;
    this.notify();
  };

  public handleFormSuccess = () => {
    this.fetchItems();
  };

  public handleDeleteConfirm = async () => {
    if (!this.selectedItem) return;
    this.isDeleting = true;
    this.notify();

    const { id, file_path, thumbnail_url } = this.selectedItem;

    const { error: deleteDbError } =
      await libraryRepository.deleteLibraryItem(id);

    if (file_path) {
      try {
        await libraryRepository.deleteFile(file_path);
      } catch (e) {
        logService.logError(e as Error, {
          component: "LibraryManagementViewModel",
          context: { message: "Failed to delete main file", path: file_path },
        });
      }
    }

    if (
      thumbnail_url &&
      !thumbnail_url.includes("youtube.com") &&
      !thumbnail_url.includes("ytimg.com")
    ) {
      try {
        const url = new URL(thumbnail_url);
        const pathParts = url.pathname.split("/library/");
        if (pathParts.length > 1) {
          const thumbnailPath = pathParts[1];
          await libraryRepository.deleteFile(thumbnailPath);
        }
      } catch (e) {
        logService.logError(e as Error, {
          component: "LibraryManagementViewModel",
          context: {
            message: "Failed to parse and delete thumbnail file",
            url: thumbnail_url,
          },
        });
      }
    }

    this.isDeleting = false;
    if (deleteDbError) {
      this.error = i18n.t("library_delete_error");
      await logService.logError(deleteDbError, {
        component: "LibraryManagementViewModel",
        context: { itemId: id },
      });
    } else {
      this.handleCloseModals();
      this.fetchItems();
    }
    this.notify();
  };

  private fetchItems = async () => {
    this.loading = true;
    this.notify();
    const { data, error } = await libraryRepository.getLibraryItems();
    if (error) {
      this.error = i18n.t("error_loading_resource", {
        resource: i18n.t("resource_library"),
      });
      await logService.logError(error, {
        component: "LibraryManagementViewModel",
      });
    } else if (data) {
      this.items = data;
    }
    this.loading = false;
    this.notify();
  };
}
