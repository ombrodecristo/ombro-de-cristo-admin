import styled from "@emotion/styled";
import { forwardRef } from "react";
import type { TextareaHTMLAttributes } from "react";

const Wrapper = styled.div`
  width: 100%;
`;

const StyledTextarea = styled.textarea<{ hasError: boolean }>`
  min-height: 250px;
  width: 100%;
  border-radius: ${props => props.theme.radii.m}px;
  border: 1.5px solid
    ${props =>
      props.hasError
        ? props.theme.colors.destructiveBackground
        : props.theme.colors.inputBorder};
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
    border-color: ${props =>
      props.hasError
        ? props.theme.colors.destructiveBackground
        : props.theme.colors.primary};
    box-shadow: 0 0 0 2px
      ${props =>
        props.hasError
          ? `${props.theme.colors.destructiveBackground}33`
          : `${props.theme.colors.primary}33`};
  }

  &:disabled {
    background-color: ${props => props.theme.colors.buttonDisabledBackground};
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.p(props => ({
  ...props.theme.textVariants.error,
  marginTop: props.theme.spacing.s,
}));

export interface TextareaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ error, ...props }, ref) => {
    return (
      <Wrapper>
        <StyledTextarea ref={ref} hasError={!!error} {...props} />
        {error && <ErrorMessage>{error}</ErrorMessage>}
      </Wrapper>
    );
  }
);
