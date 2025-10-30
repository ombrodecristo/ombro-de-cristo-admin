import { useState, type FormEvent } from "react";
import { authService } from "../../services/authService";
import { type UserGender } from "../../types/database";
import { logService } from "../../services/logService";
import { toast } from "sonner";

export function useLandingPageViewModel() {
  const [fullName, setFullName] = useState("");
  const [gender, setGender] = useState<UserGender | "">("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!gender) {
      toast.error("Por favor, selecione o gênero.");
      return;
    }

    if (password.length < 6) {
      toast.error("A sua senha deve ter no mínimo 6 caracteres.");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("As suas senhas não coincidem.");
      return;
    }

    setLoading(true);
    const { error } = await authService.signUp(
      fullName,
      gender,
      email,
      password
    );

    setLoading(false);
    if (error) {
      let friendlyMessage = "Ocorreu um erro ao tentar criar a conta.";
      if (error.message === "User already registered") {
        friendlyMessage =
          "Este e-mail já está cadastrado. Tente fazer login ou recuperar sua senha.";
      }

      toast.error(friendlyMessage);
      await logService.logError(error, {
        component: "useLandingPageViewModel",
        context: { email: email.substring(0, 3) + "..." },
      });
    } else {
      toast.success("Cadastro realizado! Por favor, verifique seu e-mail.");
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
    handleSubmit,
  };
}
