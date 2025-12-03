import styled from "@emotion/styled";
import { useLocation } from "react-router-dom";
import { IoCheckmarkCircle, IoAlertCircle } from "react-icons/io5";
import { BaseCard } from "@/shared/components";

const PageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  padding: ${props => props.theme.spacing.m}px;
`;

const StyledCard = styled(BaseCard)`
  width: 100%;
  max-width: 448px;
  padding: ${props => props.theme.spacing.xl}px;
`;

const Header = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${props => props.theme.spacing.m}px;
  text-align: center;
  margin-bottom: ${props => props.theme.spacing.l}px;
`;

const StatusIcon = styled.div<{ success: boolean }>`
  color: ${props =>
    props.success
      ? props.theme.colors.success
      : props.theme.colors.destructiveBackground};
  svg {
    width: 48px;
    height: 48px;
  }
`;

const Title = styled.h1<{ success: boolean }>`
  font-family: ${props => props.theme.textVariants.header.fontFamily};
  font-weight: ${props => props.theme.textVariants.header.fontWeight};
  color: ${props =>
    props.success
      ? props.theme.colors.primary
      : props.theme.colors.destructiveBackground};
  font-size: 24px;
`;

const ContentText = styled.p`
  color: ${props => props.theme.colors.mutedForeground};
  line-height: 1.6;
  text-align: center;
`;

export default function AuthConfirmedPage() {
  const { hash } = useLocation();
  const hashParams = new URLSearchParams(hash.substring(1));
  const errorDescription = hashParams.get("error_description");

  const hasError = !!errorDescription;

  return (
    <PageContainer>
      <StyledCard>
        <Header>
          <StatusIcon success={!hasError}>
            {hasError ? <IoAlertCircle /> : <IoCheckmarkCircle />}
          </StatusIcon>
          <Title success={!hasError}>
            {hasError ? "Link Inválido ou Expirado" : "Conta Confirmada"}
          </Title>
        </Header>

        <ContentText>
          {hasError
            ? "Este link de confirmação é inválido ou já foi utilizado. Por favor, tente fazer login ou solicitar um novo link."
            : "Sua conta foi confirmada com sucesso. Você já pode fechar esta página e acessar o aplicativo."}
        </ContentText>
      </StyledCard>
    </PageContainer>
  );
}
