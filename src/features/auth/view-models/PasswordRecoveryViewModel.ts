import { authRepository } from "@/data/repositories/authRepository";
import { logRepository } from "@/data/repositories/logRepository";
import {
  validatePasswordLength,
  validatePasswordMatch,
} from "@/core/lib/validators";
import { BaseViewModel } from "@/shared/view-models/BaseViewModel";

type PasswordRecoveryViewModelProps = {
  authLoading: boolean;
  initialHash: string;
};

export class PasswordRecoveryViewModel extends BaseViewModel {
  public password = "";
  public confirmPassword = "";
  public loading = false;
  public success = false;
  public isTokenValid = false;
  public isTokenInvalid = false;
  public isCheckingToken = true;
  public error: string | null = null;
  private authLoading: boolean;
  private initialHash: string;

  constructor(props: PasswordRecoveryViewModelProps) {
    super();
    this.authLoading = props.authLoading;
    this.initialHash = props.initialHash;
  }

  public checkToken = async () => {
    if (this.authLoading) return;
    this.isCheckingToken = true;
    this.notify();

    const hasRecoveryToken = this.initialHash.includes("type=recovery");
    const hasError = this.initialHash.includes("error=");

    this.isTokenInvalid = !hasRecoveryToken || hasError;

    if (hasRecoveryToken && !hasError) {
      const { data } = await authRepository.getSession();
      this.isTokenValid = !!data?.session;
    } else {
      this.isTokenValid = false;
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
      await authRepository.signOut();
      this.notify();

      return { error: null };
    }
  }
}
