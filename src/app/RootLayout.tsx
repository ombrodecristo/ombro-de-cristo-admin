import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/shared/hooks/useAuth";
import { GlobalLoader } from "@/shared/components";
import styled from "@emotion/styled";

const PageContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: ${props => props.theme.colors.mainBackground};
`;

const PUBLIC_ROUTES = [
  "/",
  "/login",
  "/auth-confirmed",
  "/password-recovery",
  "/terms-and-policy",
];

const AUTH_ONLY_ROUTES = ["/login"];

function RootLayout() {
  const { loading, user, role } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) {
      return;
    }

    const isPublicRoute = PUBLIC_ROUTES.some(route =>
      location.pathname.startsWith(route)
    );

    const isOnAuthOnlyRoute = AUTH_ONLY_ROUTES.includes(location.pathname);

    if (user && role === "ADMIN") {
      if (isOnAuthOnlyRoute) {
        navigate("/admin/users", { replace: true });
      }
    } else if (!user && !isPublicRoute) {
      navigate("/login", { replace: true });
    }
  }, [loading, user, role, location.pathname, navigate]);

  if (loading && !PUBLIC_ROUTES.some(r => location.pathname.startsWith(r))) {
    return <GlobalLoader />;
  }

  return (
    <PageContainer>
      <Outlet />
    </PageContainer>
  );
}

export default RootLayout;
