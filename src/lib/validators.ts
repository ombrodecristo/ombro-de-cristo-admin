export const PASSWORD_MIN_LENGTH = 6;

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
