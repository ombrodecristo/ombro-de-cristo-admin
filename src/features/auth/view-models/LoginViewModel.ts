import { authRepository } from "@/data/repositories/authRepository";
import { logRepository } from "@/data/repositories/logRepository";
import type { User } from "@/core/types/database";
import { validateEmail } from "@/core/lib/validators";
import { BaseViewModel } from "@/shared/view-models/BaseViewModel";

type LoginResult = {
  success: boolean;
  error?: string;
};

export class LoginViewModel extends BaseViewModel {
  public email = "";
  public password = "";
  public loading = false;
  public emailError?: string;
  public passwordError?: string;
  public isLockedOnError = false;

  public setEmail = (value: string) => {
    this.email = value;
    this.isLockedOnError = false;
    this.resetErrors();
  };

  public setPassword = (value: string) => {
    this.password = value;
    this.isLockedOnError = false;
    this.resetErrors();
  };

  private resetErrors = () => {
    this.emailError = undefined;
    this.passwordError = undefined;
    this.notify();
  };

  public async handleLogin(): Promise<LoginResult> {
    this.loading = true;
    this.resetErrors();
    this.notify();

    const emailValidation = validateEmail(this.email);
    if (!emailValidation.isValid) {
      this.emailError = emailValidation.message;
      this.loading = false;
      this.notify();

      return { success: false, error: emailValidation.message };
    }

    if (!this.password.trim()) {
      this.passwordError = "Informe sua senha.";
      this.loading = false;
      this.notify();

      return { success: false, error: "Informe sua senha." };
    }

    const { data, error } = await authRepository.signIn(
      this.email,
      this.password
    );

    this.loading = false;

    if (error) {
      this.password = "";
      this.isLockedOnError = true;
      this.notify();

      await logRepository.logError(error, {
        component: "LoginViewModel",
        context: { email: this.email.substring(0, 3) + "..." },
      });

      return {
        success: false,
        error: error.message,
      };
    }

    if (data?.user) {
      const user = data.user as User;
      const role = user.app_metadata?.role;

      if (role !== "ADMIN") {
        const errorMessage = "Acesso restrito à Equipe de Administração.";
        await authRepository.signOut();
        this.notify();

        return { success: false, error: errorMessage };
      }

      this.notify();

      return { success: true };
    }

    const unknownError = "Ocorreu um erro desconhecido durante o login.";
    this.notify();

    return { success: false, error: unknownError };
  }
}
