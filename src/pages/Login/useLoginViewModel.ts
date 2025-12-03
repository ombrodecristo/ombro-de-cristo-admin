import { useState, type FormEvent } from "react";
import { authService } from "../../services/authService";
import { logService } from "../../services/logService";
import { type User } from "@/types/database";

type LoginResult = {
  success: boolean;
  error?: string;
  needsConfirmation?: boolean;
};

export function useLoginViewModel() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [needsConfirmation, setNeedsConfirmation] = useState(false);

  const handleLogin = async (e: FormEvent): Promise<LoginResult> => {
    e.preventDefault();
    setLoading(true);
    setNeedsConfirmation(false);

    const { data, error } = await authService.signIn(email, password);

    setLoading(false);

    if (error) {
      const isConfirmationError = error.message.includes(
        "Sua conta precisa ser ativada"
      );

      if (isConfirmationError) {
        setNeedsConfirmation(true);
      }

      await logService.logError(error, {
        component: "useLoginViewModel",
        context: { email: email.substring(0, 3) + "..." },
      });

      setPassword("");

      return {
        success: false,
        error: error.message,
        needsConfirmation: isConfirmationError,
      };
    }

    if (data.user) {
      const user = data.user as User;
      const role = user.app_metadata?.role;

      if (role !== "ADMIN") {
        const errorMessage = "Acesso restrito à Equipe de Administração.";
        await authService.signOut();
        setPassword("");

        return { success: false, error: errorMessage };
      }

      return { success: true };
    }

    return { success: false, error: "Ocorreu um erro desconhecido." };
  };

  const handleResendConfirmation = async () => {
    setLoading(true);
    const { error } = await authService.resendConfirmation(email);
    setLoading(false);
    setNeedsConfirmation(false);

    if (error) {
      await logService.logError(error, {
        component: "LoginViewModel.Resend",
        context: { email: email.substring(0, 3) + "..." },
      });
    }

    return { error };
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    loading,
    needsConfirmation,
    setNeedsConfirmation,
    handleLogin,
    handleResendConfirmation,
  };
}
