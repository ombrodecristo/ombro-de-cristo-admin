import styled from "@emotion/styled";
import type { Church } from "@/core/types/database";
import { Button, Modal } from "@/shared/components";
import { formatDate } from "@/core/lib/formatters";
import { IoPencil, IoTrashOutline } from "react-icons/io5";

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

interface ChurchDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  church: Church;
  onEdit: (church: Church) => void;
  onDelete: (church: Church) => void;
}

export function ChurchDetailsModal({
  isOpen,
  onClose,
  church,
  onEdit,
  onDelete,
}: ChurchDetailsModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Container>
        <Title>Detalhes da Igreja</Title>
        <DetailsList>
          <DetailItem>
            <DetailLabel>Nome</DetailLabel>
            <DetailValue>{church.name}</DetailValue>
          </DetailItem>
          <DetailItem>
            <DetailLabel>Criada em</DetailLabel>
            <DetailValue>{formatDate(church.created_at)}</DetailValue>
          </DetailItem>
          <DetailItem>
            <DetailLabel>Última Modificação</DetailLabel>
            <DetailValue>{formatDate(church.updated_at)}</DetailValue>
          </DetailItem>
        </DetailsList>
        <Actions>
          <Button
            label="Editar"
            onClick={() => onEdit(church)}
            icon={<IoPencil />}
            variant="secondary"
          />
          <Button
            label="Excluir"
            onClick={() => onDelete(church)}
            icon={<IoTrashOutline />}
            variant="destructive"
          />
        </Actions>
      </Container>
    </Modal>
  );
}
