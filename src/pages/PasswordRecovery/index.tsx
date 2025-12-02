import { Lock, LogIn, AlertCircle, CheckCircle, LockIcon } from "lucide-react";
import { usePasswordRecoveryViewModel } from "./usePasswordRecoveryViewModel";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { AlertDescription } from "@/components/ui/alert";
import { PasswordInput } from "@/components/ui/password-input";
import { useAuth } from "@/contexts/AuthContext";
import { GlobalLoader } from "@/components/GlobalLoader";
import { useEffect } from "react";
import { toast } from "sonner";
import { Spinner } from "@/components/ui/spinner";

export default function PasswordRecovery() {
  const { loading: authLoading, initialHash } = useAuth();
  const {
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    loading,
    pageLoading,
    success,
    isTokenValid,
    error,
    handleSubmit,
  } = usePasswordRecoveryViewModel({ authLoading, initialHash });

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  useEffect(() => {
    if (success) {
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, [success]);

  if (pageLoading) {
    return <GlobalLoader />;
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="items-center text-center">
        {!isTokenValid && !success ? (
          <>
            <AlertCircle className="h-12 w-12 text-destructive" />
            <CardTitle className="text-2xl text-destructive">
              Link Inválido
            </CardTitle>
          </>
        ) : success ? (
          <>
            <CheckCircle className="h-12 w-12 text-primary" />
            <CardTitle className="text-2xl text-primary">
              Senha Alterada
            </CardTitle>
          </>
        ) : (
          <>
            <LockIcon className="h-12 w-12 text-primary" />
            <CardTitle className="text-2xl text-primary">
              Redefina sua Senha
            </CardTitle>
          </>
        )}
      </CardHeader>

      <CardContent>
        {!isTokenValid && !success ? (
          <AlertDescription className="text-center text-muted-foreground">
            Link de redefinição de senha inválido ou expirado.
            <br />
            Por favor, solicite um novo link no aplicativo.
          </AlertDescription>
        ) : success ? (
          <p className="text-center text-muted-foreground">
            Sua senha foi alterada com sucesso!
            <br />
            Você já pode fechar esta página.
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-3">
              <Label htmlFor="password">Nova Senha</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <PasswordInput
                  id="password"
                  placeholder="••••••••"
                  className="pl-9"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                  autoComplete="new-password"
                  disabled={loading}
                />
              </div>
            </div>

            <div className="space-y-3">
              <Label htmlFor="confirmPassword">Confirmar Nova Senha</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <PasswordInput
                  id="confirmPassword"
                  placeholder="••••••••"
                  className="pl-9"
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                  required
                  autoComplete="new-password"
                  disabled={loading}
                />
              </div>
            </div>

            <Button
              type="submit"
              variant="default"
              disabled={loading}
              className="w-full"
            >
              {loading ? (
                <Spinner className="h-4 w-4" />
              ) : (
                <LogIn className="h-4 w-4" />
              )}
              Alterar Senha
            </Button>
          </form>
        )}
      </CardContent>
    </Card>
  );
}
