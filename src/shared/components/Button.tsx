import type { ButtonHTMLAttributes, ReactNode } from "react";
import styled from "@emotion/styled";
import { useTheme } from "@emotion/react";
import {
  compose,
  space,
  layout,
  color,
  flexbox,
  border,
  position,
  shadow,
  grid,
  typography,
  system,
} from "styled-system";
import type {
  SpaceProps,
  LayoutProps,
  ColorProps,
  FlexboxProps,
  BorderProps,
  PositionProps,
  ShadowProps,
  GridProps,
  TypographyProps,
} from "styled-system";
import { Text } from "./Text";
import type { Theme } from "@/core/lib/theme";

type StyledSystemProps = SpaceProps &
  LayoutProps &
  ColorProps &
  FlexboxProps &
  BorderProps &
  PositionProps &
  ShadowProps &
  GridProps &
  TypographyProps;

type Variant = "primary" | "secondary" | "destructive";
type Size = "medium" | "small";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  loading?: boolean;
  variant?: Variant;
  size?: Size;
  icon?: ReactNode;
}

type BaseButtonProps = StyledSystemProps & {
  gap?: SpaceProps["margin"];
} & ButtonHTMLAttributes<HTMLButtonElement>;

const BaseButton = styled("button")<BaseButtonProps>(
  compose(
    space,
    layout,
    color,
    flexbox,
    border,
    position,
    shadow,
    grid,
    typography,
    system({
      gap: {
        property: "gap",
        scale: "spacing",
      },
    })
  )
);

const StyledButton = styled(BaseButton)<{ variant: Variant; size: Size }>`
  height: ${props => (props.size === "small" ? "40px" : "56px")};
  cursor: ${props => (props.disabled ? "not-allowed" : "pointer")};
  transition: all 0.2s ease-in-out;
  padding: 0
    ${props => props.theme.spacing[props.size === "small" ? "m" : "l"]}px;
  &:hover {
    ${props => {
      if (props.disabled) return "";
      if (props.variant === "secondary") {
        return `background-color: ${props.theme.colors.mutedBackground};`;
      }

      return `opacity: 0.9;`;
    }}
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
  disabled,
  variant = "primary",
  size = "medium",
  icon,
  ...props
}: ButtonProps) {
  const theme = useTheme() as Theme;
  const isDisabled = disabled || loading;

  const getVariantStyles = () => {
    if (isDisabled) {
      return {
        backgroundColor: "buttonDisabledBackground",
        color: "buttonDisabledForeground",
        borderColor: "transparent",
        boxShadow: "none",
      };
    }
    switch (variant) {
      case "secondary":
        return {
          backgroundColor: "buttonSecondaryBackground",
          color: "buttonSecondaryForeground",
          borderColor: "buttonSecondaryBorder",
          boxShadow: "none",
        };
      case "destructive":
        return {
          backgroundColor: "destructiveBackground",
          color: "destructiveForeground",
          borderColor: "transparent",
          boxShadow: `0 4px 8px ${theme.colors.destructiveBackground}33`,
        };
      default:
        return {
          backgroundColor: "buttonPrimaryBackground",
          color: "buttonPrimaryForeground",
          borderColor: "transparent",
          boxShadow: `0 4px 8px ${theme.colors.primary}33`,
        };
    }
  };

  const styles = getVariantStyles();

  return (
    <StyledButton
      width="100%"
      borderRadius={size === "small" ? "l" : "xl"}
      display="inline-flex"
      alignItems="center"
      justifyContent="center"
      gap="s"
      borderWidth="1.5px"
      borderStyle="solid"
      disabled={isDisabled}
      variant={variant}
      size={size}
      {...styles}
      {...props}
    >
      {loading ? (
        <Spinner />
      ) : (
        <>
          {icon}
          {label && (
            <Text
              as="span"
              variant="buttonLabel"
              color="inherit"
              fontSize={size === "small" ? "14px" : "16px"}
            >
              {label}
            </Text>
          )}
        </>
      )}
    </StyledButton>
  );
}
