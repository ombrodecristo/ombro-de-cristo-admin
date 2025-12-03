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
} from "@/lib/validators";

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
  public error: string | null = null;
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
    this.error = null;
    this.notify();
  };

  public setContent = (value: string) => {
    this.content = value;
    this.error = null;
    this.notify();
  };

  public handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    this.error = null;
    this.notify();

    const titleValidation = validateDevotionalTitle(this.title);
    if (!titleValidation.isValid) {
      this.error = titleValidation.message;
      this.notify();

      return;
    }

    const contentValidation = validateDevotionalContent(this.content);
    if (!contentValidation.isValid) {
      this.error = contentValidation.message;
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
        ? "Não foi possível salvar as alterações."
        : "Não foi possível criar o novo devocional.";

      this.error = friendlyMessage;
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
