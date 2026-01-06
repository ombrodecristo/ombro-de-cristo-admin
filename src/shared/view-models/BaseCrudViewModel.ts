import { BaseViewModel } from "./BaseViewModel";
import { logService } from "@/shared/services/logService";
import i18n from "@/core/i18n";
import type { PostgrestError } from "@supabase/supabase-js";

export type SortConfig = {
  key: string | null;
  direction: "ascending" | "descending";
};

export abstract class BaseCrudViewModel<
  TItem extends { id: string },
> extends BaseViewModel {
  public items: TItem[] = [];
  public loading = true;
  public error: string | null = null;
  public selectedItem: TItem | null = null;
  public selectedItemForDetails: TItem | null = null;
  public isFormOpen = false;
  public isDeleteAlertOpen = false;
  public isDetailsModalOpen = false;
  public isDeleting = false;
  public searchQuery = "";
  public sortConfig: SortConfig = { key: null, direction: "ascending" };

  protected abstract resourceName: string;
  protected abstract fetchItemsFromServer(): Promise<{
    data: TItem[] | null;
    error: PostgrestError | Error | null;
  }>;
  protected abstract deleteItemFromServer(id: string): Promise<{
    error: PostgrestError | Error | null;
  }>;
  protected abstract filterItems(items: TItem[], query: string): TItem[];
  protected abstract sortItems(items: TItem[], config: SortConfig): TItem[];

  public init = (): void => {
    if (this.items.length > 0) return;
    this.fetchItems();
  };

  public setSearchQuery = (query: string): void => {
    this.searchQuery = query;
    this.notify();
  };

  public requestSort = (key: string): void => {
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

  public get sortedItems(): TItem[] {
    const filtered = this.filterItems(this.items, this.searchQuery);

    return this.sortItems(filtered, this.sortConfig);
  }

  public handleOpenCreate = (): void => {
    this.selectedItem = null;
    this.isFormOpen = true;
    this.notify();
  };

  public handleOpenEdit = (item: TItem): void => {
    this.selectedItem = item;
    this.isFormOpen = true;
    this.notify();
  };

  public handleOpenDelete = (item: TItem): void => {
    this.selectedItem = item;
    this.isDeleteAlertOpen = true;
    this.notify();
  };

  public handleCloseModals = (): void => {
    this.selectedItem = null;
    this.isFormOpen = false;
    this.isDeleteAlertOpen = false;
    this.notify();
  };

  public handleOpenDetailsModal = (item: TItem): void => {
    this.selectedItemForDetails = item;
    this.isDetailsModalOpen = true;
    this.notify();
  };

  public handleCloseDetailsModal = (): void => {
    this.selectedItemForDetails = null;
    this.isDetailsModalOpen = false;
    this.notify();
  };

  public handleFormSuccess = (): void => {
    this.fetchItems();
  };

  public fetchItems = async (): Promise<void> => {
    this.loading = true;
    this.notify();
    const { data, error } = await this.fetchItemsFromServer();

    if (error) {
      this.error = i18n.t("error_loading_resource", {
        resource: this.resourceName,
      });
      await logService.logError(error, {
        component: this.constructor.name,
      });
    } else if (data) {
      this.items = data;
    }
    this.loading = false;
    this.notify();
  };

  public handleDeleteConfirm = async (): Promise<void> => {
    if (!this.selectedItem) return;

    this.isDeleting = true;
    this.notify();

    const id = this.selectedItem.id;
    const { error: deleteError } = await this.deleteItemFromServer(id);

    this.isDeleting = false;

    if (deleteError) {
      this.error = i18n.t("error_deleting_resource", {
        resource: this.resourceName,
      });
      await logService.logError(deleteError, {
        component: this.constructor.name,
        context: { itemId: id },
      });
    } else {
      this.handleCloseModals();
      this.fetchItems();
    }
    this.notify();
  };
}
