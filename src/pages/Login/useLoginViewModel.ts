import { useState, type FormEvent } from "react";
import { authService } from "../../services/authService";
import { logService } from "../../services/logService";
import { toast } from "sonner";

export function useLoginViewModel() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await authService.signIn(email, password);

    if (error) {
      let friendlyMessage = "Ocorreu um erro ao tentar fazer login.";

      if (error.message === "Invalid login credentials") {
        friendlyMessage = "E-mail ou senha inválidos.";
      }

      toast.error(friendlyMessage);

      await logService.logError(error, {
        component: "useLoginViewModel",
        context: { email: email.substring(0, 3) + "..." },
      });
    }

    setLoading(false);
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
