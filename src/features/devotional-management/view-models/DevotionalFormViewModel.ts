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

type DevotionalFormViewModelProps = {
  authorId: string;
  devotionalToEdit: DevotionalWithTranslations | null;
  onClose: () => void;
  onSuccess: () => void;
};

type Language = "pt" | "en" | "es";

type TranslationStatus = "completed" | "processing" | "error" | "new";

type TranslationState = {
  title: string;
  content: string;
  status: TranslationStatus;
  id: string | null;
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

  public autoTranslate = true;
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

    if (this.isEditing && this.devotionalToEdit) {
      this.originalLanguage = this.devotionalToEdit
        .original_language as Language;
      this.activeTab = this.originalLanguage;

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
      this.translations[this.originalLanguage].status = "completed";
    }
  }

  public get currentTranslation() {
    return this.translations[this.activeTab];
  }

  public get showEmptyState() {
    return (
      this.currentTranslation.status === "new" &&
      !this.isManualEdit[this.activeTab]
    );
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

  public setAutoTranslate = (value: boolean) => {
    this.autoTranslate = value;
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
    const lang = this.activeTab;
    const translationId = this.translations[lang].id;

    if (translationId) {
      await this.handleRetryTranslation(lang);
    } else {
      await this.createAndTranslate(lang);
    }
  };

  private handleRetryTranslation = async (lang: Language) => {
    const translationId = this.translations[lang].id;
    if (!translationId) return;

    this.loading = true;
    this.notify();

    const { error } =
      await devotionalRepository.retryTranslation(translationId);

    this.loading = false;
    if (error) {
      toast.error(i18n.t("error_generic"));
      await logService.logError(error, {
        component: "DevotionalFormViewModel",
        context: { action: "retryTranslation", translationId },
      });
    } else {
      this.translations[lang].status = "processing";
      this.onSuccess();
    }
    this.notify();
  };

  private createAndTranslate = async (lang: Language) => {
    if (!this.devotionalToEdit) return;

    this.loading = true;
    this.notify();

    const { data: newTranslation, error: createError } =
      await devotionalRepository.createDevotionalTranslation({
        devotional_id: this.devotionalToEdit.id,
        language_code: lang,
        title: "Placeholder",
        content: "Placeholder for translation.",
        is_original: false,
        status: "error",
      });

    if (createError || !newTranslation) {
      this.loading = false;
      toast.error(i18n.t("error_generic"));
      await logService.logError(
        createError || new Error("Failed to create placeholder translation."),
        {
          component: "DevotionalFormViewModel",
          context: { action: "createAndTranslate" },
        }
      );
      this.notify();
      return;
    }

    const { error: retryError } = await devotionalRepository.retryTranslation(
      newTranslation.id
    );

    this.loading = false;
    if (retryError) {
      toast.error(i18n.t("error_generic"));
      await logService.logError(retryError, {
        component: "DevotionalFormViewModel",
      });
    } else {
      toast.success("Translation has started...");
      this.onSuccess();
    }
    this.notify();
  };

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

    let result:
      | Awaited<ReturnType<typeof devotionalRepository.createDevotional>>
      | Awaited<
          ReturnType<typeof devotionalRepository.updateDevotionalTranslation>
        >
      | undefined;

    if (this.isEditing) {
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
    } else {
      const newOriginal = {
        language_code: this.originalLanguage,
        title: this.translations[this.originalLanguage].title.trim(),
        content: this.translations[this.originalLanguage].content.trim(),
        is_original: true,
        created_at: "",
        updated_at: "",
      };
      result = await devotionalRepository.createDevotional(
        newOriginal,
        this.authorId
      );
    }

    this.loading = false;

    if (!result || result.error) {
      this.error = i18n.t("error_saving_resource", {
        resource: i18n.t("resource_devotionals"),
      });
      await logService.logError(
        result?.error ||
          new Error("Operation failed without a specific error."),
        { component: "DevotionalFormViewModel" }
      );
    } else {
      this.onSuccess();
      this.onClose();
    }
    this.notify();
  };

  private async createTranslation(lang: Language) {
    if (!this.devotionalToEdit) return;
    return devotionalRepository.createDevotionalTranslation({
      devotional_id: this.devotionalToEdit.id,
      language_code: lang,
      title: this.translations[lang].title.trim(),
      content: this.translations[lang].content.trim(),
      is_original: false,
      status: "completed",
    });
  }
}
