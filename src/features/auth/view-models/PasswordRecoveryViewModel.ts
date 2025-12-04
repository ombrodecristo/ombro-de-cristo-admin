import { authRepository } from "@/data/repositories/authRepository";
import { logRepository } from "@/data/repositories/logRepository";
import {
  validatePasswordLength,
  validatePasswordMatch,
} from "@/core/lib/validators";
import { BaseViewModel } from "@/shared/view-models/BaseViewModel";
import type { User } from "@/core/types/database";

export class PasswordRecoveryViewModel extends BaseViewModel {
  public password = "";
  public confirmPassword = "";
  public loading = false;
  public success = false;
  public showSuccessMessage = false;
  public isTokenValid = false;
  public isTokenInvalid = false;
  public isCheckingToken = true;
  public error: string | null = null;

  constructor() {
    super();
  }

  public evaluateAuthState = (
    user: User | null,
    authLoading: boolean,
    hash: string
  ) => {
    if (authLoading) {
      this.isCheckingToken = true;
      this.notify();

      return;
    }

    const hasError = hash.includes("error=");

    if (hasError) {
      this.isTokenValid = false;
      this.isTokenInvalid = true;
    } else if (user) {
      this.isTokenValid = true;
      this.isTokenInvalid = false;
    } else {
      this.isTokenValid = false;
      this.isTokenInvalid = false;
    }

    this.isCheckingToken = false;
    this.notify();
  };

  public setPassword = (value: string) => {
    this.password = value;
    this.error = null;
    this.notify();
  };

  public setConfirmPassword = (value: string) => {
    this.confirmPassword = value;
    this.error = null;
    this.notify();
  };

  public async handlePasswordSubmit() {
    this.error = null;
    const lengthValidation = validatePasswordLength(this.password);
    if (!lengthValidation.isValid) {
      this.error = lengthValidation.message;
      this.notify();

      return { error: lengthValidation.message };
    }

    const matchValidation = validatePasswordMatch(
      this.password,
      this.confirmPassword
    );

    if (!matchValidation.isValid) {
      this.error = matchValidation.message;
      this.notify();

      return { error: matchValidation.message };
    }

    this.loading = true;
    this.notify();

    const { error: updateError } = await authRepository.updateUserPassword(
      this.password
    );

    this.loading = false;
    if (updateError) {
      this.error =
        "Não foi possível alterar a senha. O link pode ter expirado.";
      await logRepository.logError(updateError, {
        component: "PasswordRecoveryViewModel.Password",
      });
      this.notify();

      return { error: this.error };
    } else {
      this.success = true;
      this.showSuccessMessage = true;
      await authRepository.signOut();
      this.notify();

      return { error: null };
    }
  }
}
