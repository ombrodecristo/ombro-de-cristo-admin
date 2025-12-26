import styled from "@emotion/styled";
import type { ProfileWithRelations } from "@/data/repositories/profileRepository";
import { Button, Modal } from "@/shared/components";
import { formatGender, formatRole } from "@/core/lib/formatters";
import { IoPencil } from "react-icons/io5";
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
  scrollbar-width: auto;
  scrollbar-color: ${props => props.theme.colors.mutedForeground}
    ${props => props.theme.colors.mutedBackground};
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
}));

const Actions = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.s}px;
  padding-top: ${props => props.theme.spacing.l}px;
  flex-shrink: 0;
`;

interface UserDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: ProfileWithRelations;
  onEdit: (profile: ProfileWithRelations) => void;
}

export function UserDetailsModal({
  isOpen,
  onClose,
  profile,
  onEdit,
}: UserDetailsModalProps) {
  const { t } = useTranslation();

  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWidth="512px">
      <Container>
        <Title>{t("users_details_title")}</Title>
        <ScrollableContent>
          <DetailsList>
            <DetailItem>
              <DetailLabel>{t("users_edit_name_label")}</DetailLabel>
              <DetailValue>{profile.full_name}</DetailValue>
            </DetailItem>
            <DetailItem>
              <DetailLabel>{t("users_edit_role_label")}</DetailLabel>
              <DetailValue>{formatRole(profile.role)}</DetailValue>
            </DetailItem>
            <DetailItem>
              <DetailLabel>{t("users_edit_gender_label")}</DetailLabel>
              <DetailValue>{formatGender(profile.gender)}</DetailValue>
            </DetailItem>
            <DetailItem>
              <DetailLabel>{t("users_edit_church_label")}</DetailLabel>
              <DetailValue>
                {profile.churches?.name ?? t("common_undefined")}
              </DetailValue>
            </DetailItem>
            <DetailItem>
              <DetailLabel>{t("users_edit_mentor_label")}</DetailLabel>
              <DetailValue>
                {profile.mentor?.full_name ?? t("common_undefined")}
              </DetailValue>
            </DetailItem>
          </DetailsList>
        </ScrollableContent>
        <Actions>
          <Button
            label={t("users_edit_button")}
            onClick={() => onEdit(profile)}
            icon={<IoPencil />}
            variant="secondary"
          />
        </Actions>
      </Container>
    </Modal>
  );
}
