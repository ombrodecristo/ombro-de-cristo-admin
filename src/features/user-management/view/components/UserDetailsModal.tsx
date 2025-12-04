import styled from "@emotion/styled";
import type { ProfileWithRelations } from "@/data/repositories/profileRepository";
import { Button, Modal } from "@/shared/components";
import { formatGender, formatRole } from "@/core/lib/formatters";
import { IoPencil } from "react-icons/io5";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.l}px;
  width: 100%;
  max-width: 400px;
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
}));

const Actions = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.s}px;
  margin-top: ${props => props.theme.spacing.s}px;
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
    <Modal isOpen={isOpen} onClose={onClose}>
      <Container>
        <Title>Detalhes do Perfil</Title>
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
