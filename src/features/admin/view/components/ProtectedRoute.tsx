import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/shared/hooks/useAuth";
import { GlobalLoader } from "@/shared/components";

export default function ProtectedRoute() {
  const { user, role, loading } = useAuth();

  if (loading) {
    return <GlobalLoader />;
  }

  if (!user || role !== "ADMIN") {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
