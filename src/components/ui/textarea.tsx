import styled from "@emotion/styled";
import { forwardRef } from "react";
import type { TextareaHTMLAttributes } from "react";

const StyledTextarea = styled.textarea`
  min-height: 120px;
  width: 100%;
  border-radius: ${props => props.theme.borderRadii.m}px;
  border: 1.5px solid ${props => props.theme.colors.inputBorder};
  background-color: ${props => props.theme.colors.inputBackground};
  padding: ${props => props.theme.spacing.sm}px
    ${props => props.theme.spacing.m}px;
  font-size: ${props => props.theme.textVariants.body.fontSize}px;
  color: ${props => props.theme.colors.inputForeground};
  transition: border-color 0.2s;
  resize: vertical;

  &::placeholder {
    color: ${props => props.theme.colors.mutedForeground};
  }

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
  }

  &:disabled {
    background-color: ${props => props.theme.colors.mutedBackground};
    opacity: 0.7;
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
