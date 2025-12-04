import styled from "@emotion/styled";
import { Box } from "./Box";
import type { BoxProps } from "./Box";

export const BaseCard = styled(Box)<BoxProps>(props => ({
  ...props.theme.cardVariants.elevated,
}));
