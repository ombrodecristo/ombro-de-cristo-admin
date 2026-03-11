import { useState } from "react";
import styled from "@emotion/styled";
import type { DevotionalWithTranslations } from "@/data/repositories/devotionalRepository";
import { Button, Modal } from "@/shared/components";
import { formatDate } from "@/core/lib/formatters";
import { IoPencil, IoTrashOutline } from "react-icons/io5";
import { useTranslation } from "react-i18next";

const Container = styled.div`
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

const ScrollableContent = styled.div`
  flex: 1;
  overflow-y: auto;
  min-height: 0;
  padding-right: ${props => props.theme.spacing.sm}px;

  &::-webkit-scrollbar {
    width: 10px;
  }
  &::-webkit-scrollbar-track {
    background: ${props => props.theme.colors.mutedBackground};
    border-radius: ${props => props.theme.radii.round}px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: ${props => props.theme.colors.mutedForeground};
    border-radius: ${props => props.theme.radii.round}px;
  }
  &::-webkit-scrollbar-thumb:hover {
    background-color: ${props => props.theme.colors.primary};
  }
`;

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
  whiteSpace: "pre-wrap",
  wordBreak: "break-word",
}));

const Actions = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.s}px;
  padding-top: ${props => props.theme.spacing.l}px;
  flex-shrink: 0;
`;

const TabsContainer = styled.div`
  display: flex;
  border-bottom: 1px solid ${props => props.theme.colors.border};
  margin-bottom: ${props => props.theme.spacing.m}px;
`;

const TabButton = styled.button<{ isActive: boolean }>`
  padding: 10px 16px;
  cursor: pointer;
  border: none;
  background-color: transparent;
  border-bottom: 2px solid
    ${props => (props.isActive ? props.theme.colors.primary : "transparent")};
  color: ${props =>
    props.isActive
      ? props.theme.colors.primary
      : props.theme.colors.mutedForeground};
  font-weight: 600;
`;

interface DevotionalDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  devotional: DevotionalWithTranslations;
  onEdit: (devotional: DevotionalWithTranslations) => void;
  onDelete: (devotional: DevotionalWithTranslations) => void;
}

export function DevotionalDetailsModal({
  isOpen,
  onClose,
  devotional,
  onEdit,
  onDelete,
}: DevotionalDetailsModalProps) {
  const { t } = useTranslation();
  const languages = ["pt", "en", "es"];
  const [activeTab, setActiveTab] = useState(devotional.original_language);

  const activeTranslation =
    devotional.translations.find(tr => tr.language_code === activeTab) ||
    devotional.translations.find(tr => tr.is_original);

  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWidth="800px">
      <Container>
        <Title>{t("devotionals_details_title")}</Title>
        <ScrollableContent>
          <DetailsList>
            <DetailItem>
              <DetailLabel>{t("devotionals_details_author_label")}</DetailLabel>
              <DetailValue>
                {devotional.author?.full_name ?? t("common_undefined")}
              </DetailValue>
            </DetailItem>
            <DetailItem>
              <DetailLabel>
                {t("devotionals_details_modified_label")}
              </DetailLabel>
              <DetailValue>{formatDate(devotional.updated_at)}</DetailValue>
            </DetailItem>
            <TabsContainer>
              {languages.map(lang => (
                <TabButton
                  key={lang}
                  isActive={activeTab === lang}
                  onClick={() => setActiveTab(lang)}
                >
                  {t(`profile_language_${lang}`)}
                </TabButton>
              ))}
            </TabsContainer>
            <DetailItem>
              <DetailLabel>{t("devotionals_details_title_label")}</DetailLabel>
              <DetailValue>{activeTranslation?.title}</DetailValue>
            </DetailItem>
            <DetailItem>
              <DetailLabel>
                {t("devotionals_details_content_label")}
              </DetailLabel>
              <DetailValue>{activeTranslation?.content}</DetailValue>
            </DetailItem>
          </DetailsList>
        </ScrollableContent>
        <Actions>
          <Button
            label={t("churches_details_edit_button")}
            onClick={() => onEdit(devotional)}
            icon={<IoPencil />}
            variant="secondary"
          />
          <Button
            label={t("churches_details_delete_button")}
            onClick={() => onDelete(devotional)}
            icon={<IoTrashOutline />}
            variant="destructive"
          />
        </Actions>
      </Container>
    </Modal>
  );
}
