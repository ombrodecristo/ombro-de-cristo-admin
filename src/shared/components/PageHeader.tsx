import styled from "@emotion/styled";
import type { ReactNode } from "react";

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${props => props.theme.spacing.l}px;
`;

const Title = styled.h1`
  font-size: 28px;
  font-weight: 700;
  color: ${props => props.theme.colors.headerForeground};
`;

interface PageHeaderProps {
  title: string;
  children?: ReactNode;
}

export function PageHeader({ title, children }: PageHeaderProps) {
  return (
    <HeaderContainer>
      <Title>{title}</Title>
      <div>{children}</div>
    </HeaderContainer>
  );
}
