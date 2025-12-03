import styled from "@emotion/styled";
import { forwardRef, useState } from "react";
import type { ReactNode } from "react";
import { Input, type InputProps } from "./Input";

const Wrapper = styled.div`
  position: relative;
  width: 100%;
`;

const ToggleButton = styled.button`
  position: absolute;
  right: 0;
  top: 0;
  height: 100%;
  width: 48px;
  background: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.theme.colors.mutedForeground};

  &:hover:not(:disabled) {
    color: ${props => props.theme.colors.mainForeground};
  }

  &:disabled {
    cursor: not-allowed;
  }
`;

interface PasswordInputProps extends InputProps {
  toggleIconShow: ReactNode;
  toggleIconHide: ReactNode;
}

export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ icon, toggleIconShow, toggleIconHide, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);

    const toggleShowPassword = () => {
      setShowPassword(prev => !prev);
    };

    return (
      <Wrapper>
        <Input
          ref={ref}
          icon={icon}
          type={showPassword ? "text" : "password"}
          {...props}
        />
        <ToggleButton
          type="button"
          onClick={toggleShowPassword}
          disabled={props.disabled}
          aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
        >
          {showPassword ? toggleIconHide : toggleIconShow}
        </ToggleButton>
      </Wrapper>
    );
  }
);

PasswordInput.displayName = "PasswordInput";
