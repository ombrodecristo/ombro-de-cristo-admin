import styled from "@emotion/styled";
import { useLocation } from "react-router-dom";
import { FiCheckCircle, FiAlertCircle } from "react-icons/fi";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";

const StatusIcon = styled.div`
  svg {
    width: 48px;
    height: 48px;
  }
`;

const ContentText = styled.p`
  color: ${props => props.theme.colors.mutedForeground};
  line-height: 1.6;
`;

export default function AuthConfirmed() {
  const { hash } = useLocation();
  const hashParams = new URLSearchParams(hash.substring(1));
  const errorDescription = hashParams.get("error_description");

  if (errorDescription) {
    return (
      <Card style={{ width: "100%", maxWidth: "448px" }}>
        <CardHeader>
          <StatusIcon>
            <FiAlertCircle style={{ color: "var(--color-destructive)" }} />
          </StatusIcon>
          <CardTitle style={{ color: "var(--color-destructive)" }}>
            Link Inválido
          </CardTitle>
        </CardHeader>

        <CardContent>
          <ContentText>
            Este link é inválido ou já expirou.
            <br />
            <br />
            Por favor, solicite um novo link ou entre em contato com o suporte.
          </ContentText>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card style={{ width: "100%", maxWidth: "448px" }}>
      <CardHeader>
        <StatusIcon>
          <FiCheckCircle style={{ color: "var(--color-primary)" }} />
        </StatusIcon>
        <CardTitle style={{ color: "var(--color-primary)" }}>
          Conta Confirmada
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ContentText>
          Sua conta foi confirmada com sucesso.
          <br />
          <br />
          Você já pode fechar esta página.
        </ContentText>
      </CardContent>
    </Card>
  );
}
