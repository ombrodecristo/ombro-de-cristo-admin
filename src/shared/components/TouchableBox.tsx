import styled from "@emotion/styled";
import { Box } from "./Box";
import type { BoxProps } from "./Box";

export const TouchableBox = styled(Box.withComponent("button"))<BoxProps>`
  background: none;
  border: none;
  padding: 0;
  margin: 0;
  cursor: pointer;
  text-align: inherit;
  font: inherit;
  color: inherit;

  &:disabled {
    cursor: not-allowed;
  }
`;
