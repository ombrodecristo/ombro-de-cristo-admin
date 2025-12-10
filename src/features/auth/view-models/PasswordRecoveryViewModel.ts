import { authRepository } from "@/data/repositories/authRepository";
import { logService } from "@/shared/services/logService";
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
  public passwordError: string | null = null;
  public confirmPasswordError: string | null = null;

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

    const params = new URLSearchParams(hash.substring(1));
    const tokenType = params.get("type");
    const errorDescription = params.get("error_description");

    if (errorDescription) {
      this.isTokenValid = false;
      this.isTokenInvalid = true;
    } else if (user && tokenType === "recovery") {
      this.isTokenValid = true;
      this.isTokenInvalid = false;
    } else {
      this.isTokenValid = false;
      this.isTokenInvalid = !user;
    }

    this.isCheckingToken = false;
    this.notify();
  };

  public setPassword = (value: string) => {
    this.password = value;
    this.passwordError = null;
    this.confirmPasswordError = null;
    this.notify();
  };

  public setConfirmPassword = (value: string) => {
    this.confirmPassword = value;
    this.confirmPasswordError = null;
    this.notify();
  };

  public async handlePasswordSubmit() {
    this.passwordError = null;
    this.confirmPasswordError = null;
    const lengthValidation = validatePasswordLength(this.password);
    if (!lengthValidation.isValid) {
      this.passwordError = lengthValidation.message;
      this.notify();

      return { error: lengthValidation.message };
    }

    const matchValidation = validatePasswordMatch(
      this.password,
      this.confirmPassword
    );

    if (!matchValidation.isValid) {
      this.confirmPasswordError = matchValidation.message;
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
      this.passwordError =
        "Não foi possível alterar a senha. O link pode ter expirado.";
      await logService.logError(updateError, {
        component: "PasswordRecoveryViewModel.Password",
      });
      this.notify();

      return { error: this.passwordError };
    } else {
      this.success = true;
      this.showSuccessMessage = true;
      await authRepository.signOut();
      this.notify();

      return { error: null };
    }
  }
}
