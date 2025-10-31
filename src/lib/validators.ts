export const PASSWORD_MIN_LENGTH = 6;
export const CHURCH_NAME_MIN_LENGTH = 2;
export const DEVOTIONAL_TITLE_MIN_LENGTH = 3;
export const DEVOTIONAL_CONTENT_MIN_LENGTH = 10;

export const validatePasswordLength = (
  password: string
): { isValid: true } | { isValid: false; message: string } => {
  if (password.length < PASSWORD_MIN_LENGTH) {
    return {
      isValid: false,
      message: `A senha deve ter no mínimo ${PASSWORD_MIN_LENGTH} caracteres.`,
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
      message: "As suas senhas não coincidem.",
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
      message: `O nome da igreja deve ter no mínimo ${CHURCH_NAME_MIN_LENGTH} caracteres.`,
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
      message: `O título deve ter no mínimo ${DEVOTIONAL_TITLE_MIN_LENGTH} caracteres.`,
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
      message: `O conteúdo deve ter no mínimo ${DEVOTIONAL_CONTENT_MIN_LENGTH} caracteres.`,
    };
  }
  return { isValid: true };
};
