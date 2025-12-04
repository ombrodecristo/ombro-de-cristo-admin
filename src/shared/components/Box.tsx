import styled from "@emotion/styled";
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
  system,
  typography,
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

const gapSystem = system({
  gap: {
    property: "gap",
    scale: "space",
  },
});

const boxSystem = compose(
  space,
  layout,
  color,
  flexbox,
  border,
  position,
  shadow,
  grid,
  gapSystem,
  typography
);

const systemPropNames = new Set([
  ...(space.propNames ?? []),
  ...(layout.propNames ?? []),
  ...(color.propNames ?? []),
  ...(flexbox.propNames ?? []),
  ...(border.propNames ?? []),
  ...(position.propNames ?? []),
  ...(shadow.propNames ?? []),
  ...(grid.propNames ?? []),
  ...(typography.propNames ?? []),
  "gap",
]);

const shouldForwardProp = (prop: string) => !systemPropNames.has(prop);

export type BoxProps = SpaceProps &
  LayoutProps &
  ColorProps &
  FlexboxProps &
  BorderProps &
  PositionProps &
  ShadowProps &
  GridProps &
  TypographyProps & {
    gap?: SpaceProps["margin"];
    as?: React.ElementType;
    children?: React.ReactNode;
    className?: string;
  };

export const Box = styled("div", { shouldForwardProp })<BoxProps>(boxSystem);
