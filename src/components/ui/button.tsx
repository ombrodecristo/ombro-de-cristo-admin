import styled from "@emotion/styled";
import type { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonStyleProps {
  variant?: "primary" | "secondary" | "destructive";
}

const StyledButton = styled.button<ButtonStyleProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${props => props.theme.spacing.s}px;
  height: 56px;
  width: 100%;
  border-radius: ${props => props.theme.borderRadii.l}px;
  font-family: ${props => props.theme.textVariants.buttonLabel.fontFamily};
  font-weight: ${props => props.theme.textVariants.buttonLabel.fontWeight};
  font-size: ${props => props.theme.textVariants.buttonLabel.fontSize}px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  border: 1.5px solid transparent;
  padding: 0 ${props => props.theme.spacing.l}px;

  ${props => {
    switch (props.variant) {
      case "secondary":
        return `
          background-color: ${props.theme.colors.buttonSecondaryBackground};
          color: ${props.theme.colors.buttonSecondaryForeground};
          border-color: ${props.theme.colors.buttonSecondaryBorder};
          &:hover:not(:disabled) {
            background-color: ${props.theme.colors.mutedBackground};
          }
        `;
      case "destructive":
        return `
          background-color: ${props.theme.colors.destructiveBackground};
          color: ${props.theme.colors.destructiveForeground};
          &:hover:not(:disabled) {
            opacity: 0.9;
          }
        `;
      default:
        return `
          background-color: ${props.theme.colors.buttonPrimaryBackground};
          color: ${props.theme.colors.buttonPrimaryForeground};
          &:hover:not(:disabled) {
            opacity: 0.9;
          }
        `;
    }
  }}

  &:disabled {
    background-color: ${props => props.theme.colors.buttonDisabledBackground};
    color: ${props => props.theme.colors.buttonDisabledForeground};
    border-color: transparent;
    cursor: not-allowed;
  }
`;

const SpinnerContainer = styled.div`
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top: 2px solid white;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  animation: spin 1s linear infinite;
`;

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "destructive";
  loading?: boolean;
  label: string;
  icon?: ReactNode;
}

export const Button = ({
  label,
  loading = false,
  disabled = false,
  icon,
  ...props
}: ButtonProps) => {
  return (
    <StyledButton disabled={loading || disabled} {...props}>
      {loading ? (
        <SpinnerContainer />
      ) : (
        <>
          {icon}
          <span>{label}</span>
        </>
      )}
    </StyledButton>
  );
};
