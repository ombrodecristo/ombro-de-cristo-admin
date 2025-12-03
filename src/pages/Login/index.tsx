import { Navigate } from "react-router-dom";
import styled from "@emotion/styled";
import { type FormEvent, useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useLoginViewModel } from "./useLoginViewModel";
import { BaseCard, Button, Input, Label, Logo } from "@/shared/components";
import { GlobalLoader } from "@/components/GlobalLoader";
import { FiMail, FiLock, FiLogIn } from "react-icons/fi";
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

const Actions = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.m}px;
  margin-top: ${props => props.theme.spacing.m}px;
`;

const SeparatorWithText = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.s}px;
  color: ${props => props.theme.colors.mutedForeground};
  font-size: 13px;

  &::before,
  &::after {
    content: "";
    flex: 1;
    height: 1.5px;
    background-color: ${props => props.theme.colors.border};
  }
`;

export default function Login() {
  const { email, setEmail, password, setPassword, loading, handleLogin } =
    useLoginViewModel();

  const { user, loading: authLoading, role } = useAuth();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setError(null);
  }, [email, password]);

  const handleLoginSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    const result = await handleLogin(e);
    if (result.error) {
      toast.error(result.error);
    }
  };

  if (authLoading) {
    return <GlobalLoader />;
  }

  if (user && role === "ADMIN") {
    return <Navigate to="/admin" replace />;
  }

  return (
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
              error={error}
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
              error={error}
            />
          </FormGroup>
          <Actions>
            <Button
              type="submit"
              disabled={loading}
              loading={loading}
              label="Entrar"
              icon={<FiLogIn />}
            />
            <SeparatorWithText>Primeira vez aqui?</SeparatorWithText>
            <Button
              type="button"
              onClick={() => (window.location.href = "/signup")}
              label="Criar minha conta"
              variant="secondary"
              disabled={loading}
            />
          </Actions>
        </Form>
      </StyledCard>
    </PageContainer>
  );
}
