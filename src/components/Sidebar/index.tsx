import styled from "@emotion/styled";
import SidebarNav from "../SidebarNav";

const SidebarContainer = styled.aside<{ isOpen: boolean }>`
  display: flex;
  flex-direction: column;
  background-color: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.primaryForeground};
  width: ${props => (props.isOpen ? "256px" : "80px")};
  transition: width 0.3s ease-in-out;
  flex-shrink: 0;
`;

const Header = styled.div`
  display: flex;
  height: 64px;
  align-items: center;
  padding: 0 ${props => props.theme.spacing.l}px;
  gap: ${props => props.theme.spacing.m}px;
  white-space: nowrap;
`;

const Logo = styled.img`
  height: 32px;
  width: 32px;
  object-fit: contain;
`;

const Title = styled.span<{ isOpen: boolean }>`
  font-weight: bold;
  opacity: ${props => (props.isOpen ? 1 : 0)};
  visibility: ${props => (props.isOpen ? "visible" : "hidden")};
  transition:
    opacity 0.2s,
    visibility 0.2s;
`;

const NavContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  padding-top: ${props => props.theme.spacing.s}px;
`;

type SidebarProps = {
  isOpen: boolean;
};

export default function Sidebar({ isOpen }: SidebarProps) {
  return (
    <SidebarContainer isOpen={isOpen}>
      <Header>
        <Logo src="/logo.png" alt="Logo Ombro de Cristo" />
        <Title isOpen={isOpen}>Administração</Title>
      </Header>
      <NavContainer>
        <SidebarNav isSidebarOpen={isOpen} />
      </NavContainer>
    </SidebarContainer>
  );
}
