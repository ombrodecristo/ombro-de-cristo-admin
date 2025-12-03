import styled from "@emotion/styled";
import { forwardRef, useState } from "react";
import type { InputHTMLAttributes, ReactNode } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";

const InputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
`;

const StyledInput = styled.input<{ hasIcon: boolean; hasError: boolean }>`
  height: 56px;
  width: 100%;
  border-radius: ${props => props.theme.borderRadii.m}px;
  border: 1.5px solid
    ${props =>
      props.hasError
        ? props.theme.colors.destructiveBackground
        : props.theme.colors.inputBorder};
  background-color: ${props => props.theme.colors.inputBackground};
  padding: 0 ${props => props.theme.spacing.m}px;
  padding-left: ${props =>
    props.hasIcon
      ? `calc(${props.theme.spacing.m}px + 22px + ${props.theme.spacing.s}px)`
      : `${props.theme.spacing.m}px`};
  font-size: ${props => props.theme.textVariants.body.fontSize}px;
  color: ${props => props.theme.colors.inputForeground};
  transition: all 0.2s;

  &::placeholder {
    color: ${props => props.theme.colors.mutedForeground};
  }

  &:focus {
    outline: none;
    border-color: ${props =>
      props.hasError
        ? props.theme.colors.destructiveBackground
        : props.theme.colors.primary};
    box-shadow: 0 0 0 2px
      ${props =>
        props.hasError
          ? props.theme.colors.destructiveTransparentBackground
          : props.theme.colors.primary}33;
  }

  &:focus + .icon-container > svg,
  &:focus ~ .icon-container > svg,
  &:focus ~ button > svg {
    color: ${props =>
      props.hasError
        ? props.theme.colors.destructiveBackground
        : props.theme.colors.primary};
  }

  &:disabled {
    background-color: ${props => props.theme.colors.buttonDisabledBackground};
    cursor: not-allowed;
  }
`;

const IconContainer = styled.div<{ hasError: boolean }>`
  position: absolute;
  left: ${props => props.theme.spacing.m}px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
  & > svg {
    color: ${props =>
      props.hasError
        ? props.theme.colors.destructiveBackground
        : props.theme.colors.mutedForeground};
    transition: color 0.2s;
  }
`;

const ToggleButton = styled.button`
  position: absolute;
  right: 0;
  top: 0;
  height: 100%;
  width: 56px;
  background: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.theme.colors.mutedForeground};
  transition: color 0.2s;

  &:hover:not(:disabled) {
    color: ${props => props.theme.colors.mainForeground};
  }
`;

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: ReactNode;
  isPassword?: boolean;
  error?: string | null;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ icon, isPassword = false, error, ...props }, ref) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const finalType = isPassword
      ? isPasswordVisible
        ? "text"
        : "password"
      : props.type;

    const togglePasswordVisibility = () => {
      setIsPasswordVisible(prev => !prev);
    };

    const hasError = !!error;

    return (
      <div>
        <InputWrapper>
          {icon && (
            <IconContainer className="icon-container" hasError={hasError}>
              {icon}
            </IconContainer>
          )}
          <StyledInput
            ref={ref}
            hasIcon={!!icon}
            hasError={hasError}
            type={finalType}
            {...props}
          />
          {isPassword && (
            <ToggleButton
              type="button"
              onClick={togglePasswordVisibility}
              disabled={props.disabled}
            >
              {isPasswordVisible ? <FiEyeOff size={22} /> : <FiEye size={22} />}
            </ToggleButton>
          )}
        </InputWrapper>
        {error && (
          <p
            style={{
              marginTop: "8px",
              fontSize: "14px",
              color: "var(--color-destructive)",
            }}
          >
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
