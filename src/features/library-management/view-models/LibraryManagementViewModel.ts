import {
  BaseCrudViewModel,
  type SortConfig,
} from "@/shared/view-models/BaseCrudViewModel";
import { libraryRepository } from "@/data/repositories/libraryRepository";
import { logService } from "@/shared/services/logService";
import type { LibraryItem } from "@/core/types/database";
import i18n from "@/core/i18n";

export class LibraryManagementViewModel extends BaseCrudViewModel<LibraryItem> {
  protected resourceName = i18n.t("resource_library");

  constructor() {
    super();
    this.sortConfig = { key: "updated_at", direction: "descending" };
  }

  protected async fetchItemsFromServer() {
    return libraryRepository.getLibraryItems();
  }

  protected async deleteItemFromServer(id: string) {
    return libraryRepository.deleteLibraryItem(id);
  }

  public override handleDeleteConfirm = async (): Promise<void> => {
    if (!this.selectedItem) return;
    this.isDeleting = true;
    this.notify();

    const { id, file_path } = this.selectedItem;

    const { error: deleteDbError } =
      await libraryRepository.deleteLibraryItem(id);

    if (!deleteDbError && file_path) {
      try {
        await libraryRepository.deleteFile(file_path);
      } catch (e) {
        logService.logError(e as Error, {
          component: "LibraryManagementViewModel",
          context: {
            message: "Failed to delete associated file from storage",
            path: file_path,
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

  protected filterItems(items: LibraryItem[], query: string): LibraryItem[] {
    if (!query) return items;

    return items.filter(item =>
      item.title.toLowerCase().includes(query.toLowerCase())
    );
  }

  protected sortItems(items: LibraryItem[], config: SortConfig): LibraryItem[] {
    const sortedItems = [...items];

    if (config.key) {
      sortedItems.sort((a, b) => {
        const aValue = a[config.key as keyof LibraryItem];
        const bValue = b[config.key as keyof LibraryItem];

        if (aValue === null) return 1;
        if (bValue === null) return -1;
        if (aValue < bValue) {
          return config.direction === "ascending" ? -1 : 1;
        }
        if (aValue > bValue) {
          return config.direction === "ascending" ? 1 : -1;
        }

        return 0;
      });
    }

    return sortedItems;
  }
}
