import { NavLink } from "react-router-dom";
import styled from "@emotion/styled";
import { IoPeopleOutline, IoHomeOutline, IoBookOutline } from "react-icons/io5";

const Nav = styled.nav`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.s}px;
  padding: 0 ${props => props.theme.spacing.m}px;
`;

const StyledNavLink = styled(NavLink)<{ isSidebarOpen: boolean }>`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.m}px;
  padding: ${props => props.theme.spacing.sm}px;
  height: 48px;
  border-radius: ${props => props.theme.radii.s}px;
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  transition:
    background-color 0.2s,
    color 0.2s;

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
  }

  @media (min-width: ${props => props.theme.breakpoints.tablet}) {
    justify-content: center;
    aside:hover & {
      justify-content: flex-start;
    }
  }
`;

const LinkText = styled.span<{ isSidebarOpen: boolean }>`
  white-space: nowrap;

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
    aside:hover & {
      opacity: 1;
      visibility: visible;
      transition-delay: 0.1s;
    }
  }
`;

type SidebarNavProps = {
  isSidebarOpen: boolean;
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

export default function SidebarNav({ isSidebarOpen }: SidebarNavProps) {
  return (
    <Nav>
      {navItems.map(item => (
        <StyledNavLink
          key={item.to}
          to={item.to}
          isSidebarOpen={isSidebarOpen}
          title={!isSidebarOpen ? item.label : ""}
        >
          {item.icon}
          <LinkText isSidebarOpen={isSidebarOpen}>{item.label}</LinkText>
        </StyledNavLink>
      ))}
    </Nav>
  );
}
