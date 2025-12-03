import styled from "@emotion/styled";
import { forwardRef } from "react";
import type { InputHTMLAttributes, ReactNode } from "react";

const InputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
`;

const StyledInput = styled.input<{ hasIcon: boolean }>`
  height: 48px;
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
  &:focus ~ .icon-container > svg {
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

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ icon, ...props }, ref) => {
    return (
      <InputWrapper>
        {icon && (
          <IconContainer className="icon-container">{icon}</IconContainer>
        )}
        <StyledInput ref={ref} hasIcon={!!icon} {...props} />
      </InputWrapper>
    );
  }
);

Input.displayName = "Input";
