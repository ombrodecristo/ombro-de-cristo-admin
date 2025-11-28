import { useState, type FormEvent } from "react";
import { authService } from "../../services/authService";
import { logService } from "../../services/logService";
import { type User } from "@/types/database";

type LoginResult = {
  success: boolean;
  error?: string;
};

export function useLoginViewModel() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: FormEvent): Promise<LoginResult> => {
    e.preventDefault();
    setLoading(true);

    const { data, error } = await authService.signIn(email, password);

    if (error) {
      let friendlyMessage = "Ocorreu um erro ao tentar fazer login.";
      if (error.message === "Invalid login credentials") {
        friendlyMessage = "E-mail ou senha inválidos.";
      }

      await logService.logError(error, {
        component: "useLoginViewModel",
        context: { email: email.substring(0, 3) + "..." },
      });
      setPassword("");
      setLoading(false);
      return { success: false, error: friendlyMessage };
    }

    if (data.user) {
      const user = data.user as User;
      const role = user.app_metadata?.role;

      if (role !== "ADMIN") {
        const errorMessage =
          "Acesso restrito à Equipe de Administração. Se acredita que isso é um erro, contate o suporte.";
        await authService.signOut();
        setPassword("");
        setLoading(false);
        return { success: false, error: errorMessage };
      }

      setLoading(false);
      return { success: true };
    }

    setLoading(false);
    return { success: false, error: "Ocorreu um erro desconhecido." };
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    loading,
    handleLogin,
  };
}
