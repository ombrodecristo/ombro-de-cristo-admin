import styled from "@emotion/styled";
import { forwardRef } from "react";
import type { TextareaHTMLAttributes } from "react";

const StyledTextarea = styled.textarea`
  min-height: 240px;
  width: 100%;
  border-radius: ${props => props.theme.radii.m}px;
  border: 1.5px solid ${props => props.theme.colors.inputBorder};
  background-color: ${props => props.theme.colors.inputBackground};
  padding: ${props => props.theme.spacing.sm}px
    ${props => props.theme.spacing.m}px;
  font-size: 16px;
  color: ${props => props.theme.colors.inputForeground};
  transition: all 0.2s;
  resize: none;
  font-family: inherit;

  &::placeholder {
    color: ${props => props.theme.colors.mutedForeground};
  }

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
    box-shadow: 0 0 0 2px ${props => props.theme.colors.primary}33;
  }

  &:disabled {
    background-color: ${props => props.theme.colors.buttonDisabledBackground};
    cursor: not-allowed;
  }
`;

export const Textarea = forwardRef<
  HTMLTextAreaElement,
  TextareaHTMLAttributes<HTMLTextAreaElement>
>((props, ref) => {
  return <StyledTextarea ref={ref} {...props} />;
});

Textarea.displayName = "Textarea";
