import { Outlet, useLocation } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";
import { GlobalLoader } from "./components/GlobalLoader";
import { cn } from "./lib/utils";
function App() {
  const { loading } = useAuth();
  const location = useLocation();
  const isAuthPage = [
    "/login",
    "/unauthorized",
    "/auth-confirmed",
    "/update-password",
  ].includes(location.pathname);
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
