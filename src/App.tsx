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
    "/unauthorized",
    "/auth-confirmed",
    "/update-password",
  ].includes(location.pathname);

  useEffect(() => {
    if (loading) {
      return;
    }

    if (user && role !== "ADMIN" && !isAuthPage) {
      signOut();
      navigate("/unauthorized", { replace: true });
    }
  }, [loading, user, role, location.pathname, isAuthPage, navigate, signOut]);

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
