import styled from "@emotion/styled";
import SidebarNav from "./SidebarNav";

const SidebarContainer = styled.aside<{ isOpen: boolean }>`
  display: flex;
  flex-direction: column;
  background-color: ${props => props.theme.colors.primaryBackground};
  color: ${props => props.theme.colors.primaryForeground};
  width: ${props => (props.isOpen ? "256px" : "80px")};
  transition: width 0.3s ease-in-out;
  flex-shrink: 0;
  border-right: 1px solid ${props => props.theme.colors.border};
`;

const Header = styled.div<{ isOpen: boolean }>`
  display: flex;
  height: 64px;
  align-items: center;
  padding: 0 ${props => (props.isOpen ? props.theme.spacing.l : "24px")}px;
  gap: ${props => props.theme.spacing.m}px;
  white-space: nowrap;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  justify-content: ${props => (props.isOpen ? "flex-start" : "center")};
  transition: padding 0.3s ease-in-out;
`;

const Logo = styled.img`
  height: 32px;
  width: 32px;
  object-fit: contain;
  flex-shrink: 0;
`;

const Title = styled.span<{ isOpen: boolean }>`
  font-weight: bold;
  font-size: 16px;
  opacity: ${props => (props.isOpen ? 1 : 0)};
  visibility: ${props => (props.isOpen ? "visible" : "hidden")};
  transition:
    opacity 0.2s,
    visibility 0.2s;
  transition-delay: ${props => (props.isOpen ? "0.1s" : "0s")};
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
      <Header isOpen={isOpen}>
        <Logo src="/logo.png" alt="Logo Ombro de Cristo" />
        <Title isOpen={isOpen}>Administração</Title>
      </Header>
      <NavContainer>
        <SidebarNav isSidebarOpen={isOpen} />
      </NavContainer>
    </SidebarContainer>
  );
}
