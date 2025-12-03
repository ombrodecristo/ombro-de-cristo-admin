import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "./hooks/useAuth";
import { GlobalLoader } from "./components/GlobalLoader";
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

function App() {
  const { loading, user, role } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) {
      return;
    }

    const isPublicRoute = PUBLIC_ROUTES.includes(location.pathname);

    if (user && role === "ADMIN") {
      if (isPublicRoute && location.pathname !== "/") {
        navigate("/admin", { replace: true });
      }
    } else if (user && role !== "ADMIN") {
      navigate("/", { replace: true });
    } else if (!user && !isPublicRoute) {
      navigate("/login", { replace: true });
    }
  }, [loading, user, role, location.pathname, navigate]);

  if (loading && !PUBLIC_ROUTES.includes(location.pathname)) {
    return <GlobalLoader />;
  }

  return (
    <PageContainer>
      <Outlet />
    </PageContainer>
  );
}

export default App;
