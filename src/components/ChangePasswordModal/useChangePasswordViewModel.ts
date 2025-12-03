import { useState, type FormEvent } from "react";
import { authService } from "../../services/authService";
import { logService } from "../../services/logService";
import {
  validatePasswordLength,
  validatePasswordMatch,
} from "@/lib/validators";

export function useChangePasswordViewModel({
  onClose,
}: {
  onClose: () => void;
}) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

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
    const { error: authError } = await authService.updateUserPassword(password);
    setLoading(false);

    if (authError) {
      setError(authError.message);
      await logService.logError(authError, {
        component: "useChangePasswordViewModel",
      });
    } else {
      setSuccess(true);
      setPassword("");
      setConfirmPassword("");
      onClose();
    }
  };

  return {
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    loading,
    error,
    success,
    handleSubmit,
  };
}
