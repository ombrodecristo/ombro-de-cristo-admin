import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import React from "react";

const H1 = (props: React.HTMLAttributes<HTMLHeadingElement>) => (
  <h1 {...props} className={cn("text-3xl font-bold mb-4", props.className)} />
);

const H2 = (props: React.HTMLAttributes<HTMLHeadingElement>) => (
  <h2
    {...props}
    className={cn("text-xl font-bold mt-6 mb-2 text-primary", props.className)}
  />
);

const P = (props: React.HTMLAttributes<HTMLParagraphElement>) => (
  <p
    {...props}
    className={cn(
      "text-base leading-relaxed mb-4 text-muted-foreground",
      props.className
    )}
  />
);

const Bold = (props: React.HTMLAttributes<HTMLElement>) => (
  <strong
    {...props}
    className={cn("font-semibold text-foreground", props.className)}
  />
);

const LI = (props: React.LiHTMLAttributes<HTMLLIElement>) => (
  <li
    {...props}
    className={cn(
      "mb-2 ml-6 text-base leading-relaxed text-muted-foreground",
      props.className
    )}
  />
);

type LegalContentProps = {
  showAcceptButton?: boolean;
  onAccept?: () => void;
};

export function LegalContent({
  showAcceptButton,
  onAccept,
}: LegalContentProps) {
  return (
    <div className="container mx-auto max-w-4xl py-8 px-4 sm:px-6 lg:px-8">
      <H1>Termos e Condições de Uso</H1>
      <P>
        Bem-vindo ao Ombro de Cristo. Estes Termos de Uso ("Termos") regem seu
        acesso e uso de nosso aplicativo móvel e serviços web ("Plataforma"). Ao
        criar uma conta ou usar nossa Plataforma, você concorda em estar
        vinculado a estes Termos.
      </P>

      <H2>1. A Aceitação dos Termos</H2>
      <P>
        Ao usar a Plataforma, você confirma que leu, entendeu e concorda em
        cumprir estes Termos, nossa Política de Privacidade e todas as leis e
        regulamentações aplicáveis. Se você não concordar com estes Termos, não
        deverá usar a Plataforma.
      </P>

      <H2>2. Descrição do Serviço</H2>
      <P>
        A Plataforma Ombro de Cristo é destinada a fortalecer a jornada
        espiritual de missionários por meio de devocionais, um diário pessoal e
        um sistema de mentoria. Os usuários podem ser classificados como
        "Missionários" ou "Mentores".
      </P>

      <H2>3. Elegibilidade e Contas de Usuário</H2>
      <ul className="list-disc">
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
          Você é o único responsável por todas as atividades que ocorrem em sua
          conta.
        </LI>
      </ul>

      <H2>4. Conduta do Usuário</H2>
      <P>Você concorda em não usar a Plataforma para:</P>
      <ul className="list-disc">
        <LI>
          Publicar conteúdo ilegal, ofensivo, difamatório, odioso ou que viole
          os direitos de terceiros.
        </LI>
        <LI>Assediar, abusar ou prejudicar outra pessoa.</LI>
        <LI>Tentar obter acesso não autorizado a outras contas ou sistemas.</LI>
        <LI>
          Usar a Plataforma para qualquer finalidade comercial sem nosso
          consentimento prévio por escrito.
        </LI>
      </ul>

      <H2>5. Conteúdo do Diário e Compartilhamento</H2>
      <ul className="list-disc">
        <LI>Os Missionários podem manter um diário pessoal.</LI>
        <LI>As entradas do diário são privadas por padrão.</LI>
        <LI>
          Os Missionários têm a opção de compartilhar entradas específicas com
          seu Mentor designado. Ao compartilhar, você concede ao seu Mentor
          permissão para visualizar o conteúdo dessa entrada específica com o
          propósito de fornecer apoio espiritual e orientação.
        </LI>
        <LI>
          Nem o Ombro de Cristo nem seus administradores têm acesso ao conteúdo
          do seu diário, seja ele compartilhado ou não.
        </LI>
      </ul>

      <H2>6. Propriedade Intelectual</H2>
      <ul className="list-disc">
        <LI>
          O conteúdo fornecido pela Plataforma, incluindo devocionais, textos,
          gráficos e logotipos, é de nossa propriedade ou de nossos
          licenciadores e é protegido por leis de direitos autorais.
        </LI>
        <LI>
          O conteúdo que você cria (como entradas de diário) permanece sua
          propriedade.
        </LI>
      </ul>

      <H2>7. Isenção de Responsabilidade de Mentoria</H2>
      <ul className="list-disc">
        <LI>
          O relacionamento entre Mentor e Missionário é baseado em voluntariado
          e apoio espiritual.
        </LI>
        <LI>
          Os Mentores não são conselheiros profissionais, terapeutas ou
          profissionais de saúde mental licenciados, a menos que especificado de
          outra forma. A orientação fornecida é de natureza espiritual e não
          substitui o aconselhamento profissional.
        </LI>
        <LI>
          O Ombro de Cristo não se responsabiliza pela conduta ou conselhos
          dados pelos Mentores. Encorajamos os usuários a exercerem seu próprio
          discernimento.
        </LI>
      </ul>

      <H2>8. Rescisão</H2>
      <ul className="list-disc">
        <LI>
          Podemos suspender ou encerrar sua conta a qualquer momento, por
          qualquer motivo, incluindo a violação destes Termos.
        </LI>
        <LI>
          Você pode excluir sua conta a qualquer momento através das
          configurações do seu perfil. A exclusão da conta é permanente e
          resultará na remoção de todos os seus dados, incluindo as entradas do
          diário.
        </LI>
      </ul>

      <H2>9. Limitação de Responsabilidade</H2>
      <P>
        A Plataforma é fornecida "como está". Não garantimos que a Plataforma
        será ininterrupta ou livre de erros. Em nenhuma circunstância seremos
        responsáveis por quaisquer danos diretos, indiretos, incidentais ou
        consequenciais resultantes do uso ou da incapacidade de usar a
        Plataforma.
      </P>

      <H2>10. Alterações nos Termos</H2>
      <P>
        Reservamo-nos o direito de modificar estes Termos a qualquer momento.
        Notificaremos você sobre quaisquer alterações significativas. O uso
        contínuo da Plataforma após tais alterações constitui sua aceitação dos
        novos Termos.
      </P>

      <H2>11. Contato</H2>
      <P>
        Se você tiver alguma dúvida sobre estes Termos, entre em contato
        conosco.
      </P>

      <div className="border-t my-8"></div>

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
      <ul className="list-disc">
        <LI>
          <Bold>Cadastro de Conta:</Bold> Coletamos seu nome completo, endereço
          de e-mail, gênero e igreja. Estas informações são usadas para criar e
          gerenciar sua conta, personalizar sua experiência e, no caso do
          gênero, para conectar Missionários a Mentores do mesmo gênero.
        </LI>
        <LI>
          <Bold>Conteúdo do Diário:</Bold> As entradas do seu diário são
          armazenadas em nossos servidores. Este conteúdo é criptografado e
          privado. Você tem controle total sobre ele e pode optar por
          compartilhá-lo com seu Mentor.
        </LI>
      </ul>

      <P className="mt-4">
        <Bold>b) Informações coletadas automaticamente:</Bold>
      </P>
      <ul className="list-disc">
        <LI>
          <Bold>Dados de Uso:</Bold> Podemos coletar informações sobre como você
          interage com a Plataforma, como os recursos que você usa e o tempo
          gasto. Isso nos ajuda a melhorar nossos serviços.
        </LI>
        <LI>
          <Bold>Informações do Dispositivo:</Bold> Podemos coletar informações
          sobre o seu dispositivo, como modelo, sistema operacional e
          identificadores únicos, para fins de solução de problemas e análise.
        </LI>
      </ul>

      <H2>2. Como Usamos Suas Informações</H2>
      <ul className="list-disc">
        <LI>
          <Bold>Para Fornecer e Manter o Serviço:</Bold> Usamos suas informações
          para operar a Plataforma, autenticar usuários, fornecer devocionais e
          facilitar a funcionalidade de diário e mentoria.
        </LI>
        <LI>
          <Bold>Comunicação:</Bold> Podemos usar seu e-mail para enviar
          notificações importantes sobre sua conta, atualizações do serviço ou
          alterações em nossas políticas.
        </LI>
        <LI>
          <Bold>Personalização:</Bold> Usamos informações como seu nome e gênero
          para personalizar sua experiência (por exemplo, saudações e designação
          de mentoria).
        </LI>
        <LI>
          <Bold>Segurança e Proteção:</Bold> Usamos as informações para proteger
          a segurança e a integridade de nosso serviço e de nossos usuários.
        </LI>
      </ul>

      <H2>3. Compartilhamento e Divulgação de Informações</H2>
      <P>
        Sua privacidade é nossa prioridade. Não vendemos, alugamos ou
        compartilhamos suas informações pessoais com terceiros para fins de
        marketing.
      </P>
      <ul className="list-disc">
        <LI>
          <Bold>Mentoria:</Bold> Se você é um Missionário e opta por
          compartilhar uma entrada de diário, essa entrada específica será
          visível para o seu Mentor designado. Nenhuma outra informação ou
          entrada é compartilhada sem sua ação explícita.
        </LI>
        <LI>
          <Bold>Obrigações Legais:</Bold> Podemos divulgar suas informações se
          formos obrigados por lei ou se acreditarmos de boa fé que tal ação é
          necessária para cumprir um processo legal.
        </LI>
        <LI>
          <Bold>Provedores de Serviço:</Bold> Usamos provedores de serviços de
          terceiros (como Supabase para backend e armazenamento) que processam
          dados em nosso nome. Esses provedores são obrigados contratualmente a
          proteger suas informações e só podem usá-las para os fins que
          especificamos.
        </LI>
      </ul>

      <H2>4. Segurança de Dados</H2>
      <P>
        Implementamos medidas de segurança técnicas e organizacionais para
        proteger suas informações pessoais.
      </P>
      <ul className="list-disc">
        <LI>
          <Bold>Criptografia:</Bold> O conteúdo do seu diário é criptografado em
          nosso banco de dados.
        </LI>
        <LI>
          <Bold>Acesso Restrito:</Bold> O acesso direto ao banco de dados é
          estritamente limitado a pessoal autorizado. Nossos administradores não
          podem visualizar o conteúdo das entradas do seu diário.
        </LI>
        <LI>
          <Bold>Autenticação Segura:</Bold> Usamos métodos de autenticação
          seguros para proteger o acesso à sua conta.
        </LI>
      </ul>

      <H2>5. Seus Direitos e Escolhas</H2>
      <ul className="list-disc">
        <LI>
          <Bold>Acesso e Atualização:</Bold> Você pode revisar e atualizar as
          informações do seu perfil a qualquer momento na Plataforma.
        </LI>
        <LI>
          <Bold>Exclusão de Conta:</Bold> Você pode excluir sua conta
          permanentemente na seção de configurações do perfil. A exclusão
          resultará na remoção completa e irreversível de todos os seus dados,
          incluindo nome, e-mail e todas as entradas do diário.
        </LI>
        <LI>
          <Bold>Compartilhamento do Diário:</Bold> Você tem controle total sobre
          quais entradas do diário, se houver, são compartilhadas com seu
          Mentor.
        </LI>
      </ul>

      <H2>6. Privacidade de Crianças</H2>
      <P>
        Nosso serviço não se destina a indivíduos menores de 18 anos. Não
        coletamos intencionalmente informações pessoais de crianças.
      </P>

      <H2>7. Alterações a esta Política</H2>
      <P>Podemos atualizar nossa Política de Privacidade periodicamente.</P>

      <H2>8. Contato</H2>
      <P>
        Se você tiver alguma dúvida ou preocupação sobre nossa Política de
        Privacidade, entre em contato conosco.
      </P>
      {showAcceptButton && onAccept && (
        <div className="sticky bottom-0 bg-background/80 backdrop-blur-sm p-4 mt-8 -mx-4 -mb-8 text-center">
          <Button size="lg" onClick={onAccept}>
            Li e concordo
          </Button>
        </div>
      )}
    </div>
  );
}
