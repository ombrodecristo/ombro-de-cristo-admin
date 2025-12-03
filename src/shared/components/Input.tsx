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

const StyledInput = styled.input<{ hasIcon: boolean }>`
  height: 56px;
  width: 100%;
  border-radius: ${props => props.theme.borderRadii.m}px;
  border: 1.5px solid ${props => props.theme.colors.inputBorder};
  background-color: ${props => props.theme.colors.inputBackground};
  padding: 0 ${props => props.theme.spacing.m}px;
  padding-left: ${props =>
    props.hasIcon
      ? `${props.theme.spacing.xl + props.theme.spacing.s}px`
      : `${props.theme.spacing.m}px`};
  font-size: ${props => props.theme.textVariants.body.fontSize}px;
  color: ${props => props.theme.colors.inputForeground};
  transition: border-color 0.2s;

  &::placeholder {
    color: ${props => props.theme.colors.mutedForeground};
  }

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
  }

  &:focus + .icon-container > svg,
  &:focus ~ .icon-container > svg,
  &:focus ~ button > svg {
    color: ${props => props.theme.colors.primary};
  }

  &:disabled {
    background-color: ${props => props.theme.colors.mutedBackground};
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

const IconContainer = styled.div`
  position: absolute;
  left: ${props => props.theme.spacing.m}px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
  & > svg {
    color: ${props => props.theme.colors.mutedForeground};
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

  &:disabled {
    cursor: not-allowed;
  }
`;

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: ReactNode;
  isPassword?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ icon, isPassword = false, ...props }, ref) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const finalType = isPassword
      ? isPasswordVisible
        ? "text"
        : "password"
      : props.type;

    const togglePasswordVisibility = () => {
      setIsPasswordVisible(prev => !prev);
    };

    return (
      <InputWrapper>
        {icon && (
          <IconContainer className="icon-container">{icon}</IconContainer>
        )}
        <StyledInput ref={ref} hasIcon={!!icon} type={finalType} {...props} />
        {isPassword && (
          <ToggleButton
            type="button"
            onClick={togglePasswordVisibility}
            disabled={props.disabled}
          >
            {isPasswordVisible ? <FiEyeOff size={20} /> : <FiEye size={20} />}
          </ToggleButton>
        )}
      </InputWrapper>
    );
  }
);

Input.displayName = "Input";
