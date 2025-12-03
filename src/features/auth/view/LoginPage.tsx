import { Navigate, Link } from "react-router-dom";
import styled from "@emotion/styled";
import { useState, type FormEvent } from "react";
import { useAuth } from "@/shared/hooks/useAuth";
import { LoginViewModel } from "../view-models/LoginViewModel";
import { useViewModel } from "@/shared/hooks/useViewModel";
import {
  BaseCard,
  Button,
  Input,
  Logo,
  ConfirmationModal,
  GlobalLoader,
} from "@/shared/components";
import { IoMailOutline, IoLockClosedOutline } from "react-icons/io5";
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
  margin: ${props => props.theme.spacing.m}px 0
    ${props => props.theme.spacing.xl}px 0;
`;

export default function LoginPage() {
  const [viewModel] = useState(() => new LoginViewModel());
  useViewModel(viewModel);

  const { user, loading: authLoading, role } = useAuth();

  const handleLoginSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const result = await viewModel.handleLogin();
    if (result.error) {
      if (result.needsConfirmation) {
        viewModel.setNeedsConfirmation(true);
      } else {
        toast.error(result.error);
      }
    }
  };

  const handleConfirmResend = async () => {
    const { error } = await viewModel.handleResendConfirmation();
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
              value={viewModel.email}
              onChange={e => viewModel.setEmail(e.target.value)}
              required
              autoComplete="email"
              disabled={viewModel.loading}
              icon={<IoMailOutline size={22} />}
              error={viewModel.emailError}
            />
            <div>
              <Input
                id="password"
                placeholder="Senha"
                value={viewModel.password}
                onChange={e => viewModel.setPassword(e.target.value)}
                required
                autoComplete="current-password"
                disabled={viewModel.loading}
                icon={<IoLockClosedOutline size={22} />}
                isPassword
                error={viewModel.passwordError}
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
                disabled={viewModel.loading}
                loading={viewModel.loading}
                label="Entrar"
              />
            </Actions>
          </Form>
        </StyledCard>
      </PageContainer>
      <ConfirmationModal
        isOpen={viewModel.needsConfirmation}
        onClose={() => viewModel.setNeedsConfirmation(false)}
        onConfirm={handleConfirmResend}
        title="Ative sua conta"
        message={`Enviamos um link de ativação para seu e-mail, mas parece que ele ainda não foi usado. Quer que a gente envie novamente para ${viewModel.email}?`}
        confirmText="Reenviar e-mail"
        cancelText="Agora não"
        variant="primary"
        loading={viewModel.loading}
      />
    </>
  );
}
