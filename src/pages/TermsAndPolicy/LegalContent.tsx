import styled from "@emotion/styled";
import { Button } from "@/shared/components";
import { FiCheckCircle } from "react-icons/fi";

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: ${props => props.theme.spacing.xl}px;
`;

const H1 = styled.h1`
  font-family: ${props => props.theme.textVariants.header.fontFamily};
  font-weight: ${props => props.theme.textVariants.header.fontWeight};
  font-size: 24px;
  line-height: 32px;
  margin-bottom: ${props => props.theme.spacing.m}px;
`;

const H2 = styled.h2`
  font-family: ${props => props.theme.textVariants.subHeader.fontFamily};
  font-weight: ${props => props.theme.textVariants.subHeader.fontWeight};
  font-size: 18px;
  color: ${props => props.theme.colors.mainForeground};
  margin-top: ${props => props.theme.spacing.l}px;
  margin-bottom: ${props => props.theme.spacing.s}px;
`;

const P = styled.p`
  font-family: ${props => props.theme.textVariants.body.fontFamily};
  font-size: 16px;
  line-height: 26px;
  margin-bottom: ${props => props.theme.spacing.m}px;
  color: ${props => props.theme.colors.mutedForeground};
`;

const Bold = styled.strong`
  font-weight: 500;
  color: ${props => props.theme.colors.mainForeground};
`;

const UL = styled.ul`
  padding-left: ${props => props.theme.spacing.m}px;
  list-style: none;
`;

const LI = styled.li`
  font-family: ${props => props.theme.textVariants.body.fontFamily};
  font-size: 16px;
  line-height: 26px;
  color: ${props => props.theme.colors.mutedForeground};
  margin-bottom: ${props => props.theme.spacing.m}px;
  padding-left: ${props => props.theme.spacing.m}px;
  position: relative;

  &::before {
    content: "•";
    position: absolute;
    left: 0;
    color: ${props => props.theme.colors.primary};
  }
`;

const Divider = styled.div`
  height: 1px;
  background-color: ${props => props.theme.colors.border};
  margin: ${props => props.theme.spacing.l}px 0;
`;

const Footer = styled.div`
  position: sticky;
  bottom: 0;
  background-color: ${props => props.theme.colors.mainBackground}E6;
  backdrop-filter: blur(5px);
  padding: ${props => props.theme.spacing.m}px;
  margin: ${props => props.theme.spacing.xl}px -${props =>
      props.theme.spacing.xl}px -${props => props.theme.spacing.xl}px;
  text-align: center;
`;

type LegalContentProps = {
  showAcceptButton?: boolean;
  onAccept?: () => void;
};

export function LegalContent({
  showAcceptButton,
  onAccept,
}: LegalContentProps) {
  return (
    <Container>
      <H1>Termos de Uso</H1>
      <P>
        Bem-vindo(a) ao Ombro de Cristo. Estes Termos de Uso ("Termos") regem
        seu acesso e uso de nosso aplicativo móvel e serviços web
        ("Plataforma"). Ao criar uma conta ou usar nossa Plataforma, você
        concorda com o vínculo a estes Termos.
      </P>

      <H2>1. Aceitação dos Termos</H2>
      <P>
        Ao usar a Plataforma, você confirma que leu, entendeu e concorda em
        cumprir estes Termos, nossa Política de Privacidade e todas as leis e
        regulamentações aplicáveis. Se você não concordar com estes Termos, não
        deverá usar a Plataforma.
      </P>

      <H2>2. Descrição do Serviço</H2>
      <P>
        A Plataforma Ombro de Cristo é destinada a fortalecer a jornada
        espiritual por meio de devocionais, um diário pessoal e um sistema de
        mentoria. Os usuários(as) da plataforma são classificados como
        "Missionário(a)" ou "Mentor(a)".
      </P>

      <H2>3. Elegibilidade e Contas</H2>
      <UL>
        <LI>Você deve ter pelo menos 18 anos para criar uma conta.</LI>
        <LI>
          Você é responsável por manter a confidencialidade de sua senha e
          conta.
        </LI>
        <LI>
          Todas as informações fornecidas durante o cadastro devem ser
          verdadeiras, precisas e completas.
        </LI>
        <LI>
          Você é a única pessoa responsável por todas as atividades que ocorrem
          em sua conta.
        </LI>
      </UL>

      <H2>4. Conduta na Plataforma</H2>
      <P>Você concorda em não usar a Plataforma para:</P>
      <UL>
        <LI>
          Publicar conteúdo ilegal, ofensivo, difamatório, odioso ou que viole
          direitos de terceiros.
        </LI>
        <LI>Assediar, abusar ou prejudicar outra pessoa.</LI>
        <LI>Tentar obter acesso não autorizado a outras contas ou sistemas.</LI>
        <LI>
          Usar a Plataforma para qualquer finalidade comercial sem nosso
          consentimento prévio por escrito.
        </LI>
      </UL>

      <H2>5. Conteúdo do Diário e Compartilhamento</H2>
      <UL>
        <LI>
          Usuários(as) com o papel de Missionário(a) podem manter um diário
          pessoal.
        </LI>
        <LI>As entradas do diário são privadas por padrão.</LI>
        <LI>
          Usuários(as) com o papel de Missionário(a) têm a opção de compartilhar
          entradas específicas com seu/sua Mentor(a) designado(a). Ao
          compartilhar, você concede ao/à seu/sua Mentor(a) permissão para
          visualizar o conteúdo daquela entrada específica com o propósito de
          fornecer apoio espiritual e orientação.
        </LI>
        <LI>
          Nem o Ombro de Cristo nem sua Equipe de Administração têm acesso ao
          conteúdo do seu diário, seja ele compartilhado ou não.
        </LI>
      </UL>

      <Divider />

      <H1>Política de Privacidade</H1>
      <P>
        Sua privacidade é de extrema importância para nós. Esta Política de
        Privacidade descreve como a Plataforma Ombro de Cristo ("Plataforma",
        "nós", "nosso") coleta, usa e protege suas informações pessoais.
      </P>

      <H2>1. Informações que Coletamos</H2>
      <P>
        <Bold>a) Informações que você nos fornece:</Bold>
      </P>
      <UL>
        <LI>
          <Bold>Cadastro de Conta:</Bold> Coletamos seu nome completo, endereço
          de e-mail, gênero e igreja. Estas informações são usadas para criar e
          gerenciar sua conta, personalizar sua experiência e conectar
          Missionários(as) a Mentores(as) do mesmo gênero.
        </LI>
        <LI>
          <Bold>Conteúdo do Diário:</Bold> As entradas do seu diário são
          armazenadas em nossos servidores. Este conteúdo é criptografado e
          privado. Você tem controle total sobre ele e pode optar por
          compartilhá-lo com seu/sua Mentor(a).
        </LI>
      </UL>

      <P style={{ marginTop: "16px" }}>
        <Bold>b) Informações coletadas automaticamente:</Bold>
      </P>
      <UL>
        <LI>
          <Bold>Dados de Uso:</Bold> Podemos coletar informações sobre como você
          interage com a Plataforma, como os recursos que utiliza e o tempo
          gasto. Isso nos ajuda a melhorar nossos serviços.
        </LI>
        <LI>
          <Bold>Informações do Dispositivo:</Bold> Podemos coletar informações
          sobre o seu dispositivo, como modelo, sistema operacional e
          identificadores únicos, para fins de solução de problemas e análise.
        </LI>
      </UL>

      {showAcceptButton && onAccept && (
        <Footer>
          <Button
            label="Li e concordo"
            onClick={onAccept}
            icon={<FiCheckCircle />}
          />
        </Footer>
      )}
    </Container>
  );
}
