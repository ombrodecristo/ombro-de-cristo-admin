import { NavLink } from "react-router-dom";
import styled from "@emotion/styled";
import { IoPeopleOutline, IoHomeOutline, IoBookOutline } from "react-icons/io5";

const Nav = styled.nav`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.s}px;
  padding: 0 ${props => props.theme.spacing.m}px;
`;

const StyledNavLink = styled(NavLink)`
  display: flex;
  align-items: center;
  height: 48px;
  border-radius: ${props => props.theme.radii.s}px;
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  transition:
    background-color 0.2s,
    color 0.2s,
    gap 0.3s ease-in-out;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
    color: white;
  }

  &.active {
    background-color: ${props => props.theme.colors.secondaryBackground};
    color: ${props => props.theme.colors.secondaryForeground};
    font-weight: 600;
  }

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    justify-content: flex-start;
    gap: ${props => props.theme.spacing.m}px;
    padding: 0 ${props => props.theme.spacing.sm}px;
  }

  @media (min-width: ${props => props.theme.breakpoints.tablet}) {
    justify-content: flex-start;
    padding: 0 ${props => props.theme.spacing.sm}px;
    gap: 0;

    .sidebar-container:hover & {
      gap: ${props => props.theme.spacing.m}px;
    }
  }
`;

const LinkText = styled.span`
  white-space: nowrap;

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    opacity: 1;
    visibility: visible;
  }

  @media (min-width: ${props => props.theme.breakpoints.tablet}) {
    max-width: 0;
    opacity: 0;
    overflow: hidden;
    transition:
      max-width 0.2s ease-in-out,
      opacity 0.2s ease-in-out;

    .sidebar-container:hover & {
      max-width: 150px;
      opacity: 1;
      transition-delay: 0.1s;
    }
  }
`;

type SidebarNavProps = {
  isSidebarOpen: boolean;
  onNavigate: () => void;
};

const navItems = [
  { to: "/admin/users", icon: <IoPeopleOutline size={22} />, label: "Perfis" },
  {
    to: "/admin/churches",
    icon: <IoHomeOutline size={22} />,
    label: "Igrejas",
  },
  {
    to: "/admin/devotionals",
    icon: <IoBookOutline size={22} />,
    label: "Devocionais",
  },
];

export default function SidebarNav({
  isSidebarOpen,
  onNavigate,
}: SidebarNavProps) {
  return (
    <Nav>
      {navItems.map(item => (
        <StyledNavLink
          key={item.to}
          to={item.to}
          title={!isSidebarOpen ? item.label : ""}
          onClick={onNavigate}
        >
          {item.icon}
          <LinkText>{item.label}</LinkText>
        </StyledNavLink>
      ))}
    </Nav>
  );
}
