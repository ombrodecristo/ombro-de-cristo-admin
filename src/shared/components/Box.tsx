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
import type { ElementType, HTMLAttributes } from "react";

type StyledSystemProps = SpaceProps &
  LayoutProps &
  ColorProps &
  FlexboxProps &
  BorderProps &
  PositionProps &
  ShadowProps &
  GridProps &
  TypographyProps;

type CustomProps = {
  gap?: SpaceProps["margin"];
  as?: ElementType;
};

export type BoxProps = Omit<
  HTMLAttributes<HTMLDivElement>,
  keyof StyledSystemProps
> &
  StyledSystemProps &
  CustomProps;

export const Box = styled("div")<BoxProps>(
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
