import { type FormEvent } from "react";
import { BaseViewModel } from "@/shared/view-models/BaseViewModel";
import { churchRepository } from "@/data/repositories/churchRepository";
import { logService } from "@/shared/services/logService";
import type { Church } from "@/core/types/database";
import { validateChurchName } from "@/core/lib/validators";

type ChurchFormViewModelProps = {
  churchToEdit: Church | null;
  onClose: () => void;
  onSuccess: () => void;
};

export class ChurchFormViewModel extends BaseViewModel {
  public name: string;
  public loading = false;
  public error: string | null = null;
  public isEditing: boolean;
  private churchToEdit: Church | null;
  private onClose: () => void;
  private onSuccess: () => void;

  constructor(props: ChurchFormViewModelProps) {
    super();
    this.churchToEdit = props.churchToEdit;
    this.onClose = props.onClose;
    this.onSuccess = props.onSuccess;
    this.isEditing = props.churchToEdit !== null;
    this.name = props.churchToEdit?.name || "";
  }

  public setName = (value: string) => {
    this.name = value;
    this.error = null;
    this.notify();
  };

  public handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    this.error = null;
    this.notify();

    const nameValidation = validateChurchName(this.name);
    if (!nameValidation.isValid) {
      this.error = nameValidation.message;
      this.notify();

      return;
    }

    if (this.isEditing && this.name.trim() === this.churchToEdit!.name) {
      this.onClose();

      return;
    }

    this.loading = true;
    this.notify();

    const { data, error: apiError } = this.isEditing
      ? await churchRepository.updateChurch(
          this.churchToEdit!.id,
          this.name.trim()
        )
      : await churchRepository.createChurch(this.name.trim());

    this.loading = false;

    if (apiError) {
      const friendlyMessage = this.isEditing
        ? "Não foi possível salvar as alterações."
        : "Não foi possível criar a nova igreja.";

      this.error = friendlyMessage;
      await logService.logError(apiError, {
        component: "ChurchFormViewModel",
        context: { churchId: this.churchToEdit?.id, name: this.name },
      });
    } else if (data) {
      this.onSuccess();
      this.onClose();
    }
    this.notify();
  };
}
