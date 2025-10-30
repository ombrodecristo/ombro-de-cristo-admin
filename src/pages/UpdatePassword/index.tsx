import {
  Lock,
  LogIn,
  ShieldHalf,
  AlertCircle,
  Loader2,
  CheckCircle,
} from "lucide-react";
import { useUpdatePasswordViewModel } from "./useUpdatePasswordViewModel";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function UpdatePassword() {
  const {
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    loading,
    success,
    isTokenValid,
    handleSubmit,
  } = useUpdatePasswordViewModel();

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="items-center text-center">
        <div className="flex items-center gap-2">
          <ShieldHalf className="h-7 w-7 text-primary" />
          <CardDescription className="text-2xl text-primary font-bold">
            Ombro de Cristo
          </CardDescription>
        </div>

        <CardTitle className="pt-2 text-xl">Redefinir Senha</CardTitle>
      </CardHeader>

      <CardContent>
        {!isTokenValid && !success ? (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Link de redefinição inválido ou expirado. Por favor, solicite um
              novo link no aplicativo.
            </AlertDescription>
          </Alert>
        ) : success ? (
          <div className="flex flex-col items-center space-y-3 text-center">
            <CheckCircle className="h-12 w-12 text-primary" />
            <p className="text-muted-foreground">
              Senha alterada com sucesso!
              <br />
              Você já pode fechar esta página.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-3">
              <Label htmlFor="password">Nova Senha</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  className="pl-9"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  className="pl-9"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
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
                <Loader2 className="h-4 w-4 animate-spin" />
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
