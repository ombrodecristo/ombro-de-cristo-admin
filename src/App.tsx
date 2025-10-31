import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";
import { GlobalLoader } from "./components/GlobalLoader";
import { cn } from "./lib/utils";
import { useEffect } from "react";

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

  return (
    <div
      className={cn(
        "flex h-screen w-full",
        isAuthPage
          ? "min-h-screen flex-col items-center justify-center bg-background p-4"
          : ""
      )}
    >
      <Outlet />
    </div>
  );
}

export default App;
