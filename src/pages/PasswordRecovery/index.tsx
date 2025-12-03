import { useEffect, type FormEvent } from "react";
import styled from "@emotion/styled";
import { FiLock, FiSend, FiAlertCircle, FiMail } from "react-icons/fi";
import { usePasswordRecoveryViewModel } from "./usePasswordRecoveryViewModel";
import {
  Button,
  BaseCard,
  Label,
  Input,
  ConfirmationModal,
} from "@/shared/components";
import { useAuth } from "@/hooks/useAuth";
import { GlobalLoader } from "@/components/GlobalLoader";
import { Link } from "react-router-dom";

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
      : props.theme.colors.mainForeground};
  font-size: 24px;
`;

const Description = styled.p`
  color: ${props => props.theme.colors.mutedForeground};
  line-height: 1.6;
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

const SeparatorWithText = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.s}px;
  color: ${props => props.theme.colors.mutedForeground};
  font-size: 13px;
  margin-top: ${props => props.theme.spacing.l}px;
  margin-bottom: ${props => props.theme.spacing.m}px;

  &::before,
  &::after {
    content: "";
    flex: 1;
    height: 1.5px;
    background-color: ${props => props.theme.colors.border};
  }
`;

export default function PasswordRecovery() {
  const { loading: authLoading, initialHash } = useAuth();

  const {
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    loading,
    pageLoading,
    success,
    isTokenValid,
    isEmailSent,
    error,
    handleEmailSubmit,
    handlePasswordSubmit,
  } = usePasswordRecoveryViewModel({ authLoading, initialHash });

  useEffect(() => {
    if (success) {
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, [success]);

  if (pageLoading) {
    return <GlobalLoader />;
  }

  const isTokenInvalid = !isTokenValid && !success && !isEmailSent;

  const onEmailSubmit = (e: FormEvent) => handleEmailSubmit(e);
  const onPasswordSubmit = (e: FormEvent) => handlePasswordSubmit(e);

  if (isTokenValid) {
    return (
      <PageContainer>
        <ConfirmationModal
          isOpen={success}
          onClose={() => {}}
          onConfirm={() => (window.location.href = "/login")}
          title="Senha alterada"
          message="Sua senha foi alterada com sucesso! Você já pode fazer login com sua nova senha."
          confirmText="Ir para Login"
        />

        <StyledCard>
          <Header>
            <StatusIcon success={false} isTokenInvalid={false}>
              <FiLock />
            </StatusIcon>
            <Title isTokenInvalid={false}>Redefina sua Senha</Title>
          </Header>
          <Form onSubmit={onPasswordSubmit}>
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
                error={error}
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
                error={error}
              />
            </FormGroup>
            <Button
              type="submit"
              disabled={loading}
              loading={loading}
              label="Alterar Senha"
            />
          </Form>
        </StyledCard>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <ConfirmationModal
        isOpen={isEmailSent}
        onClose={() => {}}
        onConfirm={() => (window.location.href = "/login")}
        title="Link enviado!"
        message="Se seu e-mail estiver cadastrado, você receberá um link para redefinir sua senha. Verifique sua caixa de entrada e spam."
        confirmText="Entendi"
      />

      <StyledCard>
        <Header>
          <StatusIcon success={false} isTokenInvalid={isTokenInvalid}>
            {isTokenInvalid ? <FiAlertCircle /> : <FiMail />}
          </StatusIcon>
          <Title isTokenInvalid={isTokenInvalid}>Recuperar Senha</Title>
          <Description>
            {isTokenInvalid
              ? "Link de redefinição de senha inválido ou expirado. Por favor, solicite um novo link no aplicativo."
              : "Sem problemas! Informe seu e-mail e enviaremos um link para você criar uma nova senha."}
          </Description>
        </Header>
        {!isTokenInvalid && (
          <Form onSubmit={onEmailSubmit}>
            <FormGroup>
              <Label htmlFor="email">E-mail</Label>
              <Input
                id="email"
                type="email"
                placeholder="email@exemplo.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                autoComplete="email"
                disabled={loading}
                icon={<FiMail size={20} />}
                error={error}
              />
            </FormGroup>
            <Button
              type="submit"
              disabled={loading}
              loading={loading}
              label="Enviar link de recuperação"
              icon={<FiSend />}
            />
          </Form>
        )}
        <SeparatorWithText>Lembrou a senha?</SeparatorWithText>
        <Link to="/login">
          <Button label="Fazer Login" variant="secondary" />
        </Link>
      </StyledCard>
    </PageContainer>
  );
}
