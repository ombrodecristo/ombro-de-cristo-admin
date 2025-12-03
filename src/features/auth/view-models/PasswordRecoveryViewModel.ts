import { type FormEvent } from "react";
import { authRepository } from "@/data/repositories/authRepository";
import { logService } from "@/shared/services/logService";
import {
  validatePasswordLength,
  validatePasswordMatch,
  validateEmail,
} from "@/lib/validators";
import { BaseViewModel } from "@/shared/view-models/BaseViewModel";

type PasswordRecoveryViewModelProps = {
  authLoading: boolean;
  initialHash: string;
};

export class PasswordRecoveryViewModel extends BaseViewModel {
  public email = "";
  public password = "";
  public confirmPassword = "";
  public loading = false;
  public success = false;
  public isTokenValid = false;
  public isCheckingToken = true;
  public isEmailSent = false;
  public error: string | null = null;
  private authLoading: boolean;
  private initialHash: string;

  constructor(props: PasswordRecoveryViewModelProps) {
    super();
    this.authLoading = props.authLoading;
    this.initialHash = props.initialHash;
    this.checkToken();
  }

  private checkToken() {
    if (this.authLoading) return;
    const hasRecoveryToken = this.initialHash.includes("type=recovery");

    const hasError =
      this.initialHash.includes("error=access_denied") ||
      this.initialHash.includes("error_code");

    if (hasError) {
      this.isTokenValid = false;
      this.isCheckingToken = false;
      this.notify();

      return;
    }

    if (hasRecoveryToken) {
      authRepository.getSession().then(({ data }) => {
        this.isTokenValid = !!data.session;
        this.isCheckingToken = false;
        this.notify();
      });
    } else {
      this.isTokenValid = false;
      this.isCheckingToken = false;
      this.notify();
    }
  }

  public setEmail = (value: string) => {
    this.email = value;
    this.error = null;
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

  public handleEmailSubmit = async (e: FormEvent) => {
    e.preventDefault();
    this.error = null;
    const emailValidation = validateEmail(this.email);
    if (!emailValidation.isValid) {
      this.error = emailValidation.message;
      this.notify();

      return;
    }
    this.loading = true;
    this.notify();

    const { error: recoveryError } = await authRepository.sendPasswordRecovery(
      this.email
    );

    this.loading = false;
    if (recoveryError) {
      this.error = recoveryError.message;
      await logService.logError(recoveryError, {
        component: "PasswordRecoveryViewModel.Email",
      });
    } else {
      this.isEmailSent = true;
    }
    this.notify();
  };

  public handlePasswordSubmit = async (e: FormEvent) => {
    e.preventDefault();
    this.error = null;
    const lengthValidation = validatePasswordLength(this.password);
    if (!lengthValidation.isValid) {
      this.error = lengthValidation.message;
      this.notify();

      return;
    }

    const matchValidation = validatePasswordMatch(
      this.password,
      this.confirmPassword
    );

    if (!matchValidation.isValid) {
      this.error = matchValidation.message;
      this.notify();

      return;
    }
    this.loading = true;
    this.notify();

    const { error: updateError } = await authRepository.updateUserPassword(
      this.password
    );

    this.loading = false;
    if (updateError) {
      this.error = updateError.message;
      await logService.logError(updateError, {
        component: "PasswordRecoveryViewModel.Password",
      });
    } else {
      this.success = true;
      await authRepository.signOut();
    }
    this.notify();
  };
}
