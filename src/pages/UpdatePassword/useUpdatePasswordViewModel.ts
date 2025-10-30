import { useState, type FormEvent, useEffect } from "react";
import { supabase } from "../../lib/supabaseClient";
import { authService } from "../../services/authService";
import { logService } from "../../services/logService";
import { toast } from "sonner";

export function useUpdatePasswordViewModel() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [isTokenValid, setIsTokenValid] = useState(false);

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY") {
        setIsTokenValid(true);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("As senhas não coincidem.");
      return;
    }

    if (password.length < 6) {
      toast.error("Sua senha deve ter no mínimo 6 caracteres.");
      return;
    }

    setLoading(true);

    const { error } = await authService.updateUserPassword(password);
    setLoading(false);

    if (error) {
      toast.error(error.message);
      await logService.logError(error, {
        component: "useUpdatePasswordViewModel",
      });
    } else {
      setSuccess(true);
    }
  };

  return {
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    loading,
    success,
    isTokenValid,
    handleSubmit,
  };
}
