import i18n from "@/core/i18n";

export const PASSWORD_MIN_LENGTH = 6;
export const FULL_NAME_MIN_LENGTH = 3;
export const CHURCH_NAME_MIN_LENGTH = 2;
export const DEVOTIONAL_TITLE_MIN_LENGTH = 3;
export const DEVOTIONAL_CONTENT_MIN_LENGTH = 10;
export const LIBRARY_TITLE_MIN_LENGTH = 3;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;

export const validateEmail = (
  email: string
): { isValid: true } | { isValid: false; message: string } => {
  if (!email.trim() || !emailRegex.test(email)) {
    return {
      isValid: false,
      message: i18n.t("validation_email_invalid"),
    };
  }

  return { isValid: true };
};

export const validatePasswordLength = (
  password: string
): { isValid: true } | { isValid: false; message: string } => {
  if (password.length < PASSWORD_MIN_LENGTH) {
    return {
      isValid: false,
      message: i18n.t("validation_password_min_length", {
        count: PASSWORD_MIN_LENGTH,
      }),
    };
  }

  return { isValid: true };
};

export const validatePasswordMatch = (
  password: string,
  confirm: string
): { isValid: true } | { isValid: false; message: string } => {
  if (password !== confirm) {
    return {
      isValid: false,
      message: i18n.t("validation_password_mismatch"),
    };
  }

  return { isValid: true };
};

export const validateFullName = (
  name: string
): { isValid: true } | { isValid: false; message: string } => {
  if (name.trim().length < FULL_NAME_MIN_LENGTH) {
    return {
      isValid: false,
      message: i18n.t("validation_fullname_min_length", {
        count: FULL_NAME_MIN_LENGTH,
      }),
    };
  }

  return { isValid: true };
};

export const validateChurchName = (
  name: string
): { isValid: true } | { isValid: false; message: string } => {
  if (name.trim().length < CHURCH_NAME_MIN_LENGTH) {
    return {
      isValid: false,
      message: i18n.t("validation_church_name_min_length", {
        count: CHURCH_NAME_MIN_LENGTH,
      }),
    };
  }

  return { isValid: true };
};

export const validateDevotionalTitle = (
  title: string
): { isValid: true } | { isValid: false; message: string } => {
  if (title.trim().length < DEVOTIONAL_TITLE_MIN_LENGTH) {
    return {
      isValid: false,
      message: i18n.t("validation_devotional_title_min_length", {
        count: DEVOTIONAL_TITLE_MIN_LENGTH,
      }),
    };
  }

  return { isValid: true };
};

export const validateDevotionalContent = (
  content: string
): { isValid: true } | { isValid: false; message: string } => {
  if (content.trim().length < DEVOTIONAL_CONTENT_MIN_LENGTH) {
    return {
      isValid: false,
      message: i18n.t("validation_devotional_content_min_length", {
        count: DEVOTIONAL_CONTENT_MIN_LENGTH,
      }),
    };
  }

  return { isValid: true };
};

export const validateLibraryItemTitle = (
  title: string
): { isValid: true } | { isValid: false; message: string } => {
  if (title.trim().length < LIBRARY_TITLE_MIN_LENGTH) {
    return {
      isValid: false,
      message: i18n.t("validation_library_title_min_length", {
        count: LIBRARY_TITLE_MIN_LENGTH,
      }),
    };
  }

  return { isValid: true };
};

export const validateUrl = (
  url: string
): { isValid: true } | { isValid: false; message: string } => {
  if (!urlRegex.test(url)) {
    return {
      isValid: false,
      message: i18n.t("validation_url_invalid"),
    };
  }

  return { isValid: true };
};
