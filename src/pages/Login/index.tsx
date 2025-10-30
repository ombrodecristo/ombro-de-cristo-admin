import { Navigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import {
  Mail,
  Lock,
  LogIn,
  ShieldHalf,
  AlertCircle,
  Loader2,
} from "lucide-react";
import { useLoginViewModel } from "./useLoginViewModel";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { GlobalLoader } from "@/components/GlobalLoader";

export default function Login() {
  const {
    email,
    setEmail,
    password,
    setPassword,
    loading,
    error,
    handleLogin,
  } = useLoginViewModel();
  const { user, loading: authLoading } = useAuth();

  if (authLoading) {
    return <GlobalLoader />;
  }

  if (user) {
    return <Navigate to="/" replace />;
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="items-center text-center">
        <CardDescription className="text-sm text-primary font-normal">
          Painel Administrativo
        </CardDescription>
        <div className="flex items-center gap-2">
          <ShieldHalf className="h-7 w-7 text-primary" />
          <CardDescription className="text-2xl text-primary font-bold">
            Ombro de Cristo
          </CardDescription>
        </div>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleLogin} className="space-y-5">
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-3">
            <Label htmlFor="email">E-mail</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                placeholder="email@exemplo.com"
                className="pl-9"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
                disabled={loading}
              />
            </div>
          </div>

          <div className="space-y-3">
            <Label htmlFor="password">Senha</Label>
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
                autoComplete="current-password"
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
            Entrar
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
