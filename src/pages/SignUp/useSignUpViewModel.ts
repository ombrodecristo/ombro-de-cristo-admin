import { useState, type FormEvent } from "react";
import { authService } from "../../services/authService";
import { type UserGender } from "../../types/database";
import { logService } from "../../services/logService";
import {
  validatePasswordLength,
  validatePasswordMatch,
} from "@/lib/validators";

export function useSignUpViewModel() {
  const [fullName, setFullName] = useState("");
  const [gender, setGender] = useState<UserGender | "">("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);

    if (!gender) {
      setError("Selecione seu gênero.");
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

    if (!acceptedTerms) {
      setError("É preciso aceitar os termos para criar sua conta.");
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
      if (signUpError.message.includes("User already registered")) {
        friendlyMessage = "Este e-mail já está em uso. Tente fazer login.";
      }

      setError(friendlyMessage);
      await logService.logError(signUpError, {
        component: "useSignUpViewModel",
        context: { email: email.substring(0, 3) + "..." },
      });
    } else {
      setSuccessMessage(
        "Quase lá! Enviamos um link de ativação para o seu e-mail."
      );
      setFullName("");
      setGender("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setAcceptedTerms(false);
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
    acceptedTerms,
    setAcceptedTerms,
    loading,
    error,
    successMessage,
    handleSubmit,
  };
}
