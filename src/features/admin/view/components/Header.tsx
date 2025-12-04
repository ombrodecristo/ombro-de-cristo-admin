import styled from "@emotion/styled";
import { IoMenu } from "react-icons/io5";
import UserMenu from "./UserMenu";

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
  padding: 8px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition:
    background-color 0.2s,
    color 0.2s;

  &:hover {
    background-color: ${props => props.theme.colors.mutedBackground};
    color: ${props => props.theme.colors.mainForeground};
  }

  @media (min-width: ${props => props.theme.breakpoints.tablet}) {
    display: none;
  }
`;

const AppTitle = styled.h1(props => ({
  ...props.theme.textVariants.bodyMedium,
  fontSize: "18px",
  color: props.theme.colors.headerForeground,
}));

type HeaderProps = {
  onToggleSidebar: () => void;
};

export default function Header({ onToggleSidebar }: HeaderProps) {
  return (
    <HeaderContainer>
      <LeftSection>
        <MenuButton onClick={onToggleSidebar}>
          <IoMenu size={24} />
        </MenuButton>
        <AppTitle>Painel Administrativo</AppTitle>
      </LeftSection>
      <UserMenu />
    </HeaderContainer>
  );
}
