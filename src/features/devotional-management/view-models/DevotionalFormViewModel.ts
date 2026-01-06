import { type FormEvent } from "react";
import { BaseViewModel } from "@/shared/view-models/BaseViewModel";
import {
  devotionalRepository,
  type DevotionalWithAuthor,
} from "@/data/repositories/devotionalRepository";
import { logService } from "@/shared/services/logService";
import {
  validateDevotionalTitle,
  validateDevotionalContent,
} from "@/core/lib/validators";
import i18n from "@/core/i18n";

type DevotionalFormViewModelProps = {
  authorId: string;
  devotionalToEdit: DevotionalWithAuthor | null;
  onClose: () => void;
  onSuccess: () => void;
};

export class DevotionalFormViewModel extends BaseViewModel {
  public title: string;
  public content: string;
  public loading = false;
  public titleError: string | null = null;
  public contentError: string | null = null;
  public isEditing: boolean;
  private authorId: string;
  private devotionalToEdit: DevotionalWithAuthor | null;
  private onClose: () => void;
  private onSuccess: () => void;

  constructor(props: DevotionalFormViewModelProps) {
    super();
    this.authorId = props.authorId;
    this.devotionalToEdit = props.devotionalToEdit;
    this.onClose = props.onClose;
    this.onSuccess = props.onSuccess;
    this.isEditing = props.devotionalToEdit !== null;
    this.title = props.devotionalToEdit?.title || "";
    this.content = props.devotionalToEdit?.content || "";
  }

  public setTitle = (value: string) => {
    this.title = value;
    this.titleError = null;
    this.notify();
  };

  public setContent = (value: string) => {
    this.content = value;
    this.contentError = null;
    this.notify();
  };

  public handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    this.titleError = null;
    this.contentError = null;
    this.notify();

    const titleValidation = validateDevotionalTitle(this.title);
    if (!titleValidation.isValid) {
      this.titleError = titleValidation.message;
      this.notify();

      return;
    }

    const contentValidation = validateDevotionalContent(this.content);
    if (!contentValidation.isValid) {
      this.contentError = contentValidation.message;
      this.notify();

      return;
    }

    if (
      this.isEditing &&
      this.title.trim() === this.devotionalToEdit!.title &&
      this.content.trim() === this.devotionalToEdit!.content
    ) {
      this.onClose();

      return;
    }

    this.loading = true;
    this.notify();

    const { data, error: apiError } = this.isEditing
      ? await devotionalRepository.updateDevotional(
          this.devotionalToEdit!.id,
          this.title.trim(),
          this.content.trim()
        )
      : await devotionalRepository.createDevotional(
          this.title.trim(),
          this.content.trim(),
          this.authorId
        );

    this.loading = false;

    if (apiError) {
      const friendlyMessage = this.isEditing
        ? i18n.t("devotionals_form_error_update")
        : i18n.t("devotionals_form_error_create");

      this.titleError = friendlyMessage;
      await logService.logError(apiError, {
        component: "DevotionalFormViewModel",
        context: { devotionalId: this.devotionalToEdit?.id, title: this.title },
      });
    } else if (data) {
      this.onSuccess();
      this.onClose();
    }
    this.notify();
  };
}
