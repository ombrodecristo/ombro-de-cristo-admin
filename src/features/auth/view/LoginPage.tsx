import { Navigate } from "react-router-dom";
import { useState, type FormEvent } from "react";
import { useAuth } from "@/shared/hooks/useAuth";
import { LoginViewModel } from "../view-models/LoginViewModel";
import { useViewModel } from "@/shared/hooks/useViewModel";
import {
  BaseCard,
  Box,
  Button,
  ConfirmationModal,
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
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        width="100%"
        minHeight="100vh"
        padding="m"
      >
        <BaseCard
          display="flex"
          flexDirection="column"
          gap="l"
          width="100%"
          maxWidth="448px"
        >
          <Logo />
          <Box height="1.5px" backgroundColor="border" />
          <Box
            as="form"
            onSubmit={handleLoginSubmit}
            display="flex"
            flexDirection="column"
            gap="l"
          >
            <Box display="flex" flexDirection="column" gap="s">
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
            </Box>

            <Button
              type="submit"
              disabled={viewModel.loading}
              loading={viewModel.loading}
              label="Entrar"
              icon={<IoLogInOutline size={20} />}
            />
          </Box>
        </BaseCard>
      </Box>
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
