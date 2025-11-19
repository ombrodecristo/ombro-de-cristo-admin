import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { Mail, Lock, LogIn } from "lucide-react";
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
import { GlobalLoader } from "@/components/GlobalLoader";
import { PasswordInput } from "@/components/ui/password-input";
import { type FormEvent } from "react";
import { toast } from "sonner";
import { Spinner } from "@/components/ui/spinner";

export default function Login() {
  const { email, setEmail, password, setPassword, loading, handleLogin } =
    useLoginViewModel();
  const { user, loading: authLoading, role } = useAuth();
  const navigate = useNavigate();

  const handleLoginSubmit = async (e: FormEvent) => {
    const { success, error } = await handleLogin(e);

    if (error) {
      toast.error(error);
    }

    if (success) {
      navigate("/admin", { replace: true });
    }
  };

  if (authLoading) {
    return <GlobalLoader />;
  }

  if (user && role === "ADMIN") {
    return <Navigate to="/admin" replace />;
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="items-center text-center">
        <img
          src="/logo.png"
          alt="Logo Ombro de Cristo"
          className="h-24 w-24 object-contain"
        />
        <CardDescription className="text-2xl font-bold">
          Ombro de Cristo
        </CardDescription>
        <CardDescription className="text-md font-normal">
          Painel Administrativo
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleLoginSubmit} className="space-y-5">
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
              <PasswordInput
                id="password"
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
              <Spinner className="h-4 w-4" />
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
