import styled from "@emotion/styled";
import type { HTMLAttributes } from "react";

const CardStyled = styled.div`
  background-color: ${props => props.theme.colors.cardBackground};
  color: ${props => props.theme.colors.cardForeground};
  border-radius: ${props => props.theme.borderRadii.l}px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  border: 1px solid ${props => props.theme.colors.border};
`;

const CardHeaderStyled = styled.div`
  padding: ${props => props.theme.spacing.l}px;
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.s}px;
  align-items: center;
`;

const CardTitleStyled = styled.h1`
  font-family: ${props => props.theme.textVariants.header.fontFamily};
  font-weight: ${props => props.theme.textVariants.header.fontWeight};
  line-height: ${props => props.theme.textVariants.header.lineHeight}px;
  color: ${props => props.theme.colors.primary};
  text-align: center;
  font-size: 28px;
`;

const CardDescriptionStyled = styled.p`
  font-family: ${props => props.theme.textVariants.caption.fontFamily};
  font-weight: ${props => props.theme.textVariants.caption.fontWeight};
  font-size: 16px;
  line-height: ${props => props.theme.textVariants.caption.lineHeight}px;
  color: ${props => props.theme.colors.mutedForeground};
  text-align: center;
`;

const CardContentStyled = styled.div`
  padding: ${props => props.theme.spacing.l}px;
  padding-top: 0;
`;

export function Card(props: HTMLAttributes<HTMLDivElement>) {
  return <CardStyled {...props} />;
}

export function CardHeader(props: HTMLAttributes<HTMLDivElement>) {
  return <CardHeaderStyled {...props} />;
}

export function CardTitle(props: HTMLAttributes<HTMLHeadingElement>) {
  return <CardTitleStyled {...props} />;
}

export function CardDescription(props: HTMLAttributes<HTMLParagraphElement>) {
  return <CardDescriptionStyled {...props} />;
}

export function CardContent(props: HTMLAttributes<HTMLDivElement>) {
  return <CardContentStyled {...props} />;
}
