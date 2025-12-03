import styled from "@emotion/styled";

export const BaseCard = styled.div`
  background-color: ${props => props.theme.colors.cardBackground};
  color: ${props => props.theme.colors.cardForeground};
  border-radius: ${props => props.theme.borderRadii.l}px;
  box-shadow: ${props => props.theme.cardVariants.elevated.shadow};
  border: 1px solid ${props => props.theme.colors.border};
`;
