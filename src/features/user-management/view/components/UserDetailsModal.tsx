import styled from "@emotion/styled";
import type { ProfileWithRelations } from "@/data/repositories/profileRepository";
import { Button, Modal } from "@/shared/components";
import { formatGender, formatRole } from "@/core/lib/formatters";
import { IoPencil } from "react-icons/io5";

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
  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWidth="512px">
      <Container>
        <Title>Detalhes do Perfil</Title>
        <ScrollableContent>
          <DetailsList>
            <DetailItem>
              <DetailLabel>Nome</DetailLabel>
              <DetailValue>{profile.full_name}</DetailValue>
            </DetailItem>
            <DetailItem>
              <DetailLabel>Permissão</DetailLabel>
              <DetailValue>
                {formatRole(profile.role, profile.gender)}
              </DetailValue>
            </DetailItem>
            <DetailItem>
              <DetailLabel>Gênero</DetailLabel>
              <DetailValue>{formatGender(profile.gender)}</DetailValue>
            </DetailItem>
            <DetailItem>
              <DetailLabel>Igreja</DetailLabel>
              <DetailValue>{profile.churches?.name ?? "N/A"}</DetailValue>
            </DetailItem>
            <DetailItem>
              <DetailLabel>Mentoria</DetailLabel>
              <DetailValue>{profile.mentor?.full_name ?? "N/A"}</DetailValue>
            </DetailItem>
          </DetailsList>
        </ScrollableContent>
        <Actions>
          <Button
            label="Editar"
            onClick={() => onEdit(profile)}
            icon={<IoPencil />}
            variant="secondary"
          />
        </Actions>
      </Container>
    </Modal>
  );
}
