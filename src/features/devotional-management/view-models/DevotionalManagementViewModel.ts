import {
  BaseCrudViewModel,
  type SortConfig,
} from "@/shared/view-models/BaseCrudViewModel";
import {
  devotionalRepository,
  type DevotionalWithAuthor,
} from "@/data/repositories/devotionalRepository";
import i18n from "@/core/i18n";

export class DevotionalManagementViewModel extends BaseCrudViewModel<DevotionalWithAuthor> {
  protected resourceName = i18n.t("resource_devotionals");

  constructor() {
    super();
    this.sortConfig = { key: "updated_at", direction: "descending" };
  }

  protected async fetchItemsFromServer() {
    return devotionalRepository.getDevotionals();
  }

  protected async deleteItemFromServer(id: string) {
    return devotionalRepository.deleteDevotional(id);
  }

  protected filterItems(
    items: DevotionalWithAuthor[],
    query: string
  ): DevotionalWithAuthor[] {
    if (!query) return items;

    return items.filter(devotional =>
      devotional.title.toLowerCase().includes(query.toLowerCase())
    );
  }

  protected sortItems(
    items: DevotionalWithAuthor[],
    config: SortConfig
  ): DevotionalWithAuthor[] {
    const sortedItems = [...items];

    if (config.key) {
      sortedItems.sort((a, b) => {
        let aValue: string | null;
        let bValue: string | null;

        if (config.key === "author") {
          aValue = a.author?.full_name ?? "";
          bValue = b.author?.full_name ?? "";
        } else {
          aValue = a[config.key as keyof DevotionalWithAuthor] as string | null;
          bValue = b[config.key as keyof DevotionalWithAuthor] as string | null;
        }

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
