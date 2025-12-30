import styled from "@emotion/styled";
import type { LibraryItem } from "@/core/types/database";
import { Button, Modal } from "@/shared/components";
import { formatDate } from "@/core/lib/formatters";
import { IoPencil, IoTrashOutline, IoOpenOutline } from "react-icons/io5";
import { useTranslation } from "react-i18next";
import { libraryRepository } from "@/data/repositories/libraryRepository";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.l}px;
  width: 100%;
`;

const Title = styled.h2(props => ({
  ...props.theme.textVariants.subHeader,
  fontSize: "22px",
  color: props.theme.colors.mainForeground,
  textAlign: "center",
}));

const DetailsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.m}px;
`;

const DetailItem = styled.div`
  display: flex;
  flex-direction: column;
`;

const DetailLabel = styled.span(props => ({
  ...props.theme.textVariants.caption,
  color: props.theme.colors.mutedForeground,
  marginBottom: "4px",
}));

const DetailValue = styled.span(props => ({
  ...props.theme.textVariants.body,
  color: props.theme.colors.mainForeground,
  wordBreak: "break-word",
}));

const Actions = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.s}px;
  margin-top: ${props => props.theme.spacing.s}px;
`;

interface LibraryDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: LibraryItem;
  onEdit: (item: LibraryItem) => void;
  onDelete: (item: LibraryItem) => void;
}

export function LibraryDetailsModal({
  isOpen,
  onClose,
  item,
  onEdit,
  onDelete,
}: LibraryDetailsModalProps) {
  const { t } = useTranslation();

  const handleOpenLink = () => {
    if (item.content_type === "YOUTUBE" && item.video_url) {
      window.open(item.video_url, "_blank");
    } else if (item.file_path) {
      const url = libraryRepository.getFilePublicUrl(item.file_path);
      window.open(url, "_blank");
    }
  };

  const hasLink =
    (item.content_type === "YOUTUBE" && item.video_url) || item.file_path;

  const linkLabel =
    item.content_type === "YOUTUBE"
      ? t("library_details_open_link")
      : t("library_details_download");

  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWidth="400px">
      <Container>
        <Title>{t("library_details_title")}</Title>
        <DetailsList>
          <DetailItem>
            <DetailLabel>{t("library_table_header_title")}</DetailLabel>
            <DetailValue>{item.title}</DetailValue>
          </DetailItem>
          <DetailItem>
            <DetailLabel>{t("library_details_type")}</DetailLabel>
            <DetailValue>
              {t(`library_form_type_${item.content_type.toLowerCase()}`)}
            </DetailValue>
          </DetailItem>
          <DetailItem>
            <DetailLabel>{t("library_details_updated")}</DetailLabel>
            <DetailValue>{formatDate(item.updated_at)}</DetailValue>
          </DetailItem>
          {item.description && (
            <DetailItem>
              <DetailLabel>{t("library_details_description")}</DetailLabel>
              <DetailValue>{item.description}</DetailValue>
            </DetailItem>
          )}
          {hasLink && (
            <Button
              label={linkLabel}
              onClick={handleOpenLink}
              variant="secondary"
              icon={<IoOpenOutline />}
              size="small"
            />
          )}
        </DetailsList>
        <Actions>
          <Button
            label={t("churches_details_edit_button")}
            onClick={() => onEdit(item)}
            icon={<IoPencil />}
            variant="secondary"
          />
          <Button
            label={t("churches_details_delete_button")}
            onClick={() => onDelete(item)}
            icon={<IoTrashOutline />}
            variant="destructive"
          />
        </Actions>
      </Container>
    </Modal>
  );
}
