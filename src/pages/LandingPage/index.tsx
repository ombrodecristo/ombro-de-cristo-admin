import { Mail, Lock, User, Users, ShieldHalf } from "lucide-react";
import { FaApple } from "react-icons/fa";
import { IoLogoGooglePlaystore } from "react-icons/io5";
import { useLandingPageViewModel } from "./useLandingPageViewModel";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { type UserGender } from "@/types/database";
import { PasswordInput } from "@/components/ui/password-input";
import { useEffect } from "react";
import { toast } from "sonner";
import { Spinner } from "@/components/ui/spinner";

export default function LandingPage() {
  const {
    fullName,
    setFullName,
    gender,
    setGender,
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    loading,
    error,
    successMessage,
    handleSubmit,
  } = useLandingPageViewModel();

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
    }
  }, [successMessage]);

  return (
    <div className="flex w-full min-h-screen flex-col md:h-screen md:flex-row md:overflow-hidden">
      <div
        className="flex flex-col items-center justify-center gap-2 bg-primary p-6 text-center text-primary-foreground 
                  md:h-full md:w-1/3 md:gap-2 md:p-12"
      >
        <div className="flex flex-row items-center justify-center gap-3 md:flex-col md:gap-6">
          <ShieldHalf className="h-8 w-8 md:h-24 md:w-24" />
          <h1 className="text-2xl font-bold md:text-4xl">Ombro de Cristo</h1>
        </div>
        <p className="text-sm text-primary-foreground/80 md:text-lg">
          Sua missão, fortalecida pela mentoria.
        </p>
      </div>

      <div className="flex flex-1 items-center justify-center bg-background p-4 md:w-2/3 md:overflow-y-auto">
        <Card className="w-full max-w-md">
          <CardHeader className="items-center text-center">
            <CardTitle className="pt-2 text-xl">
              Junte-se à nossa comunidade
            </CardTitle>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-3">
                <Label htmlFor="fullName">Nome Completo</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="fullName"
                    type="text"
                    placeholder="Seu nome"
                    className="pl-9"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                    disabled={loading}
                  />
                </div>
              </div>

              <div className="space-y-3">
                <Label htmlFor="gender">Gênero</Label>
                <div className="relative">
                  <Users className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Select
                    value={gender}
                    onValueChange={(value) => setGender(value as UserGender)}
                    disabled={loading}
                    required
                  >
                    <SelectTrigger id="gender-select" className="pl-9">
                      <SelectValue placeholder="Seu gênero" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="MALE">Masculino</SelectItem>
                      <SelectItem value="FEMALE">Feminino</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

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
                    autoComplete="new-password"
                    disabled={loading}
                  />
                </div>
              </div>

              <div className="space-y-3">
                <Label htmlFor="confirmPassword">Confirmar Senha</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <PasswordInput
                    id="confirmPassword"
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
                  <Spinner className="h-4 w-4" />
                ) : (
                  <User className="h-4 w-4" />
                )}
                Criar conta
              </Button>
            </form>

            <div className="border-t my-6" />

            <div className="space-y-4 text-center">
              <p className="text-sm font-medium text-muted-foreground">
                Em breve nas principais lojas de aplicativos!
              </p>
              <div className="flex gap-4">
                <Button
                  variant="outline"
                  className="w-full"
                  disabled
                  title="Em breve"
                >
                  <IoLogoGooglePlaystore className="h-4 w-4" /> Google Play
                </Button>

                <Button
                  variant="outline"
                  className="w-full"
                  disabled
                  title="Em breve"
                >
                  <FaApple className="h-4 w-4" /> App Store
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
