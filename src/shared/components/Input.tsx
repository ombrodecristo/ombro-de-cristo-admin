import { forwardRef, useState } from "react";
import type { InputHTMLAttributes, ReactNode } from "react";
import styled from "@emotion/styled";
import { FiEye, FiEyeOff } from "react-icons/fi";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const InputContainer = styled.div<{ hasError: boolean; isFocused: boolean }>`
  position: relative;
  display: flex;
  align-items: center;
  height: 56px;
  width: 100%;
  background-color: ${props => props.theme.colors.inputBackground};
  border-radius: ${props => props.theme.borderRadii.m}px;
  border: 1.5px solid
    ${props =>
      props.hasError
        ? props.theme.colors.destructiveBackground
        : props.isFocused
          ? props.theme.colors.primaryBackground
          : props.theme.colors.inputBorder};
  transition:
    border-color 0.2s,
    box-shadow 0.2s;
  box-shadow: ${props =>
    props.isFocused && !props.hasError
      ? `0 0 0 2px ${props.theme.colors.primaryBackground}33`
      : "none"};
`;

const StyledInput = styled.input<{ hasIcon: boolean }>`
  flex: 1;
  height: 100%;
  border: none;
  background: transparent;
  padding: 0 ${props => props.theme.spacing.m}px;
  padding-left: ${props =>
    props.hasIcon
      ? `calc(${props.theme.spacing.m}px + 22px + ${props.theme.spacing.s}px)`
      : `${props.theme.spacing.m}px`};
  font-family: ${props => props.theme.textVariants.body.fontFamily};
  font-size: 16px;
  color: ${props => props.theme.colors.inputForeground};

  &::placeholder {
    color: ${props => props.theme.colors.mutedForeground};
  }

  &:focus {
    outline: none;
  }

  &:disabled {
    background-color: transparent;
    cursor: not-allowed;
  }
`;

const IconWrapper = styled.div<{ hasError: boolean; isFocused: boolean }>`
  position: absolute;
  left: ${props => props.theme.spacing.m}px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props =>
    props.hasError
      ? props.theme.colors.destructiveBackground
      : props.isFocused
        ? props.theme.colors.primaryBackground
        : props.theme.colors.mutedForeground};
  transition: color 0.2s;
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
`;

const ErrorMessage = styled.p`
  margin-top: ${props => props.theme.spacing.s}px;
  font-family: ${props => props.theme.textVariants.error.fontFamily};
  font-weight: ${props => props.theme.textVariants.error.fontWeight};
  font-size: ${props => props.theme.textVariants.error.fontSize};
  color: ${props => props.theme.colors.destructiveBackground};
`;

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  icon?: ReactNode;
  isPassword?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ error, icon, isPassword, ...props }, ref) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isFocused, setIsFocused] = useState(false);

    const finalType = isPassword
      ? isPasswordVisible
        ? "text"
        : "password"
      : props.type;

    return (
      <Wrapper>
        <InputContainer hasError={!!error} isFocused={isFocused}>
          {icon && (
            <IconWrapper hasError={!!error} isFocused={isFocused}>
              {icon}
            </IconWrapper>
          )}
          <StyledInput
            ref={ref}
            hasIcon={!!icon}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            type={finalType}
            {...props}
          />
          {isPassword && (
            <ToggleButton
              type="button"
              onClick={() => setIsPasswordVisible(prev => !prev)}
            >
              {isPasswordVisible ? <FiEyeOff size={22} /> : <FiEye size={22} />}
            </ToggleButton>
          )}
        </InputContainer>
        {error && <ErrorMessage>{error}</ErrorMessage>}
      </Wrapper>
    );
  }
);
