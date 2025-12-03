import { keyframes } from "@emotion/react";
import { Link } from "react-router-dom";
import { Box, Text, Button, Logo } from "@/shared/components";
import {
  IoLogoGooglePlaystore,
  IoLogoApple,
  IoBookOutline,
  IoHeartOutline,
  IoShieldOutline,
} from "react-icons/io5";

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Feature = ({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) => (
  <Box
    backgroundColor="mainBackground"
    p="l"
    borderRadius="l"
    border="1px solid"
    borderColor="border"
    textAlign="left"
  >
    <Box color="primary" mb="m">
      {icon}
    </Box>
    <Text
      as="h3"
      variant="subHeader"
      color="headerForeground"
      fontSize="20px"
      mb="s"
    >
      {title}
    </Text>
    <Text variant="body" color="mutedForeground" lineHeight="1.6">
      {description}
    </Text>
  </Box>
);

const StoreButton = ({
  href,
  icon,
  line1,
  line2,
}: {
  href: string;
  icon: React.ReactNode;
  line1: string;
  line2: string;
}) => (
  <Box
    as="a"
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    display="inline-flex"
    alignItems="center"
    gap="8px"
    p="12px 24px"
    backgroundColor="black"
    color="white"
    borderRadius="m"
    minWidth="220px"
    css={{
      textDecoration: "none",
      transition: "transform 0.2s",
      "&:hover": { transform: "scale(1.05)" },
    }}
  >
    {icon}
    <Box>
      <Text fontSize="12px" color="white">
        {line1}
      </Text>
      <Text fontSize="18px" fontWeight="600" color="white">
        {line2}
      </Text>
    </Box>
  </Box>
);

export default function LandingPage() {
  return (
    <Box width="100%" backgroundColor="mainBackground" color="mainForeground">
      <Box
        as="header"
        p="m"
        backgroundColor="cardBackground"
        borderBottom="1px solid"
        borderColor="border"
      >
        <Box
          as="nav"
          maxWidth="1200px"
          mx="auto"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Logo
            css={{
              transform: "scale(0.6)",
              alignItems: "flex-start",
              gap: 0,
              "& h1, & p": { textAlign: "left" },
            }}
          />
          <Link to="/login" style={{ textDecoration: "none" }}>
            <Button
              label="Acesso Administrativo"
              variant="secondary"
              style={{ width: "auto", height: "44px" }}
            />
          </Link>
        </Box>
      </Box>

      <Box as="main" display="flex" flexDirection="column">
        <Box
          as="section"
          minHeight={{ _: "60vh", tablet: "70vh" }}
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          textAlign="center"
          gap="24px"
          p={{ _: "32px 24px", tablet: "48px 24px" }}
          maxWidth="1200px"
          mx="auto"
          css={{ animation: `${fadeInUp} 0.8s ease-out` }}
        >
          <Text
            as="h1"
            variant="header"
            fontSize={{ _: "36px", tablet: "56px" }}
            lineHeight={1.2}
            maxWidth="800px"
          >
            Sua missão,{" "}
            <Text as="span" color="primary">
              fortalecida
            </Text>{" "}
            pela mentoria.
          </Text>
          <Text
            variant="body"
            fontSize={{ _: "18px", tablet: "20px" }}
            lineHeight={1.6}
            color="mutedForeground"
            maxWidth="600px"
          >
            O Ombro de Cristo é a plataforma que conecta missionários e
            mentores, oferecendo ferramentas para uma jornada espiritual mais
            profunda e acompanhada.
          </Text>
        </Box>

        <Box
          as="section"
          p={{ _: "32px 24px", tablet: "48px 24px" }}
          maxWidth="1200px"
          mx="auto"
          width="100%"
          textAlign="center"
          backgroundColor="cardBackground"
          borderTop="1px solid"
          borderBottom="1px solid"
          borderColor="border"
        >
          <Text
            as="h2"
            variant="header"
            fontSize={{ _: "28px", tablet: "36px" }}
            mb="l"
          >
            Ferramentas para sua caminhada
          </Text>
          <Box
            display="grid"
            gridTemplateColumns="repeat(auto-fit, minmax(300px, 1fr))"
            gap="24px"
            mt="xl"
          >
            <Feature
              icon={<IoBookOutline size={32} />}
              title="Devocionais Inspiradores"
              description="Comece e termine seu dia com reflexões que nutrem a alma e direcionam seu propósito."
            />
            <Feature
              icon={<IoHeartOutline size={32} />}
              title="Diário Pessoal"
              description="Um espaço seguro para registrar suas orações, pensamentos e o agir de Deus em sua vida."
            />
            <Feature
              icon={<IoShieldOutline size={32} />}
              title="Mentoria Segura"
              description="Compartilhe suas jornadas com seu mentor e receba apoio, oração e direcionamento com total privacidade."
            />
          </Box>
        </Box>

        <Box
          as="section"
          p={{ _: "32px 24px", tablet: "48px 24px" }}
          maxWidth="1200px"
          mx="auto"
          width="100%"
          textAlign="center"
        >
          <Text
            as="h2"
            variant="header"
            fontSize={{ _: "28px", tablet: "36px" }}
          >
            Faça parte desta jornada
          </Text>
          <Text
            variant="body"
            fontSize={{ _: "18px", tablet: "20px" }}
            lineHeight={1.6}
            color="mutedForeground"
            maxWidth="600px"
            mx="auto"
          >
            Baixe o aplicativo e transforme sua vida ministerial.
          </Text>
          <Box
            display="flex"
            flexDirection={{ _: "column", tablet: "row" }}
            gap="16px"
            justifyContent="center"
            alignItems="center"
            mt="l"
          >
            <StoreButton
              href="https://play.google.com/store/apps/details?id=com.br.ombrodecristo"
              icon={<IoLogoGooglePlaystore size={24} />}
              line1="Disponível no"
              line2="Google Play"
            />
            <StoreButton
              href="https://apps.apple.com"
              icon={<IoLogoApple size={30} />}
              line1="Baixar na"
              line2="App Store"
            />
          </Box>
        </Box>
      </Box>

      <Box
        as="footer"
        textAlign="center"
        p="l"
        backgroundColor="mutedBackground"
        color="mutedForeground"
        fontSize="14px"
        borderTop="1px solid"
        borderColor="border"
      >
        © {new Date().getFullYear()} Ombro de Cristo. Todos os direitos
        reservados.
        <br />
        <Text
          as={Link}
          to="/terms-and-policy"
          variant="bodyMedium"
          fontSize="14px"
          color="primary"
          css={{
            textDecoration: "none",
            "&:hover": { textDecoration: "underline" },
          }}
        >
          Termos de Uso e Política de Privacidade
        </Text>
      </Box>
    </Box>
  );
}
