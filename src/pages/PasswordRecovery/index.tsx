import { useEffect, type FormEvent } from "react";
import styled from "@emotion/styled";
import { FiLock, FiLogIn, FiAlertCircle, FiCheckCircle } from "react-icons/fi";
import { usePasswordRecoveryViewModel } from "./usePasswordRecoveryViewModel";
import { Button, BaseCard, Label, Input } from "@/shared/components";
import { useAuth } from "@/hooks/useAuth";
import { GlobalLoader } from "@/components/GlobalLoader";

const PageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
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

const StatusIcon = styled.div<{ success: boolean; isTokenInvalid: boolean }>`
  color: ${props =>
    props.isTokenInvalid
      ? props.theme.colors.destructiveBackground
      : props.success
        ? props.theme.colors.success
        : props.theme.colors.primary};
  svg {
    width: 48px;
    height: 48px;
  }
`;

const Title = styled.h1<{ isTokenInvalid: boolean }>`
  font-family: ${props => props.theme.textVariants.header.fontFamily};
  font-weight: ${props => props.theme.textVariants.header.fontWeight};
  color: ${props =>
    props.isTokenInvalid
      ? props.theme.colors.destructiveBackground
      : props.theme.colors.primary};
  font-size: 24px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const StatusText = styled.p`
  text-align: center;
  color: ${props => props.theme.colors.mutedForeground};
  line-height: 1.6;
`;

const ErrorMessage = styled.p`
  font-size: 14px;
  color: ${props => props.theme.colors.destructiveBackground};
  text-align: center;
`;

export default function PasswordRecovery() {
  const { loading: authLoading, initialHash } = useAuth();

  const {
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    loading,
    pageLoading,
    success,
    isTokenValid,
    error,
    handleSubmit,
  } = usePasswordRecoveryViewModel({ authLoading, initialHash });

  useEffect(() => {
    if (success) {
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, [success]);

  if (pageLoading) {
    return <GlobalLoader />;
  }

  const isTokenInvalid = !isTokenValid && !success;

  const onFormSubmit = (e: FormEvent) => {
    handleSubmit(e);
  };

  return (
    <PageContainer>
      <StyledCard>
        <Header>
          <StatusIcon success={success} isTokenInvalid={isTokenInvalid}>
            {isTokenInvalid ? (
              <FiAlertCircle />
            ) : success ? (
              <FiCheckCircle />
            ) : (
              <FiLock />
            )}
          </StatusIcon>
          <Title isTokenInvalid={isTokenInvalid}>
            {isTokenInvalid
              ? "Link Inválido"
              : success
                ? "Senha Alterada"
                : "Redefina sua Senha"}
          </Title>
        </Header>

        {isTokenInvalid ? (
          <StatusText>
            Link de redefinição de senha inválido ou expirado.
            <br />
            Por favor, solicite um novo link no aplicativo.
          </StatusText>
        ) : success ? (
          <StatusText>
            Sua senha foi alterada com sucesso!
            <br />
            Você já pode fechar esta página.
          </StatusText>
        ) : (
          <Form onSubmit={onFormSubmit}>
            <FormGroup>
              <Label htmlFor="password">Nova Senha</Label>
              <Input
                id="password"
                placeholder="••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                autoComplete="new-password"
                disabled={loading}
                icon={<FiLock size={20} />}
                isPassword
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="confirmPassword">Confirmar Nova Senha</Label>
              <Input
                id="confirmPassword"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                required
                autoComplete="new-password"
                disabled={loading}
                icon={<FiLock size={20} />}
                isPassword
              />
            </FormGroup>

            {error && <ErrorMessage>{error}</ErrorMessage>}

            <Button
              type="submit"
              disabled={loading}
              loading={loading}
              label="Alterar Senha"
              icon={<FiLogIn />}
            />
          </Form>
        )}
      </StyledCard>
    </PageContainer>
  );
}
