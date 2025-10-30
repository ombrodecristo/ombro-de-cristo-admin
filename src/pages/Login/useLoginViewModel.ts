import { useState, type FormEvent } from "react";
import { authService } from "../../services/authService";

export function useLoginViewModel() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error } = await authService.signIn(email, password);
    if (error) {
      if (error.message === "Invalid login credentials") {
        setError("E-mail ou senha inválidos.");
      } else {
        setError(error.message);
      }
    }

    setLoading(false);
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    loading,
    error,
    handleLogin,
  };
}
