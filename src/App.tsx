import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "./hooks/useAuth";
import { GlobalLoader } from "./components/GlobalLoader";
import { useEffect } from "react";
import styled from "@emotion/styled";

const AppContainer = styled.div`
  display: flex;
  height: 100vh;
  width: 100%;
`;

const AuthPageContainer = styled(AppContainer)`
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1rem;
`;

function App() {
  const { loading, user, role, signOut } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const isAuthPage = [
    "/login",
    "/auth-confirmed",
    "/password-recovery",
  ].includes(location.pathname);

  const isPublicPage = [
    "/",
    "/login",
    "/auth-confirmed",
    "/password-recovery",
    "/terms-and-policy",
  ].includes(location.pathname);

  useEffect(() => {
    const hash = window.location.hash;
    const isRecoveryFlow = hash.includes("type=recovery");

    if (isRecoveryFlow && location.pathname !== "/password-recovery") {
      navigate("/password-recovery" + hash, { replace: true });

      return;
    }

    if (loading) {
      return;
    }

    if (user && role !== "ADMIN" && !isPublicPage) {
      signOut();
      navigate("/login", { replace: true });
    }
  }, [loading, user, role, location.pathname, isPublicPage, navigate, signOut]);

  if (loading) {
    return <GlobalLoader />;
  }

  const Container = isAuthPage ? AuthPageContainer : AppContainer;

  return (
    <Container>
      <Outlet />
    </Container>
  );
}

export default App;
