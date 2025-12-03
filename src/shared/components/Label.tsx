import styled from "@emotion/styled";

export const Label = styled.label`
  font-family: ${props => props.theme.textVariants.bodyMedium.fontFamily};
  font-weight: ${props => props.theme.textVariants.bodyMedium.fontWeight};
  font-size: ${props => props.theme.textVariants.defaults.fontSize}px;
  color: ${props => props.theme.colors.mainForeground};
  display: block;
`;
