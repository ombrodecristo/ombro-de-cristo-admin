import { type FormEvent } from "react";
import { BaseViewModel } from "@/shared/view-models/BaseViewModel";
import { devotionalRepository } from "@/data/repositories/devotionalRepository";
import type { DevotionalWithTranslations } from "@/data/repositories/devotionalRepository";
import { logService } from "@/shared/services/logService";
import {
  validateDevotionalContent,
  validateDevotionalTitle,
} from "@/core/lib/validators";
import i18n from "@/core/i18n";
import { toast } from "sonner";
import type { ServiceResponse } from "@/core/types/service";
import type { DevotionalTranslation } from "@/core/types/database";
import { supabase } from "@/core/lib/supabaseClient";

type DevotionalFormViewModelProps = {
  authorId: string;
  devotionalToEdit: DevotionalWithTranslations | null;
  onClose: () => void;
  onSuccess: () => void;
};

type Language = "pt" | "en" | "es";

type TranslationStatus = "completed" | "processing" | "error" | "new";

type TranslationState = {
  id: string | null;
  title: string;
  content: string;
  status: TranslationStatus;
};

export class DevotionalFormViewModel extends BaseViewModel {
  public translations: Record<Language, TranslationState> = {
    pt: { id: null, title: "", content: "", status: "new" },
    en: { id: null, title: "", content: "", status: "new" },
    es: { id: null, title: "", content: "", status: "new" },
  };

  public isManualEdit: Record<Language, boolean> = {
    pt: false,
    en: false,
    es: false,
  };

  public originalLanguage: Language =
    (i18n.language.split("-")[0] as Language) || "pt";
  public activeTab: Language = this.originalLanguage;
  public loading = false;
  public error: string | null = null;
  public isEditing: boolean;

  private authorId: string;
  private devotionalToEdit: DevotionalWithTranslations | null;
  private onClose: () => void;
  private onSuccess: () => void;

  constructor(props: DevotionalFormViewModelProps) {
    super();
    this.authorId = props.authorId;
    this.devotionalToEdit = props.devotionalToEdit;
    this.onClose = props.onClose;
    this.onSuccess = props.onSuccess;
    this.isEditing = !!props.devotionalToEdit;
    this.updateDevotional(props.devotionalToEdit);
  }

  public updateDevotional(devotional: DevotionalWithTranslations | null) {
    this.devotionalToEdit = devotional;
    this.isEditing = !!devotional;

    if (this.isEditing && this.devotionalToEdit) {
      this.originalLanguage = this.devotionalToEdit
        .original_language as Language;

      this.devotionalToEdit.translations.forEach(t => {
        const lang = t.language_code as Language;
        if (this.translations[lang]) {
          this.translations[lang] = {
            id: t.id,
            title: t.title,
            content: t.content,
            status: t.status as TranslationState["status"],
          };
        }
      });
    } else {
      this.originalLanguage = (i18n.language.split("-")[0] as Language) || "pt";
      this.activeTab = this.originalLanguage;
      this.translations = {
        pt: { id: null, title: "", content: "", status: "new" },
        en: { id: null, title: "", content: "", status: "new" },
        es: { id: null, title: "", content: "", status: "new" },
      };
      this.translations[this.originalLanguage].status = "completed";
    }
    this.notify();
  }

  public get currentTranslation() {
    return this.translations[this.activeTab];
  }

  public get showEmptyState() {
    const isReprocessable =
      this.currentTranslation.status === "new" ||
      this.currentTranslation.status === "error";

    return isReprocessable && !this.isManualEdit[this.activeTab];
  }

  public setActiveTab = (tab: Language) => {
    this.activeTab = tab;
    this.error = null;
    this.notify();
  };

  public setOriginalLanguage = (lang: Language) => {
    this.translations[this.originalLanguage].status = "new";
    this.originalLanguage = lang;
    this.translations[lang].status = "completed";
    this.activeTab = lang;
    this.notify();
  };

  public handleManualEdit = () => {
    this.isManualEdit[this.activeTab] = true;
    this.notify();
  };

  public handleInputChange = (field: "title" | "content", value: string) => {
    this.translations[this.activeTab][field] = value;
    this.error = null;
    this.notify();
  };

  public handleGenerateWithAI = async () => {
    const translation = this.translations[this.activeTab];
    if (!translation || !translation.id) return;

    this.loading = true;
    this.notify();

    const { data: updatedTranslation, error } =
      await devotionalRepository.updateTranslationStatus(
        translation.id,
        "processing"
      );

    this.loading = false;
    if (error) {
      toast.error(i18n.t("error_generic"));
      await logService.logError(error, {
        component: "DevotionalFormViewModel.handleGenerateWithAI",
      });
    } else if (updatedTranslation) {
      this.translations[this.activeTab].status = "processing";
      this.onSuccess();
    }
    this.notify();
  };

  private async createTranslation(
    lang: Language
  ): Promise<ServiceResponse<DevotionalTranslation> | undefined> {
    if (!this.devotionalToEdit) return;

    const { data, error } = await supabase
      .from("devotional_translations")
      .insert({
        devotional_id: this.devotionalToEdit.id,
        language_code: lang,
        title: this.translations[lang].title.trim(),
        content: this.translations[lang].content.trim(),
        is_original: false,
        status: "completed",
      })
      .select()
      .single();

    return { data, error };
  }

  public handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    this.error = null;

    const activeTranslation = this.translations[this.activeTab];
    const titleValidation = validateDevotionalTitle(activeTranslation.title);
    if (!titleValidation.isValid) {
      this.error = titleValidation.message;
      this.notify();

      return;
    }

    const contentValidation = validateDevotionalContent(
      activeTranslation.content
    );
    if (!contentValidation.isValid) {
      this.error = contentValidation.message;
      this.notify();

      return;
    }

    this.loading = true;
    this.notify();

    if (this.isEditing) {
      let result;
      if (activeTranslation.id) {
        result = await devotionalRepository.updateDevotionalTranslation(
          activeTranslation.id,
          {
            title: activeTranslation.title.trim(),
            content: activeTranslation.content.trim(),
          }
        );
      } else {
        result = await this.createTranslation(this.activeTab);
      }

      if (result && !result.error) {
        this.onSuccess();
        this.onClose();
      } else {
        this.error = i18n.t("devotionals_form_error_update");
        if (result?.error) {
          await logService.logError(result.error, {
            component: "DevotionalFormViewModel",
          });
        }
      }
    } else {
      const newOriginal = {
        language_code: this.originalLanguage,
        title: this.translations[this.originalLanguage].title.trim(),
        content: this.translations[this.originalLanguage].content.trim(),
        is_original: true,
      };

      const { error } = await devotionalRepository.createDevotional(
        newOriginal,
        this.authorId
      );

      if (error) {
        this.error = i18n.t("devotionals_form_error_create");
        await logService.logError(error!, {
          component: "DevotionalFormViewModel",
        });
      } else {
        this.onSuccess();
        this.onClose();
      }
    }
    this.loading = false;
    this.notify();
  };
}
