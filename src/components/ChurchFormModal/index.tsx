import { useEffect, useState, type FormEvent } from "react";
import styled from "@emotion/styled";
import { useChurchFormViewModel } from "./useChurchFormViewModel";
import { Modal, Button, Input, Label } from "@/shared/components";
import { type Church } from "@/types/database";

const Content = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.m}px;
  width: 380px;
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

interface ChurchFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  churchToEdit: Church | null;
}

export default function ChurchFormModal({
  isOpen,
  onClose,
  onSuccess,
  churchToEdit,
}: ChurchFormModalProps) {
  const [localError, setLocalError] = useState<string | null>(null);
  const { name, setName, loading, error, isEditing, handleSubmit } =
    useChurchFormViewModel({ churchToEdit, onClose, onSuccess });

  useEffect(() => {
    setLocalError(error);
  }, [error]);

  useEffect(() => {
    if (name) setLocalError(null);
  }, [name]);

  const onFormSubmit = (e: FormEvent) => {
    handleSubmit(e);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Content onSubmit={onFormSubmit}>
        <Title>{isEditing ? "Editar Igreja" : "Nova Igreja"}</Title>
        <div>
          <Label htmlFor="name">Nome da igreja</Label>
          <Input
            id="name"
            value={name}
            onChange={e => setName(e.target.value)}
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
