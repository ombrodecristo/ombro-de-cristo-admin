import { useState, type FormEvent, useEffect } from "react";
import { supabase } from "../../lib/supabaseClient";
import { logService } from "../../services/logService";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";

type UsePasswordRecoveryViewModelProps = {
  authLoading: boolean;
};

export function usePasswordRecoveryViewModel({
  authLoading,
}: UsePasswordRecoveryViewModelProps) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [isTokenValid, setIsTokenValid] = useState(false);
  const [isCheckingToken, setIsCheckingToken] = useState(true);
  const { initialHash } = useAuth();

  useEffect(() => {
    if (authLoading) {
      return;
    }

    const urlHash = initialHash;
    const hasRecoveryToken = urlHash.includes("type=recovery");
    const hasError =
      urlHash.includes("error=access_denied") || urlHash.includes("error_code");

    if (hasError) {
      setIsTokenValid(false);
      setIsCheckingToken(false);
      return;
    }

    if (hasRecoveryToken) {
      supabase.auth.getSession().then(({ data }) => {
        if (data.session) {
          setIsTokenValid(true);
        } else {
          setIsTokenValid(false);
        }
        setIsCheckingToken(false);
      });
    } else {
      setIsTokenValid(false);
      setIsCheckingToken(false);
    }
  }, [authLoading, initialHash]);

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
      await supabase.auth.signOut();
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  };

  return {
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    loading,
    pageLoading: authLoading || isCheckingToken,
    success,
    isTokenValid,
    handleSubmit,
  };
}
