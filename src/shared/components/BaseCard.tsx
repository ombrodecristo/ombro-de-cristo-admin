import styled from "@emotion/styled";

export const BaseCard = styled.div`
  background-color: ${props => props.theme.colors.cardBackground};
  border-radius: ${props => props.theme.borderRadii.l}px;
  padding: ${props => props.theme.spacing.l}px;
  box-shadow: 0 4px 12px ${props => props.theme.colors.shadowColor}14;
`;
