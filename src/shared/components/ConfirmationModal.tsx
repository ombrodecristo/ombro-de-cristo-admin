import styled from "@emotion/styled";
import type { ReactNode } from "react";
import { Modal } from "./Modal";
import { Button } from "./Button";
import { IoAlertCircleOutline } from "react-icons/io5";

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: ${props => props.theme.spacing.m}px;
  width: 100%;
`;

const IconWrapper = styled.div<{ variant: "primary" | "destructive" }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: ${props =>
    props.variant === "destructive"
      ? props.theme.colors.destructiveTransparentBackground
      : props.theme.colors.mutedBackground};
  color: ${props =>
    props.variant === "destructive"
      ? props.theme.colors.destructiveBackground
      : props.theme.colors.mutedForeground};
  margin-bottom: ${props => props.theme.spacing.xs}px;

  svg {
    width: 28px;
    height: 28px;
  }
`;

const Title = styled.h2(props => ({
  ...props.theme.textVariants.subHeader,
  fontSize: "20px",
  color: props.theme.colors.mainForeground,
}));

const Message = styled.p(props => ({
  ...props.theme.textVariants.body,
  color: props.theme.colors.mutedForeground,
  lineHeight: 1.6,
}));

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
    <Modal isOpen={isOpen} onClose={onClose} maxWidth="400px">
      <Content>
        <IconWrapper variant={variant}>
          <IoAlertCircleOutline />
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
