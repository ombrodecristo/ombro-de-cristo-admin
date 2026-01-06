import { BaseViewModel } from "@/shared/view-models/BaseViewModel";
import i18n from "@/core/i18n";

export enum PageState {
  Loading,
  Success,
  Error,
}

export class AuthConfirmedViewModel extends BaseViewModel {
  public pageState = PageState.Loading;

  constructor() {
    super();
  }

  public processAuthConfirmation = (
    authLoading: boolean,
    initialHash: string
  ) => {
    if (authLoading) {
      this.pageState = PageState.Loading;
      this.notify();

      return;
    }

    const hashParams = new URLSearchParams(initialHash.substring(1));
    const errorDescription = hashParams.get("error_description");
    const tokenType = hashParams.get("type");

    if (errorDescription) {
      this.pageState = PageState.Error;
    } else if (tokenType === "signup" || tokenType === "invite") {
      this.pageState = PageState.Success;
    } else {
      this.pageState = PageState.Error;
    }
    this.notify();
  };

  public get isSuccess(): boolean {
    return this.pageState === PageState.Success;
  }

  public get title(): string {
    return this.isSuccess
      ? i18n.t("auth_confirmed_title_success")
      : i18n.t("auth_confirmed_title_error");
  }

  public get message(): string {
    return this.isSuccess
      ? i18n.t("auth_confirmed_message_success")
      : i18n.t("auth_confirmed_message_error");
  }
}
