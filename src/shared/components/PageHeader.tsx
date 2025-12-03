import styled from "@emotion/styled";
import type { ReactNode } from "react";

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: ${props => props.theme.spacing.m}px;
  border-bottom: 1px solid ${props => props.theme.colors.border};
`;

const Title = styled.h1(props => ({
  ...props.theme.textVariants.header,
  fontSize: "28px",
  lineHeight: "34px",
  letterSpacing: "-0.25px",
}));

const ActionsContainer = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.s}px;
`;

interface PageHeaderProps {
  title: string;
  children?: ReactNode;
}

export function PageHeader({ title, children }: PageHeaderProps) {
  return (
    <HeaderContainer>
      <Title>{title}</Title>
      {children && <ActionsContainer>{children}</ActionsContainer>}
    </HeaderContainer>
  );
}
