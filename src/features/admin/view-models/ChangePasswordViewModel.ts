import { type FormEvent } from "react";
import { authRepository } from "@/data/repositories/authRepository";
import { logService } from "@/shared/services/logService";
import {
  validatePasswordLength,
  validatePasswordMatch,
} from "@/lib/validators";
import { BaseViewModel } from "@/shared/view-models/BaseViewModel";

export class ChangePasswordViewModel extends BaseViewModel {
  public password = "";
  public confirmPassword = "";
  public loading = false;
  public error: string | null = null;
  public success = false;
  private onClose: () => void;

  constructor({ onClose }: { onClose: () => void }) {
    super();
    this.onClose = onClose;
  }

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

  public handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    this.error = null;
    this.success = false;
    this.notify();

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

    const { error: authError } = await authRepository.updateUserPassword(
      this.password
    );

    this.loading = false;

    if (authError) {
      this.error = authError.message;
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
