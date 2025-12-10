import styled from "@emotion/styled";
import type { DevotionalWithAuthor } from "@/data/repositories/devotionalRepository";
import { Button, Modal } from "@/shared/components";
import { formatDate } from "@/core/lib/formatters";
import { IoPencil, IoTrashOutline } from "react-icons/io5";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.l}px;
  width: 100%;
  max-width: 512px;
  max-height: 80vh;
`;

const Title = styled.h2(props => ({
  ...props.theme.textVariants.subHeader,
  fontSize: "22px",
  color: props.theme.colors.mainForeground,
  textAlign: "center",
  flexShrink: 0,
}));

const ScrollableContent = styled.div`
  overflow-y: auto;
  flex-grow: 1;
  padding-right: ${props => props.theme.spacing.s}px;
  margin-right: -${props => props.theme.spacing.m}px;
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
  margin-top: ${props => props.theme.spacing.l}px;
  flex-shrink: 0;
`;

interface DevotionalDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  devotional: DevotionalWithAuthor;
  onEdit: (devotional: DevotionalWithAuthor) => void;
  onDelete: (devotional: DevotionalWithAuthor) => void;
}

export function DevotionalDetailsModal({
  isOpen,
  onClose,
  devotional,
  onEdit,
  onDelete,
}: DevotionalDetailsModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Container>
        <Title>Detalhes do Devocional</Title>
        <ScrollableContent>
          <DetailsList>
            <DetailItem>
              <DetailLabel>Título</DetailLabel>
              <DetailValue>{devotional.title}</DetailValue>
            </DetailItem>
            <DetailItem>
              <DetailLabel>Autoria</DetailLabel>
              <DetailValue>{devotional.author?.full_name ?? "N/A"}</DetailValue>
            </DetailItem>
            <DetailItem>
              <DetailLabel>Última Modificação</DetailLabel>
              <DetailValue>{formatDate(devotional.updated_at)}</DetailValue>
            </DetailItem>
            <DetailItem>
              <DetailLabel>Conteúdo</DetailLabel>
              <DetailValue>{devotional.content}</DetailValue>
            </DetailItem>
          </DetailsList>
        </ScrollableContent>
        <Actions>
          <Button
            label="Editar"
            onClick={() => onEdit(devotional)}
            icon={<IoPencil />}
            variant="secondary"
          />
          <Button
            label="Excluir"
            onClick={() => onDelete(devotional)}
            icon={<IoTrashOutline />}
            variant="destructive"
          />
        </Actions>
      </Container>
    </Modal>
  );
}
