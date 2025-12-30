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
  align-items: center;
  justify-content: space-between;
  padding: ${props => props.theme.spacing.s}px;
  background-color: ${props => props.theme.colors.mutedBackground};
  border-radius: ${props => props.theme.radii.s}px;
  color: ${props => props.theme.colors.mainForeground};
`;

const ErrorMessage = styled.p(props => ({
  ...props.theme.textVariants.error,
  marginTop: props.theme.spacing.s,
}));

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
          <span>
            {t("library_form_upload_uploading", { progress: uploadProgress })}
          </span>
        </FileInfo>
      )}

      {file && !isUploading && (
        <FileInfo>
          <IoDocumentTextOutline size={20} style={{ marginRight: "8px" }} />
          <span>{file.name}</span>
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
        </FileInfo>
      )}

      {error && <ErrorMessage>{error}</ErrorMessage>}
    </div>
  );
}
