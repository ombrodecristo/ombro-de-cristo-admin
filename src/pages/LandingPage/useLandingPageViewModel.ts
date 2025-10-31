import { useState, type FormEvent } from "react";
import { authService } from "../../services/authService";
import { type UserGender } from "../../types/database";
import { logService } from "../../services/logService";
import {
  validatePasswordLength,
  validatePasswordMatch,
} from "@/lib/validators";

export function useLandingPageViewModel() {
  const [fullName, setFullName] = useState("");
  const [gender, setGender] = useState<UserGender | "">("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);

    if (!gender) {
      setError("Por favor, selecione o gênero.");
      return;
    }

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
    const { error: signUpError } = await authService.signUp(
      fullName,
      gender,
      email,
      password
    );

    setLoading(false);

    if (signUpError) {
      let friendlyMessage = "Ocorreu um erro ao tentar criar a conta.";
      if (signUpError.message === "User already registered") {
        friendlyMessage =
          "Este e-mail já está cadastrado. Tente fazer login ou recuperar sua senha.";
      }

      setError(friendlyMessage);
      await logService.logError(signUpError, {
        component: "useLandingPageViewModel",
        context: { email: email.substring(0, 3) + "..." },
      });
    } else {
      setSuccessMessage("Cadastro realizado! Por favor, verifique seu e-mail.");
      setFullName("");
      setGender("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
    }
  };

  return {
    fullName,
    setFullName,
    gender,
    setGender,
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    loading,
    error,
    successMessage,
    handleSubmit,
  };
}
