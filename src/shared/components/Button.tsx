import styled from "@emotion/styled";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import type { Theme } from "@/core/lib/theme";

type ButtonVariant = "primary" | "secondary" | "destructive";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  loading?: boolean;
  label: string;
  icon?: ReactNode;
}

const getVariantStyles = (
  theme: Theme,
  variant: ButtonVariant,
  disabled?: boolean
) => {
  if (disabled) {
    return `
      background-color: ${theme.colors.buttonDisabledBackground};
      color: ${theme.colors.buttonDisabledForeground};
      border-color: transparent;
      box-shadow: none;
    `;
  }

  switch (variant) {
    case "secondary":
      return `
        background-color: ${theme.colors.buttonSecondaryBackground};
        color: ${theme.colors.buttonSecondaryForeground};
        border-color: ${theme.colors.buttonSecondaryBorder};
        box-shadow: none;
      `;
    case "destructive":
      return `
        background-color: ${theme.colors.destructiveBackground};
        color: ${theme.colors.destructiveForeground};
        border-color: transparent;
      `;
    case "primary":
    default:
      return `
        background-color: ${theme.colors.buttonPrimaryBackground};
        color: ${theme.colors.buttonPrimaryForeground};
        border-color: transparent;
      `;
  }
};

const StyledButton = styled.button<{
  variant: ButtonVariant;
}>`
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
  padding: 0 ${props => props.theme.spacing.l}px;
  border-width: 1.5px;
  border-style: solid;
  letter-spacing: ${props =>
    props.theme.textVariants.buttonLabel.letterSpacing};
  box-shadow: 0 4px 8px ${props => props.theme.colors.shadowColor}26;

  ${props => getVariantStyles(props.theme, props.variant, props.disabled)}

  &:hover:not(:disabled) {
    opacity: 0.85;
  }

  &:disabled {
    cursor: not-allowed;
  }
`;

const Spinner = styled.div`
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top: 2px solid currentColor;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  animation: spin 1s linear infinite;
`;

export const Button = ({
  label,
  loading = false,
  variant = "primary",
  icon,
  ...props
}: ButtonProps) => {
  return (
    <StyledButton
      variant={variant}
      disabled={loading || props.disabled}
      {...props}
    >
      {loading ? (
        <Spinner />
      ) : (
        <>
          {icon}
          <span>{label}</span>
        </>
      )}
    </StyledButton>
  );
};
