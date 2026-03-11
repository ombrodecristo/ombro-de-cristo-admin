import {
  BaseCrudViewModel,
  type SortConfig,
} from "@/shared/view-models/BaseCrudViewModel";
import {
  devotionalRepository,
  type DevotionalWithTranslations,
} from "@/data/repositories/devotionalRepository";
import i18n from "@/core/i18n";
import { supabase } from "@/core/lib/supabaseClient";
import type { DevotionalTranslation } from "@/core/types/database";
import type { RealtimeChannel } from "@supabase/supabase-js";
import { logService } from "@/shared/services/logService";

export class DevotionalManagementViewModel extends BaseCrudViewModel<DevotionalWithTranslations> {
  protected resourceName = i18n.t("resource_devotionals");
  private channel: RealtimeChannel | null = null;

  constructor() {
    super();
    this.sortConfig = { key: "published_at", direction: "descending" };
  }

  public override init = (): void => {
    if (this.items.length > 0) return;
    this.fetchItems();
    this.subscribeToChanges();
  };

  public cleanup = (): void => {
    if (this.channel) {
      supabase.removeChannel(this.channel);
      this.channel = null;
    }
  };

  private subscribeToChanges = () => {
    if (this.channel) {
      return;
    }

    this.channel = supabase
      .channel("devotional_translations_changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "devotional_translations",
        },
        payload => {
          const { eventType, new: newRecord, old: oldRecord } = payload;
          const record = (
            eventType === "DELETE" ? oldRecord : newRecord
          ) as DevotionalTranslation;

          if (!record || !record.devotional_id) return;

          const devotionalIndex = this.items.findIndex(
            d => d.id === record.devotional_id
          );

          if (devotionalIndex === -1) return;

          const devotional = { ...this.items[devotionalIndex] };
          devotional.translations = [...devotional.translations];
          const translationIndex = devotional.translations.findIndex(
            t => t.id === record.id
          );

          if (eventType === "INSERT" && translationIndex === -1) {
            devotional.translations.push(record);
          } else if (eventType === "UPDATE" && translationIndex !== -1) {
            devotional.translations[translationIndex] = {
              ...devotional.translations[translationIndex],
              ...record,
            };
          } else if (eventType === "DELETE" && translationIndex !== -1) {
            devotional.translations.splice(translationIndex, 1);
          }

          this.items[devotionalIndex] = devotional;
          this.notify();
        }
      )
      .subscribe((_, err) => {
        if (err) {
          logService.logError(
            new Error(`Realtime subscription error: ${err.message}`),
            { component: "DevotionalManagementViewModel" }
          );
        }
      });
  };

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
