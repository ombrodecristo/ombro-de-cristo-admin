import { Suspense, lazy } from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import RootLayout from "./RootLayout.tsx";
import { GlobalLoader } from "@/shared/components";
import ProtectedRoute from "@/features/admin/view/components/ProtectedRoute.tsx";
import AdminLayout from "@/features/admin/view/layouts/AdminLayout.tsx";
import PermissionGuard from "@/features/admin/view/components/PermissionGuard.tsx";

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

const LibraryManagementPage = lazy(
  () => import("@/features/library-management/view/LibraryManagementPage.tsx")
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

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<GlobalLoader />}>
        <RootLayout />
      </Suspense>
    ),
    children: [
      { index: true, element: <LandingPage /> },
      { path: "login", element: <LoginPage /> },
      { path: "auth-confirmed", element: <AuthConfirmedPage /> },
      { path: "password-recovery", element: <PasswordRecoveryPage /> },
      { path: "terms-and-policy", element: <TermsAndPolicyPage /> },
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: "admin",
            element: <AdminLayout />,
            children: [
              {
                index: true,
                element: <Navigate to="/admin/users" replace />,
              },
              {
                element: <PermissionGuard permission="can_manage_users" />,
                children: [{ path: "users", element: <UserManagementPage /> }],
              },
              {
                element: <PermissionGuard permission="can_manage_churches" />,
                children: [
                  { path: "churches", element: <ChurchManagementPage /> },
                ],
              },
              {
                element: (
                  <PermissionGuard permission="can_manage_devotionals" />
                ),
                children: [
                  {
                    path: "devotionals",
                    element: <DevotionalManagementPage />,
                  },
                ],
              },
              {
                element: <PermissionGuard permission="can_manage_library" />,
                children: [
                  { path: "library", element: <LibraryManagementPage /> },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
]);
