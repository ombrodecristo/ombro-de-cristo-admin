import styled from "@emotion/styled";
import type { ReactNode } from "react";

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: ${props => props.theme.spacing.m}px;
  border-bottom: 1px solid ${props => props.theme.colors.border};
`;

const Title = styled.h1`
  font-family: ${props => props.theme.textVariants.header.fontFamily};
  font-weight: ${props => props.theme.textVariants.header.fontWeight};
  font-size: 28px;
  line-height: 34px;
  color: ${props => props.theme.colors.headerForeground};
  letter-spacing: -0.25px;
`;

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
