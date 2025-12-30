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
  public contentType: "pdf" | "video" = "video";
  public videoProvider: "youtube" | "storage" = "youtube";
  public videoUrl = "";
  public file: File | null = null;
  public thumbnailFile: File | null = null;

  public titleError: string | null = null;
  public videoUrlError: string | null = null;
  public fileError: string | null = null;
  public thumbnailError: string | null = null;

  public loading = false;
  public uploadProgress: number | null = null;
  public thumbnailUploadProgress: number | null = null;

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
      this.videoProvider = this.itemToEdit.video_provider || "youtube";
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

  public setContentType = (value: "pdf" | "video") => {
    this.contentType = value;
    this.resetDependentFields();
    this.notify();
  };

  public setVideoProvider = (value: "youtube" | "storage") => {
    this.videoProvider = value;
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

  public setThumbnailFile = (file: File | null) => {
    this.thumbnailFile = file;
    this.thumbnailError = null;
    this.notify();
  };

  private resetErrors() {
    this.titleError = null;
    this.videoUrlError = null;
    this.fileError = null;
    this.thumbnailError = null;
  }

  private resetDependentFields() {
    this.videoUrl = "";
    this.file = null;
    this.thumbnailFile = null;
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

    if (this.contentType === "video") {
      if (this.videoProvider === "youtube") {
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
    } else {
      if (!this.file && !this.isEditing) {
        this.fileError = i18n.t("validation_file_required");
        this.notify();

        return false;
      }
    }

    return true;
  }

  private async uploadFile(file: File, path: string): Promise<string> {
    const { data, error } = await libraryRepository.uploadFile(path, file);

    if (error || !data) {
      throw error || new Error("File upload failed and returned no data.");
    }

    return libraryRepository.getFilePublicUrl(data.path);
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
        video_provider: null,
        video_url: null,
        file_path: this.itemToEdit?.file_path || null,
        thumbnail_url: this.itemToEdit?.thumbnail_url || null,
      };

      if (this.contentType === "pdf" && this.file) {
        const fileExt = this.file.name.split(".").pop();
        const filePath = `pdfs/${uuidv4()}.${fileExt}`;
        await this.uploadFile(this.file, filePath);
        itemPayload.file_path = filePath;
      } else if (this.contentType === "video") {
        itemPayload.video_provider = this.videoProvider;

        if (this.videoProvider === "youtube") {
          itemPayload.video_url = this.videoUrl.trim();

          const videoId =
            this.videoUrl.match(
              /(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/\s]{11})/
            )?.[1] || null;

          if (videoId) {
            itemPayload.thumbnail_url = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
          }
        } else if (this.videoProvider === "storage") {
          if (this.file) {
            const fileExt = this.file.name.split(".").pop();
            const filePath = `videos/${uuidv4()}.${fileExt}`;
            await this.uploadFile(this.file, filePath);
            itemPayload.file_path = filePath;
          }

          if (this.thumbnailFile) {
            const thumbExt = this.thumbnailFile.name.split(".").pop();
            const thumbPath = `thumbnails/${uuidv4()}.${thumbExt}`;
            itemPayload.thumbnail_url = await this.uploadFile(
              this.thumbnailFile,
              thumbPath
            );
          }
        }
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
