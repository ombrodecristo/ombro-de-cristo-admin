import { useState, type FormEvent } from "react";
import { authService } from "../../services/authService";
import { logService } from "../../services/logService";
import { toast } from "sonner";

export function useChangePasswordViewModel({
  onClose,
}: {
  onClose: () => void;
}) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

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
    const { error } = await authService.updateUserPassword(password);
    setLoading(false);
    setPassword("");
    setConfirmPassword("");

    if (error) {
      toast.error(error.message);
      await logService.logError(error, {
        component: "useChangePasswordViewModel",
      });
    } else {
      toast.success("A sua senha foi alterada com sucesso!");
      onClose();
    }
  };

  return {
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    loading,
    handleSubmit,
  };
}
