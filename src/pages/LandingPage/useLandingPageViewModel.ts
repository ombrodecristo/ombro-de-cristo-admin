import { useState, type FormEvent } from "react";
import { authService } from "../../services/authService";
import { type UserGender } from "../../types/database";

export function useLandingPageViewModel() {
  const [fullName, setFullName] = useState("");
  const [gender, setGender] = useState<UserGender | "">("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!gender) {
      setError("Por favor, selecione o gênero.");
      return;
    }
    if (password.length < 6) {
      setError("A senha deve ter no mínimo 6 caracteres.");
      return;
    }
    if (password !== confirmPassword) {
      setError("As senhas não conferem.");
      return;
    }

    setLoading(true);
    setSuccess(false);

    const { error } = await authService.signUp(
      fullName,
      gender,
      email,
      password
    );

    setLoading(false);
    if (error) {
      if (error.message === "User already registered") {
        setError(
          "Este e-mail já está cadastrado. Tente fazer login ou recuperar sua senha."
        );
      } else {
        setError(error.message);
      }
    } else {
      setSuccess(true);
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
    success,
    handleSubmit,
  };
}
