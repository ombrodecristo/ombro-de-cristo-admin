import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";
import type { ReactNode } from "react";

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const slideIn = keyframes`
  from {
    transform: scale(0.95);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
`;

const Overlay = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: ${props => (props.isOpen ? 1 : 0)};
  visibility: ${props => (props.isOpen ? "visible" : "hidden")};
  transition:
    opacity 0.3s ease,
    visibility 0.3s ease;
  animation: ${fadeIn} 0.3s ease forwards;
  padding: ${props => props.theme.spacing.m}px;
`;

const ModalContainer = styled.div<{
  isOpen: boolean;
  maxWidth?: string;
}>`
  background-color: ${props => props.theme.colors.cardBackground};
  border-radius: ${props => props.theme.radii.xl}px;
  padding: ${props => props.theme.spacing.l}px;
  width: 100%;
  max-width: ${props => props.maxWidth || "512px"};
  max-height: calc(100vh - ${props => props.theme.spacing.l * 2}px);
  display: flex;
  flex-direction: column;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  transform: ${props => (props.isOpen ? "scale(1)" : "scale(0.95)")};
  opacity: ${props => (props.isOpen ? 1 : 0)};
  transition:
    transform 0.3s ease,
    opacity 0.3s ease;
  animation: ${slideIn} 0.3s ease-out forwards;
`;

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  maxWidth?: string;
}

export function Modal({ isOpen, onClose, children, maxWidth }: ModalProps) {
  if (!isOpen) return null;

  const handleContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  return (
    <Overlay isOpen={isOpen} onClick={onClose}>
      <ModalContainer
        isOpen={isOpen}
        onClick={handleContainerClick}
        maxWidth={maxWidth}
      >
        {children}
      </ModalContainer>
    </Overlay>
  );
}
