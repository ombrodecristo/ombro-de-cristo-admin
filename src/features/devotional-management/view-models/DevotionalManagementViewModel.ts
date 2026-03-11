import {
  BaseCrudViewModel,
  type SortConfig,
} from "@/shared/view-models/BaseCrudViewModel";
import {
  devotionalRepository,
  type DevotionalWithTranslations,
} from "@/data/repositories/devotionalRepository";
import i18n from "@/core/i18n";

export class DevotionalManagementViewModel extends BaseCrudViewModel<DevotionalWithTranslations> {
  protected resourceName = i18n.t("resource_devotionals");

  constructor() {
    super();
    this.sortConfig = { key: "published_at", direction: "descending" };
  }

  protected async fetchItemsFromServer() {
    return devotionalRepository.getDevotionals();
  }

  protected async deleteItemFromServer(id: string) {
    return devotionalRepository.deleteDevotional(id);
  }

  protected filterItems(
    items: DevotionalWithTranslations[],
    query: string
  ): DevotionalWithTranslations[] {
    if (!query) return items;
    const lowerCaseQuery = query.toLowerCase();

    return items.filter(devotional => {
      const originalTranslation = devotional.translations.find(
        t => t.is_original
      );

      return (
        originalTranslation?.title.toLowerCase().includes(lowerCaseQuery) ||
        devotional.author?.full_name?.toLowerCase().includes(lowerCaseQuery)
      );
    });
  }

  protected sortItems(
    items: DevotionalWithTranslations[],
    config: SortConfig
  ): DevotionalWithTranslations[] {
    const sortedItems = [...items];
    if (!config.key) return sortedItems;

    sortedItems.sort((a, b) => {
      let aValue: string | null | undefined;
      let bValue: string | null | undefined;

      if (config.key === "title") {
        aValue = a.translations.find(t => t.is_original)?.title;
        bValue = b.translations.find(t => t.is_original)?.title;
      } else if (config.key === "author") {
        aValue = a.author?.full_name;
        bValue = b.author?.full_name;
      } else {
        aValue = a[config.key as keyof DevotionalWithTranslations] as
          | string
          | null;
        bValue = b[config.key as keyof DevotionalWithTranslations] as
          | string
          | null;
      }

      if (aValue === null || aValue === undefined) return 1;
      if (bValue === null || bValue === undefined) return -1;
      if (aValue < bValue) {
        return config.direction === "ascending" ? -1 : 1;
      }
      if (aValue > bValue) {
        return config.direction === "ascending" ? 1 : -1;
      }

      return 0;
    });

    return sortedItems;
  }
}
