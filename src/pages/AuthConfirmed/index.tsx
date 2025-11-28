import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, AlertCircle } from "lucide-react";
import { useLocation } from "react-router-dom";

export default function AuthConfirmed() {
  const { hash } = useLocation();
  const hashParams = new URLSearchParams(hash.substring(1));
  const errorDescription = hashParams.get("error_description");

  if (errorDescription) {
    return (
      <Card className="w-full max-w-md">
        <CardHeader className="items-center text-center">
          <AlertCircle className="h-12 w-12 text-destructive" />
          <CardTitle className="text-2xl text-destructive">
            Link Inválido
          </CardTitle>
        </CardHeader>

        <CardContent className="text-center">
          <p className="text-muted-foreground">
            Este link de confirmação é inválido ou já expirou.
            <br />
            <br />
            Por favor, tente novamente ou entre em contato com a equipe de
            suporte se o problema persistir.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="items-center text-center">
        <CheckCircle className="h-12 w-12 text-primary" />
        <CardTitle className="text-2xl text-primary">
          Conta Confirmada
        </CardTitle>
      </CardHeader>

      <CardContent className="text-center">
        <p className="text-muted-foreground">
          Sua conta foi confirmada com sucesso.
          <br />
          <br />
          Você já pode fechar esta página.
        </p>
      </CardContent>
    </Card>
  );
}
