import { useState, type FormEvent } from "react";
import styled from "@emotion/styled";
import { LibraryFormViewModel } from "../../view-models/LibraryFormViewModel";
import { useViewModel } from "@/shared/hooks/useViewModel";
import { Modal, Button, Input, Textarea, Label } from "@/shared/components";
import type { LibraryItem } from "@/core/types/database";
import {
  IoSaveOutline,
  IoOpenOutline,
  IoInformationCircleOutline,
} from "react-icons/io5";
import { useTranslation } from "react-i18next";
import FileUpload from "./FileUpload";
import ContentTypeSelector from "./ContentTypeSelector";

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

const Alert = styled.div`
  background-color: ${props => props.theme.colors.mutedBackground};
  border-radius: ${props => props.theme.radii.s}px;
  padding: ${props => props.theme.spacing.sm}px;
  display: flex;
  gap: ${props => props.theme.spacing.s}px;
  align-items: center;
  color: ${props => props.theme.colors.mutedForeground};
  font-size: 13px;
`;

const PreviewContainer = styled.div`
  width: 100%;
  margin-bottom: ${props => props.theme.spacing.s}px;
  border-radius: ${props => props.theme.radii.m}px;
  overflow: hidden;
  background-color: ${props => props.theme.colors.black};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Iframe = styled.iframe`
  width: 100%;
  aspect-ratio: 16 / 9;
  border: none;
`;

const Video = styled.video`
  width: 100%;
  max-height: 400px;
  outline: none;
`;

const PdfObject = styled.object`
  width: 100%;
  height: 400px;
  border: none;
  background-color: ${props => props.theme.colors.white};
`;

const PreviewLabel = styled(Label)`
  margin-top: ${props => props.theme.spacing.m}px;
  margin-bottom: ${props => props.theme.spacing.xs}px;
  font-weight: 600;
  color: ${props => props.theme.colors.primary};
`;

const PdfFallback = styled.div`
  padding: ${props => props.theme.spacing.l}px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${props => props.theme.spacing.m}px;
  background-color: ${props => props.theme.colors.mutedBackground};
  color: ${props => props.theme.colors.mutedForeground};
  text-align: center;
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

  const getYouTubeEmbedUrl = (url: string) => {
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;

    const match = url.match(regExp);
    const id = match && match[2].length === 11 ? match[2] : null;

    return id ? `https://www.youtube.com/embed/${id}` : null;
  };

  const showPreview =
    viewModel.isEditing &&
    viewModel.previewUrl &&
    itemToEdit?.content_type === viewModel.contentType;

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
            <ContentTypeSelector
              value={viewModel.contentType}
              onChange={viewModel.setContentType}
              disabled={viewModel.loading || viewModel.isEditing}
            />
          </div>

          {viewModel.isEditing && (
            <Alert>
              <IoInformationCircleOutline size={28} style={{ flexShrink: 0 }} />
              <div>
                <span
                  dangerouslySetInnerHTML={{
                    __html: t("library_form_edit_type_warning"),
                  }}
                />
              </div>
            </Alert>
          )}

          {showPreview && (
            <div>
              <PreviewLabel>Conteúdo Atual</PreviewLabel>
              <PreviewContainer>
                {viewModel.contentType === "YOUTUBE" && (
                  <Iframe
                    src={getYouTubeEmbedUrl(viewModel.previewUrl!) || ""}
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                )}
                {viewModel.contentType === "DIRECT_UPLOAD" && (
                  <Video controls src={viewModel.previewUrl!} />
                )}
                {viewModel.contentType === "PDF" && (
                  <PdfObject
                    data={viewModel.previewUrl!}
                    type="application/pdf"
                  >
                    <PdfFallback>
                      <p>
                        Seu navegador não suporta visualização de PDF integrada.
                      </p>
                      <a
                        href={viewModel.previewUrl!}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ textDecoration: "none" }}
                      >
                        <Button
                          type="button"
                          label="Abrir PDF em nova aba"
                          variant="secondary"
                          icon={<IoOpenOutline size={18} />}
                        />
                      </a>
                    </PdfFallback>
                  </PdfObject>
                )}
              </PreviewContainer>
            </div>
          )}

          {viewModel.contentType === "YOUTUBE" && (
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

          {viewModel.contentType === "PDF" && (
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

          {viewModel.contentType === "DIRECT_UPLOAD" && (
            <FileUpload
              label={t("library_form_upload_label_video")}
              file={viewModel.file}
              setFile={viewModel.setFile}
              uploadProgress={viewModel.uploadProgress}
              error={viewModel.fileError}
              disabled={viewModel.loading}
              accept="video/*"
            />
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
