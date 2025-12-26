import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { AuthProvider } from "./shared/contexts/AuthContext.tsx";
import { ThemeProvider } from "@emotion/react";
import { theme } from "./core/lib/theme.ts";
import { GlobalStyles } from "./core/lib/GlobalStyles.tsx";
import { Toaster } from "sonner";
import { router } from "./app/router.tsx";
import "./core/i18n";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <AuthProvider>
        <RouterProvider router={router} />
        <Toaster richColors closeButton position="bottom-right" />
      </AuthProvider>
    </ThemeProvider>
  </StrictMode>
);
