import type { ButtonHTMLAttributes, ReactNode } from "react";
import styled from "@emotion/styled";
import type { Theme } from "@/core/lib/theme";

type Variant = "primary" | "secondary" | "destructive";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  loading?: boolean;
  variant?: Variant;
  icon?: ReactNode;
}

const getVariantStyles = (
  theme: Theme,
  variant: Variant,
  disabled?: boolean
) => {
  if (disabled) {
    return `
      background-color: ${theme.colors.buttonDisabledBackground};
      color: ${theme.colors.buttonDisabledForeground};
      border-color: transparent;
      box-shadow: none;
      elevation: 0;
    `;
  }
  switch (variant) {
    case "secondary":
      return `
        background-color: ${theme.colors.buttonSecondaryBackground};
        color: ${theme.colors.buttonSecondaryForeground};
        border-color: ${theme.colors.buttonSecondaryBorder};
        box-shadow: none;
        elevation: 0;
      `;
    case "destructive":
      return `
        background-color: ${theme.colors.destructiveBackground};
        color: ${theme.colors.destructiveForeground};
        border-color: transparent;
        elevation: 0;
        box-shadow: none;
      `;
    default:
      return `
        background-color: ${theme.colors.buttonPrimaryBackground};
        color: ${theme.colors.buttonPrimaryForeground};
        border-color: transparent;
        elevation: 4;
        box-shadow: 0 4px 8px ${theme.colors.shadowColor}33;
      `;
  }
};

const StyledButton = styled.button<{
  variant: Variant;
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
  font-size: ${props => props.theme.textVariants.buttonLabel.fontSize};
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  padding: 0 ${props => props.theme.spacing.l}px;
  border-width: 1.5px;
  border-style: solid;
  letter-spacing: ${props =>
    props.theme.textVariants.buttonLabel.letterSpacing};

  ${props => getVariantStyles(props.theme, props.variant, props.disabled)}

  &:hover:not(:disabled) {
    opacity: 0.8;
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
  border: 2px solid #fff3;
  border-top-color: currentColor;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  animation: spin 1s linear infinite;
`;

export function Button({
  label,
  loading,
  variant = "primary",
  icon,
  ...props
}: ButtonProps) {
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
}
