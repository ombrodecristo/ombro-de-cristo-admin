import styled from "@emotion/styled";
import { LegalContent } from "./LegalContent";

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100%;
  background-color: ${props => props.theme.colors.mainBackground};
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.m}px;
  height: 64px;
  padding: 0 ${props => props.theme.spacing.l}px;
  background-color: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.primaryForeground};
  flex-shrink: 0;
`;

const Logo = styled.img`
  height: 40px;
  width: 40px;
  object-fit: contain;
`;

const Title = styled.h1`
  font-size: 18px;
  font-weight: bold;
`;

const Main = styled.main`
  flex: 1;
  overflow-y: auto;
`;

export default function TermsAndPolicyPage() {
  return (
    <PageContainer>
      <Header>
        <Logo src="/logo.png" alt="Logo Ombro de Cristo" />
        <Title>Termos de Uso e Política de Privacidade</Title>
      </Header>
      <Main>
        <LegalContent />
      </Main>
    </PageContainer>
  );
}
