import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/shared/hooks/useAuth";
import { GlobalLoader } from "@/shared/components/GlobalLoader";

export default function ProtectedRoute() {
  const { user, role, loading } = useAuth();

  if (loading) {
    return <GlobalLoader />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (role !== "ADMIN") {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
