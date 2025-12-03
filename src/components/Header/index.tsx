import styled from "@emotion/styled";
import { FiMenu } from "react-icons/fi";
import UserMenu from "../UserMenu";

const HeaderContainer = styled.header`
  display: flex;
  height: 64px;
  align-items: center;
  justify-content: space-between;
  gap: ${props => props.theme.spacing.m}px;
  border-bottom: 1px solid ${props => props.theme.colors.border};
  background-color: ${props => props.theme.colors.cardBackground};
  padding: 0 ${props => props.theme.spacing.l}px;
  color: ${props => props.theme.colors.cardForeground};
  flex-shrink: 0;
`;

const LeftSection = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.m}px;
`;

const MenuButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: ${props => props.theme.colors.mutedForeground};
  &:hover {
    color: ${props => props.theme.colors.mainForeground};
  }
`;

const AppTitle = styled.h1`
  font-size: 18px;
  font-weight: bold;
`;

type HeaderProps = {
  onToggleSidebar: () => void;
};

export default function Header({ onToggleSidebar }: HeaderProps) {
  return (
    <HeaderContainer>
      <LeftSection>
        <MenuButton onClick={onToggleSidebar}>
          <FiMenu size={22} />
        </MenuButton>
        <AppTitle>Painel Administrativo</AppTitle>
      </LeftSection>
      <UserMenu />
    </HeaderContainer>
  );
}
