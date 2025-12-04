import styled from "@emotion/styled";
import {
  compose,
  typography,
  space,
  color,
  variant,
  layout,
} from "styled-system";
import type {
  TypographyProps,
  SpaceProps,
  ColorProps,
  LayoutProps,
} from "styled-system";
import type { Theme } from "@/core/lib/theme";
import type { ElementType, HTMLAttributes, ReactNode } from "react";

const textSystem = compose(
  typography,
  space,
  color,
  layout,
  variant({
    key: "textVariants",
    prop: "variant",
  })
);

const systemPropNames = new Set([
  ...(typography.propNames ?? []),
  ...(space.propNames ?? []),
  ...(color.propNames ?? []),
  ...(layout.propNames ?? []),
  "variant",
]);

const shouldForwardProp = (prop: string) =>
  !systemPropNames.has(prop) && prop !== "color";

type SafeColorProps = Omit<ColorProps, "color"> & {
  color?: keyof Theme["colors"];
};

type TextVariantProps = {
  variant?: keyof Theme["textVariants"];
};

export type TextProps = Omit<HTMLAttributes<HTMLParagraphElement>, "color"> &
  TypographyProps &
  SpaceProps &
  LayoutProps &
  SafeColorProps &
  TextVariantProps & {
    children?: ReactNode;
    as?: ElementType;
  };

const StyledText = styled("p", { shouldForwardProp })<TextProps>(textSystem);

export const Text = ({ variant = "defaults", ...props }: TextProps) => {
  return <StyledText variant={variant} {...props} />;
};
