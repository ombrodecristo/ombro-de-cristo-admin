import { useState, type FormEvent } from "react";
import styled from "@emotion/styled";
import { LibraryFormViewModel } from "../../view-models/LibraryFormViewModel";
import { useViewModel } from "@/shared/hooks/useViewModel";
import {
  Modal,
  Button,
  Input,
  Textarea,
  Label,
  Select,
} from "@/shared/components";
import type { LibraryItem } from "@/core/types/database";
import { IoSaveOutline } from "react-icons/io5";
import { useTranslation } from "react-i18next";
import FileUpload from "./FileUpload";

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

const Title = styled.h2(props => ({
  ...props.theme.textVariants.subHeader,
  fontSize: "22px",
  color: props.theme.colors.mainForeground,
  textAlign: "center",
  paddingBottom: props.theme.spacing.m,
  flexShrink: 0,
}));

const ScrollableContent = styled.div(props => ({
  flex: 1,
  overflowY: "auto",
  minHeight: 0,
  display: "flex",
  flexDirection: "column",
  gap: props.theme.spacing.m,
  paddingRight: props.theme.spacing.sm,

  "&::-webkit-scrollbar": {
    width: "10px",
  },
  "&::-webkit-scrollbar-track": {
    background: props.theme.colors.mutedBackground,
    borderRadius: props.theme.radii.round,
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: props.theme.colors.mutedForeground,
    borderRadius: props.theme.radii.round,
  },
  "&::-webkit-scrollbar-thumb:hover": {
    backgroundColor: props.theme.colors.primary,
  },
  scrollbarWidth: "auto",
  scrollbarColor: `${props.theme.colors.mutedForeground} ${props.theme.colors.mutedBackground}`,
}));

const Actions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding-top: ${props => props.theme.spacing.m}px;
  flex-shrink: 0;
`;

interface LibraryFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  itemToEdit: LibraryItem | null;
}

export default function LibraryFormModal({
  isOpen,
  onClose,
  onSuccess,
  itemToEdit,
}: LibraryFormModalProps) {
  const { t } = useTranslation();

  const [viewModel] = useState(
    () =>
      new LibraryFormViewModel({
        itemToEdit,
        onClose,
        onSuccess,
      })
  );

  useViewModel(viewModel);

  const onFormSubmit = (e: FormEvent) => {
    viewModel.handleSubmit(e);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWidth="800px">
      <FormContainer onSubmit={onFormSubmit}>
        <Title>
          {viewModel.isEditing
            ? t("library_form_edit_title")
            : t("library_form_new_title")}
        </Title>
        <ScrollableContent>
          <div>
            <Label htmlFor="title">{t("library_form_title_label")}</Label>
            <Input
              id="title"
              value={viewModel.title}
              onChange={e => viewModel.setTitle(e.target.value)}
              disabled={viewModel.loading}
              required
              error={viewModel.titleError || ""}
              placeholder={t("library_form_title_placeholder")}
            />
          </div>
          <div>
            <Label htmlFor="description">
              {t("library_form_description_label")}
            </Label>
            <Textarea
              id="description"
              value={viewModel.description}
              onChange={e => viewModel.setDescription(e.target.value)}
              disabled={viewModel.loading}
              placeholder={t("library_form_description_placeholder")}
              style={{ minHeight: "100px" }}
            />
          </div>
          <div>
            <Label>{t("library_form_type_label")}</Label>
            <Select
              value={viewModel.contentType}
              onChange={v => viewModel.setContentType(v as "pdf" | "video")}
              disabled={viewModel.loading || viewModel.isEditing}
              options={[
                { value: "video", label: t("library_form_type_video") },
                { value: "pdf", label: t("library_form_type_pdf") },
              ]}
            />
          </div>

          {viewModel.contentType === "video" && (
            <div>
              <Label>{t("library_form_video_provider_label")}</Label>
              <Select
                value={viewModel.videoProvider}
                onChange={v =>
                  viewModel.setVideoProvider(v as "youtube" | "storage")
                }
                disabled={viewModel.loading || viewModel.isEditing}
                options={[
                  {
                    value: "youtube",
                    label: t("library_form_video_provider_youtube"),
                  },
                  {
                    value: "storage",
                    label: t("library_form_video_provider_storage"),
                  },
                ]}
              />
            </div>
          )}

          {viewModel.contentType === "video" &&
            viewModel.videoProvider === "youtube" && (
              <div>
                <Label htmlFor="videoUrl">
                  {t("library_form_youtube_url_label")}
                </Label>
                <Input
                  id="videoUrl"
                  value={viewModel.videoUrl}
                  onChange={e => viewModel.setVideoUrl(e.target.value)}
                  disabled={viewModel.loading}
                  required
                  error={viewModel.videoUrlError || ""}
                  placeholder={t("library_form_youtube_url_placeholder")}
                />
              </div>
            )}

          {viewModel.contentType === "pdf" && (
            <FileUpload
              label={t("library_form_upload_label_pdf")}
              file={viewModel.file}
              setFile={viewModel.setFile}
              uploadProgress={viewModel.uploadProgress}
              error={viewModel.fileError}
              disabled={viewModel.loading}
              accept="application/pdf"
            />
          )}

          {viewModel.contentType === "video" &&
            viewModel.videoProvider === "storage" && (
              <>
                <FileUpload
                  label={t("library_form_upload_label_video")}
                  file={viewModel.file}
                  setFile={viewModel.setFile}
                  uploadProgress={viewModel.uploadProgress}
                  error={viewModel.fileError}
                  disabled={viewModel.loading}
                  accept="video/*"
                />
                <FileUpload
                  label={t("library_form_upload_label_thumbnail")}
                  file={viewModel.thumbnailFile}
                  setFile={viewModel.setThumbnailFile}
                  uploadProgress={viewModel.thumbnailUploadProgress}
                  error={viewModel.thumbnailError}
                  disabled={viewModel.loading}
                  accept="image/*"
                />
              </>
            )}
        </ScrollableContent>
        <Actions>
          <Button
            type="submit"
            label={t("common_save")}
            loading={viewModel.loading}
            icon={<IoSaveOutline size={20} />}
          />
          <Button
            type="button"
            label={t("common_cancel")}
            variant="secondary"
            onClick={onClose}
            disabled={viewModel.loading}
          />
        </Actions>
      </FormContainer>
    </Modal>
  );
}
