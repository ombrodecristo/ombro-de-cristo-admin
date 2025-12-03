import styled from "@emotion/styled";
import type { ReactNode } from "react";
import { Modal } from "./Modal";
import { Button } from "./Button";
import { FiAlertTriangle } from "react-icons/fi";

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: ${props => props.theme.spacing.m}px;
  width: 100%;
  max-width: 380px;
`;

const IconWrapper = styled.div<{ variant: "primary" | "destructive" }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: ${props =>
    props.variant === "destructive"
      ? props.theme.colors.destructiveTransparentBackground
      : props.theme.colors.mutedBackground};
  color: ${props =>
    props.variant === "destructive"
      ? props.theme.colors.destructiveBackground
      : props.theme.colors.mutedForeground};
`;

const Title = styled.h2`
  font-size: 22px;
  font-weight: 700;
  color: ${props => props.theme.colors.mainForeground};
`;

const Message = styled.p`
  font-size: 16px;
  color: ${props => props.theme.colors.mutedForeground};
  line-height: 1.6;
`;

const Actions = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.s}px;
  width: 100%;
  margin-top: ${props => props.theme.spacing.s}px;
`;

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: ReactNode;
  confirmText?: string;
  cancelText?: string;
  loading?: boolean;
  variant?: "primary" | "destructive";
}

export function ConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = "Confirmar",
  cancelText = "Cancelar",
  loading = false,
  variant = "primary",
}: ConfirmationModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Content>
        <IconWrapper variant={variant}>
          <FiAlertTriangle size={28} />
        </IconWrapper>
        <Title>{title}</Title>
        <Message>{message}</Message>
        <Actions>
          <Button
            label={confirmText}
            onClick={onConfirm}
            loading={loading}
            variant={variant === "destructive" ? "destructive" : "primary"}
          />
          <Button
            label={cancelText}
            onClick={onClose}
            disabled={loading}
            variant="secondary"
          />
        </Actions>
      </Content>
    </Modal>
  );
}
