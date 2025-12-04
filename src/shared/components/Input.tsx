import { forwardRef, useState } from "react";
import type { InputHTMLAttributes, ReactNode } from "react";
import styled from "@emotion/styled";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const InputContainer = styled.div<{
  hasError: boolean;
  isFocused: boolean;
  disabled?: boolean;
}>`
  position: relative;
  display: flex;
  align-items: center;
  height: 56px;
  width: 100%;
  background-color: ${props =>
    props.disabled
      ? props.theme.colors.mutedBackground
      : props.theme.colors.inputBackground};
  border-radius: ${props => props.theme.radii.m}px;
  border-width: ${props => (props.isFocused ? "2px" : "1px")};
  border-style: solid;
  border-color: ${props =>
    props.hasError
      ? props.theme.colors.destructiveBackground
      : props.isFocused
        ? props.theme.colors.primaryBackground
        : props.theme.colors.inputBorder};
  transition:
    border-color 0.2s,
    background-color 0.2s;
  overflow: hidden;
  opacity: ${props => (props.disabled ? 0.7 : 1)};
`;

const StyledInput = styled.input<{ hasIcon: boolean; isFocused: boolean }>`
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
  padding-top: ${props =>
    props.isFocused ? "1px" : "0"}; // Adjust for border width change
  padding-bottom: ${props =>
    props.isFocused ? "1px" : "0"}; // Adjust for border width change

  &::placeholder {
    color: ${props => props.theme.colors.mutedForeground};
  }

  &:focus {
    outline: none;
  }

  &:disabled {
    cursor: not-allowed;
  }
`;

const IconWrapper = styled.div<{
  hasError: boolean;
  isFocused: boolean;
  disabled?: boolean;
}>`
  position: absolute;
  left: ${props => props.theme.spacing.m}px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props =>
    props.disabled
      ? props.theme.colors.mutedForeground
      : props.hasError
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

  &:disabled {
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.p(props => ({
  ...props.theme.textVariants.error,
  marginTop: props.theme.spacing.s,
}));

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  icon?: ReactNode;
  isPassword?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ error, icon, isPassword, disabled, ...props }, ref) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isFocused, setIsFocused] = useState(false);

    const finalType = isPassword
      ? isPasswordVisible
        ? "text"
        : "password"
      : props.type;

    return (
      <Wrapper>
        <InputContainer
          hasError={!!error}
          isFocused={isFocused && !disabled}
          disabled={disabled}
        >
          {icon && (
            <IconWrapper
              hasError={!!error}
              isFocused={isFocused && !disabled}
              disabled={disabled}
            >
              {icon}
            </IconWrapper>
          )}
          <StyledInput
            ref={ref}
            hasIcon={!!icon}
            isFocused={isFocused && !disabled}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            type={finalType}
            disabled={disabled}
            {...props}
          />
          {isPassword && (
            <ToggleButton
              type="button"
              onClick={() => setIsPasswordVisible(prev => !prev)}
              disabled={disabled}
            >
              {isPasswordVisible ? (
                <IoEyeOffOutline size={22} />
              ) : (
                <IoEyeOutline size={22} />
              )}
            </ToggleButton>
          )}
        </InputContainer>
        {error && <ErrorMessage>{error}</ErrorMessage>}
      </Wrapper>
    );
  }
);
