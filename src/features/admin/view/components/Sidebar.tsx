import styled from "@emotion/styled";
import SidebarNav from "./SidebarNav";

const SidebarContainer = styled.aside<{ isOpen: boolean }>`
  display: flex;
  flex-direction: column;
  background-color: ${props => props.theme.colors.primaryBackground};
  color: ${props => props.theme.colors.primaryForeground};
  flex-shrink: 0;
  border-right: 1px solid ${props => props.theme.colors.border};

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    position: fixed;
    height: 100vh;
    z-index: 200;
    width: 256px;
    transform: translateX(${props => (props.isOpen ? "0" : "-100%")});
    transition: transform 0.3s ease-in-out;
  }

  @media (min-width: ${props => props.theme.breakpoints.tablet}) {
    position: relative;
    width: 80px;
    transition: width 0.3s ease-in-out;
    &:hover {
      width: 256px;
    }
  }
`;

const Header = styled.div`
  display: flex;
  height: 64px;
  align-items: center;
  gap: ${props => props.theme.spacing.m}px;
  white-space: nowrap;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  transition:
    padding 0.3s ease-in-out,
    justify-content 0.3s ease-in-out;

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    padding: 0 ${props => props.theme.spacing.l}px;
    justify-content: flex-start;
  }

  @media (min-width: ${props => props.theme.breakpoints.tablet}) {
    padding: 0 24px;
    justify-content: center;
    ${SidebarContainer}:hover & {
      padding: 0 ${props => props.theme.spacing.l}px;
      justify-content: flex-start;
    }
  }
`;

const Logo = styled.img`
  height: 32px;
  width: 32px;
  object-fit: contain;
  flex-shrink: 0;
`;

const Title = styled.span`
  font-weight: bold;
  font-size: 16px;

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    opacity: 1;
    visibility: visible;
  }

  @media (min-width: ${props => props.theme.breakpoints.tablet}) {
    opacity: 0;
    visibility: hidden;
    transition:
      opacity 0.2s,
      visibility 0.2s;
    transition-delay: 0s;
    ${SidebarContainer}:hover & {
      opacity: 1;
      visibility: visible;
      transition-delay: 0.1s;
    }
  }
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
    <SidebarContainer className="sidebar-container" isOpen={isOpen}>
      <Header>
        <Logo src="/logo.png" alt="Logo Ombro de Cristo" />
        <Title>Administração</Title>
      </Header>
      <NavContainer>
        <SidebarNav isSidebarOpen={isOpen} />
      </NavContainer>
    </SidebarContainer>
  );
}
