import { type FormEvent } from "react";
import { BaseViewModel } from "@/shared/view-models/BaseViewModel";
import { libraryRepository } from "@/data/repositories/libraryRepository";
import { logService } from "@/shared/services/logService";
import type { LibraryItem } from "@/core/types/database";
import type { TablesInsert } from "@/core/types/supabase";
import { validateLibraryItemTitle, validateUrl } from "@/core/lib/validators";
import i18n from "@/core/i18n";
import { v4 as uuidv4 } from "uuid";

type LibraryFormViewModelProps = {
  itemToEdit: LibraryItem | null;
  onClose: () => void;
  onSuccess: () => void;
};

export class LibraryFormViewModel extends BaseViewModel {
  public title = "";
  public description = "";
  public contentType: "PDF" | "YOUTUBE" | "DIRECT_UPLOAD" = "YOUTUBE";
  public videoUrl = "";
  public file: File | null = null;

  public titleError: string | null = null;
  public videoUrlError: string | null = null;
  public fileError: string | null = null;

  public loading = false;
  public uploadProgress: number | null = null;

  public isEditing: boolean;
  private itemToEdit: LibraryItem | null;
  private onClose: () => void;
  private onSuccess: () => void;

  constructor(props: LibraryFormViewModelProps) {
    super();
    this.itemToEdit = props.itemToEdit;
    this.onClose = props.onClose;
    this.onSuccess = props.onSuccess;
    this.isEditing = !!props.itemToEdit;

    if (this.isEditing && this.itemToEdit) {
      this.title = this.itemToEdit.title;
      this.description = this.itemToEdit.description || "";
      this.contentType = this.itemToEdit.content_type;
      this.videoUrl = this.itemToEdit.video_url || "";
    }
  }

  public setTitle = (value: string) => {
    this.title = value;
    this.titleError = null;
    this.notify();
  };

  public setDescription = (value: string) => {
    this.description = value;
    this.notify();
  };

  public setContentType = (value: "PDF" | "YOUTUBE" | "DIRECT_UPLOAD") => {
    this.contentType = value;
    this.resetDependentFields();
    this.notify();
  };

  public setVideoUrl = (value: string) => {
    this.videoUrl = value;
    this.videoUrlError = null;
    this.notify();
  };

  public setFile = (file: File | null) => {
    this.file = file;
    this.fileError = null;
    this.notify();
  };

  private resetErrors() {
    this.titleError = null;
    this.videoUrlError = null;
    this.fileError = null;
  }

  private resetDependentFields() {
    this.videoUrl = "";
    this.file = null;
    this.resetErrors();
  }

  private validate(): boolean {
    this.resetErrors();

    const titleValidation = validateLibraryItemTitle(this.title);
    if (!titleValidation.isValid) {
      this.titleError = titleValidation.message;
      this.notify();

      return false;
    }

    if (this.contentType === "YOUTUBE") {
      const urlValidation = validateUrl(this.videoUrl);
      if (!urlValidation.isValid) {
        this.videoUrlError = urlValidation.message;
        this.notify();

        return false;
      }
    } else {
      if (!this.file && !this.isEditing) {
        this.fileError = i18n.t("validation_file_required");
        this.notify();

        return false;
      }
    }

    return true;
  }

  private async uploadFile(
    file: File,
    path: string
  ): Promise<{ error: Error | null }> {
    const { error } = await libraryRepository.uploadFile(path, file);
    if (error) {
      await logService.logError(error, {
        component: "LibraryFormViewModel.uploadFile",
      });

      return { error };
    }

    return { error: null };
  }

  public handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!this.validate()) return;

    this.loading = true;
    this.notify();

    try {
      const itemPayload: TablesInsert<"library_items"> = {
        title: this.title.trim(),
        description: this.description.trim() || null,
        content_type: this.contentType,
        video_url: null,
        file_path: this.itemToEdit?.file_path || null,
      };

      if (this.contentType === "PDF" && this.file) {
        const fileExt = this.file.name.split(".").pop();
        const filePath = `pdfs/${uuidv4()}.${fileExt}`;
        const { error } = await this.uploadFile(this.file, filePath);
        if (error) throw error;
        itemPayload.file_path = filePath;
      }

      if (this.contentType === "DIRECT_UPLOAD" && this.file) {
        const fileExt = this.file.name.split(".").pop();
        const filePath = `videos/${uuidv4()}.${fileExt}`;
        const { error } = await this.uploadFile(this.file, filePath);
        if (error) throw error;
        itemPayload.file_path = filePath;
      }

      if (this.contentType === "YOUTUBE") {
        itemPayload.video_url = this.videoUrl.trim();
      }

      const { error } = this.isEditing
        ? await libraryRepository.updateLibraryItem(
            this.itemToEdit!.id,
            itemPayload
          )
        : await libraryRepository.createLibraryItem(itemPayload);

      if (error) throw error;

      this.onSuccess();
      this.onClose();
    } catch (error) {
      logService.logError(error as Error, {
        component: "LibraryFormViewModel",
      });
      this.fileError = i18n.t("library_form_upload_error");
    } finally {
      this.loading = false;
      this.notify();
    }
  };
}
