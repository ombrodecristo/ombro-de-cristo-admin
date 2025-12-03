import { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { useDevotionalFormViewModel } from "./useDevotionalFormViewModel";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Label } from "@/components/ui/Label";
import type { DevotionalWithAuthor } from "@/services/devotionalService";

const Content = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.m}px;
  width: 500px;
`;

const Title = styled.h2`
  font-size: 22px;
  font-weight: 700;
  text-align: center;
`;

const ErrorMessage = styled.p`
  font-size: 14px;
  color: ${props => props.theme.colors.destructiveBackground};
`;

const Actions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 8px;
`;

interface DevotionalFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  authorId: string;
  devotionalToEdit: DevotionalWithAuthor | null;
}

export default function DevotionalFormModal({
  isOpen,
  onClose,
  onSuccess,
  authorId,
  devotionalToEdit,
}: DevotionalFormModalProps) {
  const [localError, setLocalError] = useState<string | null>(null);
  const {
    title,
    setTitle,
    content,
    setContent,
    loading,
    error,
    isEditing,
    handleSubmit,
  } = useDevotionalFormViewModel({
    devotionalToEdit,
    onClose,
    onSuccess,
    authorId,
  });

  useEffect(() => {
    setLocalError(error);
  }, [error]);

  useEffect(() => {
    if (title || content) setLocalError(null);
  }, [title, content]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Content onSubmit={handleSubmit}>
        <Title>{isEditing ? "Editar Devocional" : "Novo Devocional"}</Title>
        <div>
          <Label htmlFor="title">Título</Label>
          <Input
            id="title"
            value={title}
            onChange={e => setTitle(e.target.value)}
            disabled={loading}
            required
          />
        </div>
        <div>
          <Label htmlFor="content">Conteúdo</Label>
          <Textarea
            id="content"
            value={content}
            onChange={e => setContent(e.target.value)}
            disabled={loading}
            required
          />
        </div>
        {localError && <ErrorMessage>{localError}</ErrorMessage>}
        <Actions>
          <Button type="submit" label="Salvar" loading={loading} />
          <Button
            type="button"
            label="Cancelar"
            variant="secondary"
            onClick={onClose}
            disabled={loading}
          />
        </Actions>
      </Content>
    </Modal>
  );
}
