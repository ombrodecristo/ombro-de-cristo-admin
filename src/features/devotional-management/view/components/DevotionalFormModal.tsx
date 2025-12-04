import { useState, type FormEvent } from "react";
import styled from "@emotion/styled";
import { DevotionalFormViewModel } from "../../view-models/DevotionalFormViewModel";
import { useViewModel } from "@/shared/hooks/useViewModel";
import { Modal, Button, Input, Textarea, Label } from "@/shared/components";
import type { DevotionalWithAuthor } from "@/data/repositories/devotionalRepository";
import { IoSaveOutline } from "react-icons/io5";

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 500px;
  max-height: 80vh;
`;

const Title = styled.h2(props => ({
  ...props.theme.textVariants.subHeader,
  fontSize: "22px",
  color: props.theme.colors.mainForeground,
  textAlign: "center",
  paddingBottom: props.theme.spacing.m,
  flexShrink: 0,
}));

const ScrollableContent = styled.div(props => ({
  overflowY: "auto",
  flexGrow: 1,
  display: "flex",
  flexDirection: "column",
  gap: props.theme.spacing.m,
  padding: `4px ${props.theme.spacing.s}px 4px 4px`,
  marginRight: -props.theme.spacing.s,
}));

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
  const [viewModel] = useState(
    () =>
      new DevotionalFormViewModel({
        devotionalToEdit,
        onClose,
        onSuccess,
        authorId,
      })
  );

  useViewModel(viewModel);

  const onFormSubmit = (e: FormEvent) => {
    viewModel.handleSubmit(e);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <FormContainer onSubmit={onFormSubmit}>
        <Title>
          {viewModel.isEditing ? "Editar Devocional" : "Novo Devocional"}
        </Title>
        <ScrollableContent>
          <div>
            <Label htmlFor="title">Título</Label>
            <Input
              id="title"
              value={viewModel.title}
              onChange={e => viewModel.setTitle(e.target.value)}
              disabled={viewModel.loading}
              required
              error={viewModel.error || ""}
              placeholder="Ex: Fortaleça-se no Senhor"
            />
          </div>
          <div>
            <Label htmlFor="content">Conteúdo</Label>
            <Textarea
              id="content"
              value={viewModel.content}
              onChange={e => viewModel.setContent(e.target.value)}
              disabled={viewModel.loading}
              required
              placeholder="Comece a escrever a reflexão aqui..."
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
        </ScrollableContent>
      </FormContainer>
    </Modal>
  );
}
