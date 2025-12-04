import { useState, type FormEvent } from "react";
import styled from "@emotion/styled";
import { ChurchFormViewModel } from "../../view-models/ChurchFormViewModel";
import { useViewModel } from "@/shared/hooks/useViewModel";
import { Modal, Button, Input, Label } from "@/shared/components";
import type { Church } from "@/core/types/database";
import { IoSaveOutline } from "react-icons/io5";

const Content = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.m}px;
  width: 380px;
`;

const Title = styled.h2(props => ({
  ...props.theme.textVariants.subHeader,
  fontSize: "22px",
  color: props.theme.colors.mainForeground,
  textAlign: "center",
}));

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
  const [viewModel] = useState(
    () => new ChurchFormViewModel({ churchToEdit, onClose, onSuccess })
  );

  useViewModel(viewModel);

  const onFormSubmit = (e: FormEvent) => {
    viewModel.handleSubmit(e);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Content onSubmit={onFormSubmit}>
        <Title>{viewModel.isEditing ? "Editar Igreja" : "Nova Igreja"}</Title>
        <div>
          <Label htmlFor="name">Nome da igreja</Label>
          <Input
            id="name"
            value={viewModel.name}
            onChange={e => viewModel.setName(e.target.value)}
            disabled={viewModel.loading}
            required
            error={viewModel.error || ""}
            placeholder="Ex: Igreja Batista da Aliança"
          />
        </div>
        <Actions>
          <Button
            type="submit"
            label="Salvar"
            loading={viewModel.loading}
            icon={<IoSaveOutline size={20} />}
          />
          <Button
            type="button"
            label="Cancelar"
            variant="secondary"
            onClick={onClose}
            disabled={viewModel.loading}
          />
        </Actions>
      </Content>
    </Modal>
  );
}
