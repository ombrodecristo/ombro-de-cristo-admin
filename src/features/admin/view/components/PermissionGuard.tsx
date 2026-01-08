import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/shared/hooks/useAuth";
import type { Permissions } from "@/core/types/database";

type PermissionGuardProps = {
  permission: keyof Permissions;
};

export default function PermissionGuard({ permission }: PermissionGuardProps) {
  const { user } = useAuth();

  const permissions = user?.app_metadata.permissions || {};

  if (permissions[permission]) {
    return <Outlet />;
  }

  return <Navigate to="/admin" replace />;
}
