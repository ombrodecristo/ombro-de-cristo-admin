import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { FiMail, FiLock, FiLogIn, FiEye, FiEyeOff } from "react-icons/fi";
import { useLoginViewModel } from "./useLoginViewModel";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { PasswordInput } from "@/components/ui/PasswordInput";
import { Button } from "@/components/ui/Button";
import { GlobalLoader } from "@/components/GlobalLoader";
import { type FormEvent, useEffect, useState } from "react";
import styled from "@emotion/styled";

const LogoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${props => props.theme.spacing.xs}px;
`;

const LogoImage = styled.img`
  height: 96px;
  width: 96px;
  object-fit: contain;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: ${props => props.theme.spacing.m}px;
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

  useEffect(() => {
    if (error) {
      setError(null);
    }
  }, [email, password]);

  if (authLoading) {
    return <GlobalLoader />;
  }

  if (user && role === "ADMIN") {
    return <Navigate to="/admin" replace />;
  }

  return (
    <Card style={{ width: "100%", maxWidth: "448px" }}>
      <CardHeader>
        <LogoContainer>
          <LogoImage src="/logo.png" alt="Logo Ombro de Cristo" />
          <CardTitle>Ombro de Cristo</CardTitle>
        </LogoContainer>
        <CardDescription>Painel Administrativo</CardDescription>
      </CardHeader>
      <CardContent>
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
            <PasswordInput
              id="password"
              placeholder="••••••••"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              autoComplete="current-password"
              disabled={loading}
              icon={<FiLock size={20} />}
              toggleIconShow={<FiEye size={20} />}
              toggleIconHide={<FiEyeOff size={20} />}
            />
          </FormGroup>

          {error && <ErrorMessage>{error}</ErrorMessage>}

          <Button
            type="submit"
            disabled={loading}
            loading={loading}
            label="Entrar"
            icon={<FiLogIn />}
          />
        </Form>
      </CardContent>
    </Card>
  );
}
