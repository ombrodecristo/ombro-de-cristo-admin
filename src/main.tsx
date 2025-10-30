import { StrictMode, Suspense, lazy } from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import "./index.css";
import App from "./App.tsx";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminLayout from "./components/AdminLayout";
import { GlobalLoader } from "./components/GlobalLoader";
import { Toaster } from "sonner";

const LandingPage = lazy(() => import("./pages/LandingPage"));
const Login = lazy(() => import("./pages/Login"));
const Unauthorized = lazy(() => import("./pages/Unauthorized"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const AuthConfirmed = lazy(() => import("./pages/AuthConfirmed"));
const UpdatePassword = lazy(() => import("./pages/UpdatePassword"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <LandingPage /> },
      { path: "/login", element: <Login /> },
      { path: "/unauthorized", element: <Unauthorized /> },
      { path: "/auth-confirmed", element: <AuthConfirmed /> },
      { path: "/update-password", element: <UpdatePassword /> },
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
                element: <Dashboard />,
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
    <AuthProvider>
      <Suspense fallback={<GlobalLoader />}>
        <RouterProvider router={router} />
        <Toaster richColors closeButton />
      </Suspense>
    </AuthProvider>
  </StrictMode>
);
