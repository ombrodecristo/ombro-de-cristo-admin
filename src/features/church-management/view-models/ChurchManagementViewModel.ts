import {
  BaseCrudViewModel,
  type SortConfig,
} from "@/shared/view-models/BaseCrudViewModel";
import { churchRepository } from "@/data/repositories/churchRepository";
import type { Church } from "@/core/types/database";
import i18n from "@/core/i18n";

export class ChurchManagementViewModel extends BaseCrudViewModel<Church> {
  protected resourceName = i18n.t("resource_churches");

  constructor() {
    super();
    this.sortConfig = { key: "name", direction: "ascending" };
  }

  protected async fetchItemsFromServer() {
    return churchRepository.getChurches();
  }

  protected async deleteItemFromServer(id: string) {
    return churchRepository.deleteChurch(id);
  }

  protected filterItems(items: Church[], query: string): Church[] {
    if (!query) return items;

    return items.filter(church =>
      church.name.toLowerCase().includes(query.toLowerCase())
    );
  }

  protected sortItems(items: Church[], config: SortConfig): Church[] {
    const sortedItems = [...items];

    if (config.key) {
      sortedItems.sort((a, b) => {
        const aValue = a[config.key as keyof Church];
        const bValue = b[config.key as keyof Church];

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
