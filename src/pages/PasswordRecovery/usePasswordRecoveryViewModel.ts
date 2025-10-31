import { useState, type FormEvent, useEffect } from "react";
import { supabase } from "../../lib/supabaseClient";
import { logService } from "../../services/logService";
import { toast } from "sonner";

export function usePasswordRecoveryViewModel() {
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

    const urlHash = window.location.hash;
    if (urlHash.includes("type=recovery")) {
      setIsTokenValid(true);
    }

    if (urlHash.includes("error=access_denied")) {
      setIsTokenValid(false);
    }

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (password.length < 6) {
      toast.error("A sua nova senha deve ter no mínimo 6 caracteres.");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("As suas senhas não coincidem.");
      return;
    }

    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password });
    setLoading(false);
    setPassword("");
    setConfirmPassword("");

    if (error) {
      toast.error(error.message);
      await logService.logError(error, {
        component: "usePasswordRecoveryViewModel",
      });
    } else {
      setSuccess(true);

      window.history.replaceState({}, document.title, window.location.pathname);
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
