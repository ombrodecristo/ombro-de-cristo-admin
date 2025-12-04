import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";
import { useAuth } from "@/shared/hooks/useAuth";
import { GlobalLoader } from "@/shared/components";

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const { user, role, loading } = useAuth();

  if (loading) {
    return <GlobalLoader />;
  }

  if (!user || role !== "ADMIN") {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}
