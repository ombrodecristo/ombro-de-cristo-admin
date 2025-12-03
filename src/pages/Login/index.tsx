import { Navigate, useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import { type FormEvent, useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useLoginViewModel } from "./useLoginViewModel";
import { BaseCard, Button, Input, Label, Logo } from "@/shared/components";
import { GlobalLoader } from "@/components/GlobalLoader";
import { FiMail, FiLock, FiLogIn } from "react-icons/fi";

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
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.m}px;
  text-align: center;
  margin-bottom: ${props => props.theme.spacing.xl}px;
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

const ErrorMessage = styled.p`
  font-family: ${props => props.theme.textVariants.error.fontFamily};
  font-size: ${props => props.theme.textVariants.error.fontSize}px;
  font-weight: ${props => props.theme.textVariants.error.fontWeight};
  color: ${props => props.theme.colors.destructiveBackground};
  text-align: center;
`;

export default function Login() {
  const { email, setEmail, password, setPassword, loading, handleLogin } =
    useLoginViewModel();

  const { user, loading: authLoading, role } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setError(null);
  }, [email, password]);

  const handleLoginSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    const result = await handleLogin(e);
    if (result.error) {
      setError(result.error);
    }
    if (result.success) {
      navigate("/admin", { replace: true });
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
              icon={<FiMail size={20} />}
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
              icon={<FiLock size={20} />}
              isPassword
            />
          </FormGroup>
          {error && <ErrorMessage>{error}</ErrorMessage>}
          <Button
            type="submit"
            disabled={loading}
            loading={loading}
            label="Entrar"
            icon={<FiLogIn />}
            style={{ marginTop: "8px" }}
          />
        </Form>
      </StyledCard>
    </PageContainer>
  );
}
