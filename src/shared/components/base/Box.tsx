import styled from "@emotion/styled";
import {
  space,
  color,
  layout,
  flexbox,
  border,
  shadow,
  position,
  grid,
  typography,
  compose,
} from "styled-system";
import type {
  SpaceProps,
  ColorProps,
  LayoutProps,
  FlexboxProps,
  BorderProps,
  ShadowProps,
  PositionProps,
  GridProps,
  TypographyProps,
} from "styled-system";
import type { CSSObject } from "@emotion/react";
import type { AllHTMLAttributes, ElementType } from "react";

const styledSystemProps = new Set([
  ...(space.propNames || []),
  ...(color.propNames || []),
  ...(layout.propNames || []),
  ...(flexbox.propNames || []),
  ...(border.propNames || []),
  ...(shadow.propNames || []),
  ...(position.propNames || []),
  ...(grid.propNames || []),
  ...(typography.propNames || []),
]);

const shouldForwardProp = (prop: string) => !styledSystemProps.has(prop);

type BoxStyleSystemProps = SpaceProps &
  ColorProps &
  LayoutProps &
  FlexboxProps &
  BorderProps &
  ShadowProps &
  PositionProps &
  GridProps &
  TypographyProps;

export type BoxProps = BoxStyleSystemProps &
  AllHTMLAttributes<HTMLElement> & {
    as?: ElementType;
    css?: CSSObject;
  };

const boxSystem = compose(
  space,
  color,
  layout,
  flexbox,
  border,
  shadow,
  position,
  grid,
  typography
);

export const Box = styled("div", { shouldForwardProp })<BoxProps>(boxSystem);
