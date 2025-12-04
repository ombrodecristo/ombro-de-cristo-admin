import { useState, type FormEvent, useEffect } from "react";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
import {
  IoLockClosedOutline,
  IoAlertCircleOutline,
  IoMailOutline,
  IoSaveOutline,
} from "react-icons/io5";
import { PasswordRecoveryViewModel } from "../view-models/PasswordRecoveryViewModel";
import {
  Button,
  BaseCard,
  Label,
  Input,
  GlobalLoader,
} from "@/shared/components";
import { useAuth } from "@/shared/hooks/useAuth";
import { useViewModel } from "@/shared/hooks/useViewModel";
import { toast } from "sonner";

const PageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  padding: ${props => props.theme.spacing.m}px;
`;

const StyledCard = styled(BaseCard)`
  width: 100%;
  max-width: 448px;
`;

const Header = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${props => props.theme.spacing.m}px;
  text-align: center;
  margin-bottom: ${props => props.theme.spacing.l}px;
`;

const StatusIcon = styled.div<{ isTokenInvalid: boolean }>`
  color: ${props =>
    props.isTokenInvalid
      ? props.theme.colors.destructiveBackground
      : props.theme.colors.primary};
  svg {
    width: 48px;
    height: 48px;
  }
`;

const Title = styled.h1`
  font-family: ${props => props.theme.textVariants.header.fontFamily};
  font-weight: ${props => props.theme.textVariants.header.fontWeight};
  color: ${props => props.theme.colors.mainForeground};
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

export default function PasswordRecoveryPage() {
  const { loading: authLoading, initialHash } = useAuth();
  const navigate = useNavigate();

  const [viewModel] = useState(
    () => new PasswordRecoveryViewModel({ authLoading, initialHash })
  );

  useViewModel(viewModel);

  useEffect(() => {
    viewModel.checkToken();
  }, [authLoading, viewModel]);

  useEffect(() => {
    if (viewModel.success) {
      toast.success("Senha alterada", {
        description: "Você já pode fazer login com sua nova senha.",
      });
      navigate("/login", { replace: true });
    }
  }, [viewModel.success, navigate]);

  const onPasswordSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const { error } = await viewModel.handlePasswordSubmit();
    if (error) {
      toast.error(error);
    }
  };

  if (viewModel.isCheckingToken) {
    return <GlobalLoader />;
  }

  if (viewModel.isTokenValid) {
    return (
      <PageContainer>
        <StyledCard>
          <Header>
            <StatusIcon isTokenInvalid={false}>
              <IoLockClosedOutline />
            </StatusIcon>
            <Title>Redefina sua Senha</Title>
          </Header>
          <Form onSubmit={onPasswordSubmit}>
            <div>
              <Label htmlFor="password">Nova Senha</Label>
              <Input
                id="password"
                placeholder="••••••••"
                value={viewModel.password}
                onChange={e => viewModel.setPassword(e.target.value)}
                required
                autoComplete="new-password"
                disabled={viewModel.loading}
                icon={<IoLockClosedOutline size={20} />}
                isPassword
                error={viewModel.error || ""}
              />
            </div>
            <div>
              <Label htmlFor="confirmPassword">Confirmar Nova Senha</Label>
              <Input
                id="confirmPassword"
                placeholder="••••••••"
                value={viewModel.confirmPassword}
                onChange={e => viewModel.setConfirmPassword(e.target.value)}
                required
                autoComplete="new-password"
                disabled={viewModel.loading}
                icon={<IoLockClosedOutline size={20} />}
                isPassword
                error={viewModel.error || ""}
              />
            </div>
            <Button
              type="submit"
              disabled={viewModel.loading}
              loading={viewModel.loading}
              label="Alterar Senha"
              icon={<IoSaveOutline size={20} />}
            />
          </Form>
        </StyledCard>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <StyledCard>
        <Header>
          <StatusIcon isTokenInvalid={viewModel.isTokenInvalid}>
            {viewModel.isTokenInvalid ? (
              <IoAlertCircleOutline />
            ) : (
              <IoMailOutline />
            )}
          </StatusIcon>
          <Title>
            {viewModel.isTokenInvalid
              ? "Link Inválido ou Expirado"
              : "Recuperar Senha"}
          </Title>
          <Description>
            {viewModel.isTokenInvalid
              ? "Este link de redefinição de senha é inválido ou expirou. Por favor, solicite um novo link de recuperação no aplicativo móvel."
              : "Para recuperar sua senha, o processo deve ser iniciado através do aplicativo móvel Ombro de Cristo. Por favor, acesse o app para solicitar o link de recuperação."}
          </Description>
        </Header>
      </StyledCard>
    </PageContainer>
  );
}
