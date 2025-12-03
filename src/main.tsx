import { StrictMode, Suspense, lazy } from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import App from "./App.tsx";
import { AuthProvider } from "./shared/contexts/AuthContext.tsx";
import ProtectedRoute from "@/features/admin/view/components/ProtectedRoute.tsx";
import AdminLayout from "@/features/admin/view/layouts/AdminLayout.tsx";
import { GlobalLoader } from "./shared/components/GlobalLoader.tsx";
import { ThemeProvider } from "@emotion/react";
import { theme } from "./core/lib/theme.ts";
import { GlobalStyles } from "./core/lib/GlobalStyles.tsx";
import { Toaster } from "sonner";

const LandingPage = lazy(
  () => import("@/features/static/view/LandingPage.tsx")
);

const LoginPage = lazy(() => import("@/features/auth/view/LoginPage.tsx"));

const UserManagementPage = lazy(
  () => import("@/features/user-management/view/UserManagementPage.tsx")
);

const ChurchManagementPage = lazy(
  () => import("@/features/church-management/view/ChurchManagementPage.tsx")
);

const DevotionalManagementPage = lazy(
  () =>
    import("@/features/devotional-management/view/DevotionalManagementPage.tsx")
);

const AuthConfirmedPage = lazy(
  () => import("@/features/auth/view/AuthConfirmedPage.tsx")
);

const PasswordRecoveryPage = lazy(
  () => import("@/features/auth/view/PasswordRecoveryPage.tsx")
);

const TermsAndPolicyPage = lazy(
  () => import("@/features/static/view/TermsAndPolicyPage.tsx")
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <LandingPage /> },
      { path: "/login", element: <LoginPage /> },
      { path: "/auth-confirmed", element: <AuthConfirmedPage /> },
      { path: "/password-recovery", element: <PasswordRecoveryPage /> },
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
          <Toaster richColors closeButton position="bottom-right" />
        </Suspense>
      </AuthProvider>
    </ThemeProvider>
  </StrictMode>
);
