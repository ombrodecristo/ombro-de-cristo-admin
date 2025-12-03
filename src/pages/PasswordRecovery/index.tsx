import { useEffect } from "react";
import styled from "@emotion/styled";
import {
  FiLock,
  FiLogIn,
  FiAlertCircle,
  FiCheckCircle,
  FiEye,
  FiEyeOff,
} from "react-icons/fi";
import { usePasswordRecoveryViewModel } from "./usePasswordRecoveryViewModel";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Label } from "@/components/ui/Label";
import { PasswordInput } from "@/components/ui/PasswordInput";
import { useAuth } from "@/contexts/AuthContext";
import { GlobalLoader } from "@/components/GlobalLoader";

const StatusIcon = styled.div`
  svg {
    width: 48px;
    height: 48px;
  }
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

  return (
    <Card style={{ width: "100%", maxWidth: "448px" }}>
      <CardHeader>
        {!isTokenValid && !success ? (
          <>
            <StatusIcon>
              <FiAlertCircle style={{ color: "var(--color-destructive)" }} />
            </StatusIcon>
            <CardTitle style={{ color: "var(--color-destructive)" }}>
              Link Inválido
            </CardTitle>
          </>
        ) : success ? (
          <>
            <StatusIcon>
              <FiCheckCircle style={{ color: "var(--color-primary)" }} />
            </StatusIcon>
            <CardTitle style={{ color: "var(--color-primary)" }}>
              Senha Alterada
            </CardTitle>
          </>
        ) : (
          <>
            <StatusIcon>
              <FiLock style={{ color: "var(--color-primary)" }} />
            </StatusIcon>
            <CardTitle style={{ color: "var(--color-primary)" }}>
              Redefina sua Senha
            </CardTitle>
          </>
        )}
      </CardHeader>

      <CardContent>
        {!isTokenValid && !success ? (
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
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label htmlFor="password">Nova Senha</Label>
              <PasswordInput
                id="password"
                placeholder="••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                autoComplete="new-password"
                disabled={loading}
                icon={<FiLock size={20} />}
                toggleIconShow={<FiEye size={20} />}
                toggleIconHide={<FiEyeOff size={20} />}
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="confirmPassword">Confirmar Nova Senha</Label>
              <PasswordInput
                id="confirmPassword"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                required
                autoComplete="new-password"
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
              label="Alterar Senha"
              icon={<FiLogIn />}
            />
          </Form>
        )}
      </CardContent>
    </Card>
  );
}
