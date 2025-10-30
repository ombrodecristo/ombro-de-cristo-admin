import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import { GlobalLoader } from "@/components/GlobalLoader";

export default function Unauthorized() {
  const { role, loading: authLoading, signOut, user } = useAuth();

  useEffect(() => {
    if (user && role !== "ADMIN") {
      signOut();
    }
  }, [user, role, signOut]);

  if (authLoading) {
    return <GlobalLoader />;
  }

  if (role === "ADMIN") {
    return <Navigate to="/admin" replace />;
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="items-center text-center">
        <AlertCircle className="h-12 w-12 text-destructive" />
        <CardTitle className="text-2xl text-destructive">
          Acesso Restrito
        </CardTitle>
      </CardHeader>

      <CardContent className="text-center">
        <p className="text-muted-foreground">
          Esta área é restrita a Administradores.
          <br />
          <br />
          Se você acredita que isso é um erro, por favor, entre em contato com a
          equipe de suporte.
        </p>
      </CardContent>
    </Card>
  );
}
