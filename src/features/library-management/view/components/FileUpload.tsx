import type { ChangeEvent } from "react";
import styled from "@emotion/styled";
import { Button, Label } from "@/shared/components";
import { useTranslation } from "react-i18next";
import { IoCloudUploadOutline, IoDocumentTextOutline } from "react-icons/io5";

const FileInput = styled.input`
  display: none;
`;

const FileInputLabel = styled.label<{ disabled: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: ${props => props.theme.spacing.s}px;
  height: 120px;
  border: 2px dashed ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.radii.m}px;
  cursor: ${props => (props.disabled ? "not-allowed" : "pointer")};
  background-color: ${props => props.theme.colors.mutedBackground};
  color: ${props => props.theme.colors.mutedForeground};
  transition: all 0.2s;
  opacity: ${props => (props.disabled ? 0.6 : 1)};

  &:hover {
    border-color: ${props =>
      props.disabled ? "" : props.theme.colors.primary};
    color: ${props => (props.disabled ? "" : props.theme.colors.primary)};
  }
`;

const FileInfo = styled.div`
  display: flex;
  flex-direction: column;
  padding: ${props => props.theme.spacing.s}px;
  background-color: ${props => props.theme.colors.mutedBackground};
  border-radius: ${props => props.theme.radii.s}px;
  color: ${props => props.theme.colors.mainForeground};
  gap: ${props => props.theme.spacing.s}px;
`;

const FileHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const ErrorMessage = styled.p(props => ({
  ...props.theme.textVariants.error,
  marginTop: props.theme.spacing.s,
}));

const ProgressBarContainer = styled.div`
  width: 100%;
  height: 6px;
  background-color: ${props => props.theme.colors.border};
  border-radius: 3px;
  overflow: hidden;
`;

const ProgressBarFill = styled.div<{ progress: number }>`
  height: 100%;
  width: ${props => props.progress}%;
  background-color: ${props => props.theme.colors.primary};
  transition: width 0.3s ease-in-out;
`;

interface FileUploadProps {
  label: string;
  file: File | null;
  setFile: (file: File | null) => void;
  uploadProgress: number | null;
  error?: string | null;
  disabled: boolean;
  accept: string;
}

export default function FileUpload({
  label,
  file,
  setFile,
  uploadProgress,
  error,
  disabled,
  accept,
}: FileUploadProps) {
  const { t } = useTranslation();

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const isUploading = uploadProgress !== null;

  return (
    <div>
      <Label>{label}</Label>
      {!file && !isUploading && (
        <>
          <FileInput
            type="file"
            id={`file-upload-${label}`}
            onChange={handleFileChange}
            disabled={disabled}
            accept={accept}
          />
          <FileInputLabel htmlFor={`file-upload-${label}`} disabled={disabled}>
            <IoCloudUploadOutline size={32} />
            <span>{t("library_form_upload_button")}</span>
          </FileInputLabel>
        </>
      )}

      {isUploading && (
        <FileInfo>
          <span style={{ fontSize: "14px", fontWeight: 500 }}>
            {t("library_form_upload_uploading", { progress: uploadProgress })}
          </span>
          <ProgressBarContainer>
            <ProgressBarFill progress={uploadProgress || 0} />
          </ProgressBarContainer>
        </FileInfo>
      )}

      {file && !isUploading && (
        <FileInfo>
          <FileHeader>
            <div style={{ display: "flex", alignItems: "center" }}>
              <IoDocumentTextOutline size={20} style={{ marginRight: "8px" }} />
              <span>{file.name}</span>
            </div>
            <Button
              label={t("library_form_upload_change_button")}
              variant="secondary"
              size="small"
              style={{ width: "auto", height: "32px", fontSize: "12px" }}
              onClick={() =>
                document.getElementById(`file-upload-${label}`)?.click()
              }
              disabled={disabled}
            />
          </FileHeader>
        </FileInfo>
      )}

      {error && <ErrorMessage>{error}</ErrorMessage>}
    </div>
  );
}
