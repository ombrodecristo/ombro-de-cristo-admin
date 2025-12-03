import { useEffect, useState, type FormEvent } from "react";
import styled from "@emotion/styled";
import { ChangePasswordViewModel } from "../../view-models/ChangePasswordViewModel";
import { useViewModel } from "@/shared/hooks/useViewModel";
import { Modal, Button, Input, Label } from "@/shared/components";
import { FiLock } from "react-icons/fi";
import { toast } from "sonner";

const Content = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.m}px;
  width: 340px;
`;

const Title = styled.h2`
  font-size: 22px;
  font-weight: 700;
  text-align: center;
  color: ${props => props.theme.colors.mainForeground};
`;

const Actions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 8px;
`;

interface ChangePasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ChangePasswordModal({
  isOpen,
  onClose,
}: ChangePasswordModalProps) {
  const [viewModel] = useState(() => new ChangePasswordViewModel({ onClose }));
  useViewModel(viewModel);

  useEffect(() => {
    if (viewModel.success) {
      toast.success("Senha alterada com sucesso!");
    }
  }, [viewModel.success]);

  const onFormSubmit = (e: FormEvent) => {
    viewModel.handleSubmit(e);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Content onSubmit={onFormSubmit}>
        <Title>Alterar Senha</Title>

        <div>
          <Label htmlFor="new-password">Nova Senha</Label>
          <Input
            id="new-password"
            placeholder="••••••••"
            value={viewModel.password}
            onChange={e => viewModel.setPassword(e.target.value)}
            required
            disabled={viewModel.loading}
            icon={<FiLock size={20} />}
            isPassword
            error={viewModel.error || ""}
          />
        </div>

        <div>
          <Label htmlFor="confirm-password">Confirmar Nova Senha</Label>
          <Input
            id="confirm-password"
            placeholder="••••••••"
            value={viewModel.confirmPassword}
            onChange={e => viewModel.setConfirmPassword(e.target.value)}
            required
            disabled={viewModel.loading}
            icon={<FiLock size={20} />}
            isPassword
            error={viewModel.error || ""}
          />
        </div>

        <Actions>
          <Button
            type="submit"
            label="Alterar Senha"
            loading={viewModel.loading}
            disabled={viewModel.loading}
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
