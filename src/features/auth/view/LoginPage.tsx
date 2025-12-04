import { Navigate } from "react-router-dom";
import { useState, type FormEvent } from "react";
import styled from "@emotion/styled";
import { useAuth } from "@/shared/hooks/useAuth";
import { LoginViewModel } from "../view-models/LoginViewModel";
import { useViewModel } from "@/shared/hooks/useViewModel";
import {
  BaseCard,
  Box,
  Button,
  GlobalLoader,
  Input,
  Logo,
} from "@/shared/components";
import {
  IoMailOutline,
  IoLockClosedOutline,
  IoLogInOutline,
} from "react-icons/io5";
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
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.l}px;
  width: 100%;
  max-width: 448px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.l}px;
`;

const InputsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.s}px;
`;

export default function LoginPage() {
  const [viewModel] = useState(() => new LoginViewModel());
  useViewModel(viewModel);

  const { user, loading: authLoading, role } = useAuth();

  const handleLoginSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const result = await viewModel.handleLogin();
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

  const isDisabled = viewModel.loading || viewModel.isLockedOnError;

  return (
    <PageContainer>
      <StyledCard>
        <Logo />
        <Box height="1.5px" backgroundColor="border" />
        <Form onSubmit={handleLoginSubmit}>
          <InputsContainer>
            <Input
              id="email"
              type="email"
              placeholder="E-mail"
              value={viewModel.email}
              onChange={e => viewModel.setEmail(e.target.value)}
              required
              autoComplete="email"
              disabled={isDisabled}
              icon={<IoMailOutline size={22} />}
              error={viewModel.emailError}
            />
            <Input
              id="password"
              placeholder="Senha"
              value={viewModel.password}
              onChange={e => viewModel.setPassword(e.target.value)}
              required
              autoComplete="current-password"
              disabled={isDisabled}
              icon={<IoLockClosedOutline size={22} />}
              isPassword
              error={viewModel.passwordError}
            />
          </InputsContainer>

          <Button
            type="submit"
            disabled={isDisabled}
            loading={viewModel.loading}
            label="Entrar"
            icon={<IoLogInOutline size={20} />}
          />
        </Form>
      </StyledCard>
    </PageContainer>
  );
}
