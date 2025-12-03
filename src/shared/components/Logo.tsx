import styled from "@emotion/styled";

const LogoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${props => props.theme.spacing.xs}px;
`;

const LogoImage = styled.img`
  height: 120px;
  width: 120px;
  object-fit: contain;
  margin-bottom: ${props => props.theme.spacing.s}px;
`;

const AppTitle = styled.h1`
  font-family: ${props => props.theme.textVariants.header.fontFamily};
  font-weight: ${props => props.theme.textVariants.header.fontWeight};
  color: ${props => props.theme.colors.primary};
  font-size: 32px;
  text-align: center;
  line-height: 36px;
`;

const AppSlogan = styled.p`
  font-family: ${props => props.theme.textVariants.caption.fontFamily};
  font-size: 16px;
  font-weight: 600;
  color: ${props => props.theme.colors.mutedForeground};
  opacity: 0.95;
  margin-top: ${props => props.theme.spacing.xs}px;
`;

export function Logo() {
  return (
    <LogoContainer>
      <LogoImage src="/logo.png" alt="Logo Ombro de Cristo" />
      <AppTitle>Ombro de Cristo</AppTitle>
      <AppSlogan>Sua missão, fortalecida pela mentoria.</AppSlogan>
    </LogoContainer>
  );
}
