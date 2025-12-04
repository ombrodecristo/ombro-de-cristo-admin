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
  justify-content: ${props => (props.isSidebarOpen ? "flex-start" : "center")};
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
`;

const LinkText = styled.span<{ isSidebarOpen: boolean }>`
  opacity: ${props => (props.isSidebarOpen ? 1 : 0)};
  visibility: ${props => (props.isSidebarOpen ? "visible" : "hidden")};
  transition:
    opacity 0.2s,
    visibility 0.2s;
  transition-delay: ${props => (props.isSidebarOpen ? "0.1s" : "0s")};
  white-space: nowrap;
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
