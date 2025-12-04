import styled from "@emotion/styled";
import { variant } from "styled-system";
import { Box, type BoxProps } from "./Box";
import type { Theme } from "@/core/lib/theme";

export type TextProps = BoxProps & {
  variant?: keyof Theme["textVariants"];
};

export const Text = styled(Box.withComponent("p"))<TextProps>(
  props => ({
    ...props.theme.textVariants.defaults,
    margin: 0,
  }),
  variant({
    scale: "textVariants",
    prop: "variant",
  })
);
