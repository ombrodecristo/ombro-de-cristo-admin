import styled from "@emotion/styled";
import type { HTMLAttributes } from "react";

const LogoContainer = styled.div<{ variant: "light" | "dark" }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none;
  gap: ${props => props.theme.spacing.none}px;

  h1 {
    color: ${props =>
      props.variant === "light"
        ? props.theme.colors.white
        : props.theme.colors.primary};
    font-family: ${props => props.theme.textVariants.header.fontFamily};
    font-weight: ${props => props.theme.textVariants.header.fontWeight};
    font-size: 32px;
    line-height: 36px;
    margin-top: -${props => props.theme.spacing.s}px;
    text-align: center;
  }

  p {
    font-family: ${props => props.theme.textVariants.caption.fontFamily};
    font-size: 16px;
    font-weight: 600;
    color: ${props =>
      props.variant === "light"
        ? props.theme.colors.white
        : props.theme.colors.mutedForeground};
    opacity: 0.95;
    margin-top: ${props => props.theme.spacing.xs}px;
    text-align: center;
  }
`;

const LogoImageContainer = styled.div`
  width: 160px;
  height: 160px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;
`;

const LogoImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

interface LogoProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "light" | "dark";
}

export function Logo({ variant = "dark", ...rest }: LogoProps) {
  return (
    <LogoContainer variant={variant} {...rest}>
      <LogoImageContainer>
        <LogoImage src="/logo.png" alt="Ombro de Cristo Logo" />
      </LogoImageContainer>
      <h1>Ombro de Cristo</h1>
      <p>Sua missão, fortalecida pela mentoria.</p>
    </LogoContainer>
  );
}
