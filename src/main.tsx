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

const SignUpPage = lazy(() => import("./pages/SignUp"));
const Login = lazy(() => import("./pages/Login"));
const UserManagementPage = lazy(() => import("./pages/UserManagement"));
const ChurchManagementPage = lazy(() => import("./pages/ChurchManagement"));
const DevotionalManagementPage = lazy(
  () => import("./pages/DevotionalManagement")
);
const AuthConfirmed = lazy(() => import("./pages/AuthConfirmed"));
const PasswordRecovery = lazy(
  () => import("./pages/PasswordRecovery/index.tsx")
);
const TermsAndPolicyPage = lazy(() => import("./pages/TermsAndPolicy"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <SignUpPage /> },
      { path: "/login", element: <Login /> },
      { path: "/auth-confirmed", element: <AuthConfirmed /> },
      { path: "/password-recovery", element: <PasswordRecovery /> },
      { path: "/terms-and-policy", element: <TermsAndPolicyPage /> },
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
          <Toaster richColors closeButton />
        </Suspense>
      </AuthProvider>
    </ThemeProvider>
  </StrictMode>
);
