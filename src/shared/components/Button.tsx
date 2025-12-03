import type { ButtonHTMLAttributes, ReactNode } from "react";
import styled from "@emotion/styled";
import type { Theme } from "@/core/lib/theme";

type Variant = "primary" | "secondary" | "destructive";
type Size = "medium" | "small";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  loading?: boolean;
  variant?: Variant;
  size?: Size;
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
      cursor: not-allowed;
    `;
  }
  switch (variant) {
    case "secondary":
      return `
        background-color: ${theme.colors.buttonSecondaryBackground};
        color: ${theme.colors.buttonSecondaryForeground};
        border-color: ${theme.colors.buttonSecondaryBorder};
        box-shadow: none;
        
        &:hover {
            background-color: ${theme.colors.mutedBackground};
        }
      `;
    case "destructive":
      return `
        background-color: ${theme.colors.destructiveBackground};
        color: ${theme.colors.destructiveForeground};
        border-color: transparent;
        box-shadow: 0 4px 8px ${theme.colors.destructiveBackground}33;

        &:hover {
            opacity: 0.9;
        }
      `;
    default:
      return `
        background-color: ${theme.colors.buttonPrimaryBackground};
        color: ${theme.colors.buttonPrimaryForeground};
        border-color: transparent;
        box-shadow: 0 4px 8px ${theme.colors.primary}33;

        &:hover {
            opacity: 0.9;
        }
      `;
  }
};

const StyledButton = styled.button<{
  variant: Variant;
  size: Size;
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${props => props.theme.spacing.s}px;
  height: ${props => (props.size === "small" ? "40px" : "56px")};
  width: 100%;
  border-radius: ${props =>
    props.size === "small"
      ? props.theme.borderRadii.m
      : props.theme.borderRadii.l}px;
  font-family: ${props => props.theme.textVariants.buttonLabel.fontFamily};
  font-weight: ${props => props.theme.textVariants.buttonLabel.fontWeight};
  font-size: ${props =>
    props.size === "small"
      ? "14px"
      : props.theme.textVariants.buttonLabel.fontSize};
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  padding: 0
    ${props =>
      props.size === "small" ? props.theme.spacing.m : props.theme.spacing.l}px;
  border-width: 1.5px;
  border-style: solid;
  letter-spacing: ${props =>
    props.theme.textVariants.buttonLabel.letterSpacing};

  ${props => getVariantStyles(props.theme, props.variant, props.disabled)}

  &:disabled {
    ${props => getVariantStyles(props.theme, props.variant, true)}
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
  size = "medium",
  icon,
  ...props
}: ButtonProps) {
  return (
    <StyledButton
      variant={variant}
      size={size}
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
