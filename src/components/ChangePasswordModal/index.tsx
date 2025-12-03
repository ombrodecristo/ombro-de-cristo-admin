import { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { useChangePasswordViewModel } from "./useChangePasswordViewModel";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { PasswordInput } from "@/components/ui/PasswordInput";
import { Label } from "@/components/ui/Label";
import { FiLock, FiEye, FiEyeOff } from "react-icons/fi";
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

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
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

interface ChangePasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ChangePasswordModal({
  isOpen,
  onClose,
}: ChangePasswordModalProps) {
  const [localError, setLocalError] = useState<string | null>(null);

  const {
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    loading,
    error,
    success,
    handleSubmit,
  } = useChangePasswordViewModel({
    onClose: () => {
      onClose();
    },
  });

  useEffect(() => {
    if (success) {
      toast.success("Senha alterada com sucesso!");
    }
  }, [success]);

  useEffect(() => {
    setLocalError(error);
  }, [error]);

  useEffect(() => {
    if (password || confirmPassword) {
      setLocalError(null);
    }
  }, [password, confirmPassword]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Content onSubmit={handleSubmit}>
        <Title>Alterar Senha</Title>

        <FormGroup>
          <Label htmlFor="new-password">Nova Senha</Label>
          <PasswordInput
            id="new-password"
            placeholder="••••••••"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            disabled={loading}
            icon={<FiLock size={20} />}
            toggleIconShow={<FiEye size={20} />}
            toggleIconHide={<FiEyeOff size={20} />}
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="confirm-password">Confirmar Nova Senha</Label>
          <PasswordInput
            id="confirm-password"
            placeholder="••••••••"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            required
            disabled={loading}
            icon={<FiLock size={20} />}
            toggleIconShow={<FiEye size={20} />}
            toggleIconHide={<FiEyeOff size={20} />}
          />
        </FormGroup>

        {localError && <ErrorMessage>{localError}</ErrorMessage>}

        <Actions>
          <Button
            type="submit"
            label="Alterar Senha"
            loading={loading}
            disabled={loading}
          />
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
