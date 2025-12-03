import { StrictMode, Suspense, lazy } from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import App from "./App.tsx";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminLayout from "./components/AdminLayout";
import { GlobalLoader } from "./components/GlobalLoader";
import { ThemeProvider } from "@emotion/react";
import { theme } from "./core/lib/theme.ts";
import { GlobalStyles } from "./core/lib/GlobalStyles.tsx";
import { Toaster } from "sonner";

const LoginPage = lazy(() => import("./pages/Login"));
const UserManagementPage = lazy(() => import("./pages/UserManagement"));
const ChurchManagementPage = lazy(() => import("./pages/ChurchManagement"));

const DevotionalManagementPage = lazy(
  () => import("./pages/DevotionalManagement")
);

const AuthConfirmedPage = lazy(() => import("./pages/AuthConfirmed"));

const PasswordRecoveryPage = lazy(
  () => import("./pages/PasswordRecovery/index.tsx")
);

const SignUpPage = lazy(() => import("./pages/SignUp/index.tsx"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Navigate to="/login" replace /> },
      { path: "/login", element: <LoginPage /> },
      { path: "/signup", element: <SignUpPage /> },
      { path: "/auth-confirmed", element: <AuthConfirmedPage /> },
      { path: "/password-recovery", element: <PasswordRecoveryPage /> },
      {
        path: "/admin",
        element: <ProtectedRoute />,
        children: [
          {
            element: <AdminLayout />,
            children: [
              {
                index: true,
                element: <Navigate to="/admin/users" replace />,
              },
              {
                path: "users",
                element: <UserManagementPage />,
              },
              {
                path: "churches",
                element: <ChurchManagementPage />,
              },
              {
                path: "devotionals",
                element: <DevotionalManagementPage />,
              },
            ],
          },
        ],
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <AuthProvider>
        <Suspense fallback={<GlobalLoader />}>
          <RouterProvider router={router} />
          <Toaster richColors closeButton position="bottom-right" />
        </Suspense>
      </AuthProvider>
    </ThemeProvider>
  </StrictMode>
);
