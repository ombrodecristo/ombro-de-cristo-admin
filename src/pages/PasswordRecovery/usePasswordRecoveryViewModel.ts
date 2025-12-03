import { useState, type FormEvent, useEffect } from "react";
import { authService } from "../../services/authService";
import { logService } from "../../services/logService";
import {
  validatePasswordLength,
  validatePasswordMatch,
  validateEmail,
} from "@/lib/validators";

type UsePasswordRecoveryViewModelProps = {
  authLoading: boolean;
  initialHash: string;
};

export function usePasswordRecoveryViewModel({
  authLoading,
  initialHash,
}: UsePasswordRecoveryViewModelProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [isTokenValid, setIsTokenValid] = useState(false);
  const [isCheckingToken, setIsCheckingToken] = useState(true);
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (authLoading) return;
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
      authService.getSession().then(({ data }) => {
        setIsTokenValid(!!data.session);
        setIsCheckingToken(false);
      });
    } else {
      setIsTokenValid(false);
      setIsCheckingToken(false);
    }
  }, [authLoading, initialHash]);

  const handleEmailSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    const emailValidation = validateEmail(email);
    if (!emailValidation.isValid) {
      setError(emailValidation.message);

      return;
    }
    setLoading(true);

    const { error: recoveryError } =
      await authService.sendPasswordRecovery(email);

    setLoading(false);
    if (recoveryError) {
      setError(recoveryError.message);
      await logService.logError(recoveryError, {
        component: "usePasswordRecoveryViewModel.Email",
      });
    } else {
      setIsEmailSent(true);
    }
  };

  const handlePasswordSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    const lengthValidation = validatePasswordLength(password);
    if (!lengthValidation.isValid) {
      setError(lengthValidation.message);

      return;
    }
    const matchValidation = validatePasswordMatch(password, confirmPassword);
    if (!matchValidation.isValid) {
      setError(matchValidation.message);

      return;
    }
    setLoading(true);

    const { error: updateError } =
      await authService.updateUserPassword(password);

    setLoading(false);
    if (updateError) {
      setError(updateError.message);
      await logService.logError(updateError, {
        component: "usePasswordRecoveryViewModel.Password",
      });
    } else {
      setSuccess(true);
      await authService.signOut();
    }
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    loading,
    pageLoading: authLoading || isCheckingToken,
    success,
    isTokenValid,
    isEmailSent,
    error,
    handleEmailSubmit,
    handlePasswordSubmit,
  };
}
