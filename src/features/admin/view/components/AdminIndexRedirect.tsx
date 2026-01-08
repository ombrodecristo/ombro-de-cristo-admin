import { useAuth } from "@/shared/hooks/useAuth";
import { Navigate } from "react-router-dom";
import type { Permissions } from "@/core/types/database";
import styled from "@emotion/styled";

const NoPermissionContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  color: ${props => props.theme.colors.mutedForeground};
`;

const ALL_ADMIN_ROUTES = [
  { path: "/admin/users", permission: "can_manage_users" },
  { path: "/admin/churches", permission: "can_manage_churches" },
  { path: "/admin/devotionals", permission: "can_manage_devotionals" },
  { path: "/admin/library", permission: "can_manage_library" },
];

export default function AdminIndexRedirect() {
  const { user } = useAuth();
  const permissions = user?.app_metadata.permissions || {};

  const firstAllowedRoute = ALL_ADMIN_ROUTES.find(
    route => permissions[route.permission as keyof Permissions]
  );

  if (firstAllowedRoute) {
    return <Navigate to={firstAllowedRoute.path} replace />;
  }

  return (
    <NoPermissionContainer>
      Você não tem permissão para acessar nenhuma página de administração.
    </NoPermissionContainer>
  );
}
