import { Navigate, Link } from "react-router-dom";
import styled from "@emotion/styled";
import { useEffect } from "react";
import type { FormEvent } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useLoginViewModel } from "./useLoginViewModel";
import {
  BaseCard,
  Button,
  Input,
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
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.m}px;
`;

const ForgotPasswordLink = styled(Link)`
  font-size: 14px;
  font-family: ${props => props.theme.textVariants.caption.fontFamily};
  font-weight: 700;
  color: ${props => props.theme.colors.primaryBackground};
  text-decoration: none;
  padding: ${props => props.theme.spacing.xs}px;

  &:hover {
    text-decoration: underline;
  }
`;

const Actions = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.l}px;
  margin-top: ${props => props.theme.spacing.s}px;
`;

const Separator = styled.div`
  height: 1.5px;
  background-color: ${props => props.theme.colors.border};
  margin-bottom: ${props => props.theme.spacing.xl}px;
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
    emailError,
    passwordError,
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
          <Logo />
          <Separator />
          <Form onSubmit={handleLoginSubmit}>
            <Input
              id="email"
              type="email"
              placeholder="E-mail"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              autoComplete="email"
              disabled={loading}
              icon={<FiMail size={22} />}
              error={emailError}
            />
            <div>
              <Input
                id="password"
                placeholder="Senha"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                disabled={loading}
                icon={<FiLock size={22} />}
                isPassword
                error={passwordError}
              />
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  marginTop: "8px",
                }}
              >
                <ForgotPasswordLink to="/password-recovery">
                  Esqueci minha senha
                </ForgotPasswordLink>
              </div>
            </div>

            <Actions>
              <Button
                type="submit"
                disabled={loading}
                loading={loading}
                label="Entrar"
                icon={<FiLock />}
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
