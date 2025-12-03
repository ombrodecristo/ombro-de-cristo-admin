import { Navigate, Link } from "react-router-dom";
import styled from "@emotion/styled";
import { type FormEvent, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useLoginViewModel } from "./useLoginViewModel";
import {
  BaseCard,
  Button,
  Input,
  Label,
  Logo,
  ConfirmationModal,
} from "@/shared/components";
import { GlobalLoader } from "@/components/GlobalLoader";
import { FiMail, FiLock } from "react-icons/fi";
import { toast } from "sonner";

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 100vh;
  padding: ${props => props.theme.spacing.m}px;
`;

const StyledCard = styled(BaseCard)`
  width: 100%;
  max-width: 448px;
  padding: ${props => props.theme.spacing.xl}px;
`;

const Header = styled.header`
  margin-bottom: ${props => props.theme.spacing.xl}px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.l}px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.s}px;
`;

const PasswordActions = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: ${props => props.theme.spacing.xs}px;
`;

const ForgotPasswordLink = styled(Link)`
  font-size: 14px;
  font-weight: 600;
  color: ${props => props.theme.colors.primary};
  text-decoration: none;
  padding: 4px;

  &:hover {
    text-decoration: underline;
  }
`;

const Actions = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.m}px;
  margin-top: ${props => props.theme.spacing.l}px;
`;

export default function Login() {
  const {
    email,
    setEmail,
    password,
    setPassword,
    loading,
    needsConfirmation,
    setNeedsConfirmation,
    handleLogin,
    handleResendConfirmation,
  } = useLoginViewModel();

  const { user, loading: authLoading, role } = useAuth();

  useEffect(() => {
    if (needsConfirmation) {
      setNeedsConfirmation(false);
    }
  }, [email, password, needsConfirmation, setNeedsConfirmation]);

  const handleLoginSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const result = await handleLogin(e);
    if (result.error && !result.needsConfirmation) {
      toast.error(result.error);
    }
  };

  const handleConfirmResend = async () => {
    const { error } = await handleResendConfirmation();
    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Link enviado!", {
        description: "Verifique sua caixa de entrada e a pasta de spam.",
      });
    }
  };

  if (authLoading) {
    return <GlobalLoader />;
  }

  if (user && role === "ADMIN") {
    return <Navigate to="/admin" replace />;
  }

  return (
    <>
      <PageContainer>
        <StyledCard>
          <Header>
            <Logo />
          </Header>
          <Form onSubmit={handleLoginSubmit}>
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
                icon={<FiMail size={22} />}
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="password">Senha</Label>
              <Input
                id="password"
                placeholder="••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                disabled={loading}
                icon={<FiLock size={22} />}
                isPassword
              />
              <PasswordActions>
                <ForgotPasswordLink to="/password-recovery">
                  Esqueci minha senha
                </ForgotPasswordLink>
              </PasswordActions>
            </FormGroup>
            <Actions>
              <Button
                type="submit"
                disabled={loading}
                loading={loading}
                label="Entrar"
              />
            </Actions>
          </Form>
        </StyledCard>
      </PageContainer>
      <ConfirmationModal
        isOpen={needsConfirmation}
        onClose={() => setNeedsConfirmation(false)}
        onConfirm={handleConfirmResend}
        title="Ative sua conta"
        message={`Enviamos um link de ativação para seu e-mail, mas parece que ele ainda não foi usado. Quer que a gente envie novamente para ${email}?`}
        confirmText="Reenviar e-mail"
        cancelText="Agora não"
        variant="primary"
        loading={loading}
      />
    </>
  );
}
