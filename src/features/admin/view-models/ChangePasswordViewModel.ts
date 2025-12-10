import { type FormEvent } from "react";
import { authRepository } from "@/data/repositories/authRepository";
import { logService } from "@/shared/services/logService";
import {
  validatePasswordLength,
  validatePasswordMatch,
} from "@/core/lib/validators";
import { BaseViewModel } from "@/shared/view-models/BaseViewModel";

export class ChangePasswordViewModel extends BaseViewModel {
  public password = "";
  public confirmPassword = "";
  public loading = false;
  public passwordError: string | null = null;
  public confirmPasswordError: string | null = null;
  public success = false;
  private onClose: () => void;

  constructor({ onClose }: { onClose: () => void }) {
    super();
    this.onClose = onClose;
  }

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

  public handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    this.passwordError = null;
    this.confirmPasswordError = null;
    this.success = false;
    this.notify();

    const lengthValidation = validatePasswordLength(this.password);
    if (!lengthValidation.isValid) {
      this.passwordError = lengthValidation.message;
      this.notify();

      return;
    }

    const matchValidation = validatePasswordMatch(
      this.password,
      this.confirmPassword
    );

    if (!matchValidation.isValid) {
      this.confirmPasswordError = matchValidation.message;
      this.notify();

      return;
    }

    this.loading = true;
    this.notify();

    const { error: authError } = await authRepository.updateUserPassword(
      this.password
    );

    this.loading = false;

    if (authError) {
      this.passwordError = authError.message;
      await logService.logError(authError, {
        component: "ChangePasswordViewModel",
      });
    } else {
      this.success = true;
      this.password = "";
      this.confirmPassword = "";
      this.onClose();
    }
    this.notify();
  };
}
