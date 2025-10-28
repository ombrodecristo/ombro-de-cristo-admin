import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { CheckCircle } from 'lucide-react'

export default function AuthConfirmed() {
  return (
    <Card className="w-full max-w-md">
      <CardHeader className="items-center text-center">
        <CheckCircle className="h-12 w-12 text-primary" />
        <CardTitle className="text-2xl text-primary">
          E-mail Confirmado!
        </CardTitle>
      </CardHeader>
      <CardContent className="text-center">
        <p className="text-muted-foreground">
          Sua conta foi verificada com sucesso.
          <br />
          Você já pode fechar esta página e retornar ao aplicativo.
        </p>
      </CardContent>
    </Card>
  )
}