import { Outlet } from "react-router-dom";
import { useAuth } from "./hooks/useAuth";
import { GlobalLoader } from "./components/GlobalLoader";

function App() {
  const { loading } = useAuth();

  if (loading) {
    return <GlobalLoader />;
  }

  return <Outlet />;
}

export default App;
