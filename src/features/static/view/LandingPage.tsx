import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";
import { Box, Button, Logo, Text } from "@/shared/components";
import { IoLogoGooglePlaystore, IoLogoApple } from "react-icons/io5";
import {
  IoBookOutline,
  IoHeartOutline,
  IoShieldOutline,
} from "react-icons/io5";
import { Link } from "react-router-dom";

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

const PageContainer = styled(Box)`
  width: 100%;
  background-color: ${props => props.theme.colors.mainBackground};
  color: ${props => props.theme.colors.mainForeground};
`;

const Header = styled(Box)`
  padding: ${props => props.theme.spacing.m};
  background-color: ${props => props.theme.colors.cardBackground};
  border-bottom: 1px solid ${props => props.theme.colors.border};
`;

const Nav = styled(Box)`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StyledLogo = styled(Logo)`
  transform: scale(0.6);
  & > div {
    align-items: flex-start;
  }
`;

const Main = styled(Box)`
  display: flex;
  flex-direction: column;
`;

const Section = styled(Box)`
  padding-top: ${props => props.theme.spacing.xxxl};
  padding-bottom: ${props => props.theme.spacing.xxxl};
  padding-left: ${props => props.theme.spacing.l};
  padding-right: ${props => props.theme.spacing.l};
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  text-align: center;
`;

const HeroSection = styled(Section)`
  min-height: 70vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${props => props.theme.spacing.l};
  animation: ${fadeInUp} 0.8s ease-out;

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    min-height: 60vh;
    padding-top: ${props => props.theme.spacing.xl};
    padding-bottom: ${props => props.theme.spacing.xl};
  }
`;

const HeroTitle = styled(Text)`
  font-size: 56px;
  line-height: 1.2;
  color: ${props => props.theme.colors.headerForeground};

  span {
    color: ${props => props.theme.colors.primary};
  }

  @media (max-width: 768px) {
    font-size: 36px;
  }
`;

const FeaturesSection = styled(Section)`
  background-color: ${props => props.theme.colors.cardBackground};
  border-top: 1px solid ${props => props.theme.colors.border};
  border-bottom: 1px solid ${props => props.theme.colors.border};
`;

const SectionTitle = styled(Text)`
  font-size: 36px;
  margin-bottom: ${props => props.theme.spacing.l};
  color: ${props => props.theme.colors.headerForeground};

  @media (max-width: 768px) {
    font-size: 28px;
  }
`;

const FeaturesGrid = styled(Box)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${props => props.theme.spacing.l};
  margin-top: ${props => props.theme.spacing.xl};
`;

const FeatureCard = styled(Box)`
  background-color: ${props => props.theme.colors.mainBackground};
  padding: ${props => props.theme.spacing.l};
  border-radius: ${props => props.theme.borderRadii.l};
  border: 1px solid ${props => props.theme.colors.border};
  text-align: left;
`;

const FeatureIcon = styled(Box)`
  color: ${props => props.theme.colors.primary};
  margin-bottom: ${props => props.theme.spacing.m};
`;

const CTASection = styled(Section)``;

const StoreButtons = styled(Box)`
  display: flex;
  gap: ${props => props.theme.spacing.m};
  justify-content: center;
  margin-top: ${props => props.theme.spacing.l};

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    flex-direction: column;
    align-items: center;
  }
`;

const StoreButton = styled.a`
  display: inline-flex;
  align-items: center;
  gap: ${props => props.theme.spacing.s};
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.l};
  background-color: #000;
  color: #fff;
  border-radius: ${props => props.theme.borderRadii.m};
  text-decoration: none;
  transition: transform 0.2s;
  min-width: 220px;

  &:hover {
    transform: scale(1.05);
  }
`;

const Footer = styled.footer`
  text-align: center;
  padding: ${props => props.theme.spacing.l};
  background-color: ${props => props.theme.colors.mutedBackground};
  color: ${props => props.theme.colors.mutedForeground};
  font-size: 14px;
  border-top: 1px solid ${props => props.theme.colors.border};
`;

const FooterLink = styled(Link)`
  font-family: ${props => props.theme.textVariants.bodyMedium.fontFamily};
  font-weight: ${props => props.theme.textVariants.bodyMedium.fontWeight};
  font-size: 14px;
  color: ${props => props.theme.colors.primary};
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

export default function LandingPage() {
  return (
    <PageContainer>
      <Header as="header">
        <Nav>
          <StyledLogo variant="dark" />
          <Link to="/login" style={{ textDecoration: "none" }}>
            <Button
              label="Acesso Administrativo"
              variant="secondary"
              style={{ width: "auto", height: "44px" }}
            />
          </Link>
        </Nav>
      </Header>
      <Main as="main">
        <HeroSection>
          <HeroTitle as="h1" variant="header" maxWidth="800px">
            Sua missão, <span>fortalecida</span> pela mentoria.
          </HeroTitle>
          <Text
            as="p"
            variant="body"
            fontSize="20px"
            color="mutedForeground"
            lineHeight="1.6"
            maxWidth="600px"
          >
            O Ombro de Cristo é a plataforma que conecta missionários e
            mentores, oferecendo ferramentas para uma jornada espiritual mais
            profunda e acompanhada.
          </Text>
        </HeroSection>

        <FeaturesSection>
          <SectionTitle as="h2" variant="header">
            Ferramentas para sua caminhada
          </SectionTitle>
          <FeaturesGrid>
            <FeatureCard>
              <FeatureIcon>
                <IoBookOutline size={32} />
              </FeatureIcon>
              <Text
                as="h3"
                variant="subHeader"
                color="headerForeground"
                fontSize="20px"
                mb="s"
              >
                Devocionais Inspiradores
              </Text>
              <Text
                as="p"
                variant="body"
                color="mutedForeground"
                lineHeight="1.6"
              >
                Comece e termine seu dia com reflexões que nutrem a alma e
                direcionam seu propósito.
              </Text>
            </FeatureCard>
            <FeatureCard>
              <FeatureIcon>
                <IoHeartOutline size={32} />
              </FeatureIcon>
              <Text
                as="h3"
                variant="subHeader"
                color="headerForeground"
                fontSize="20px"
                mb="s"
              >
                Diário Pessoal
              </Text>
              <Text
                as="p"
                variant="body"
                color="mutedForeground"
                lineHeight="1.6"
              >
                Um espaço seguro para registrar suas orações, pensamentos e o
                agir de Deus em sua vida.
              </Text>
            </FeatureCard>
            <FeatureCard>
              <FeatureIcon>
                <IoShieldOutline size={32} />
              </FeatureIcon>
              <Text
                as="h3"
                variant="subHeader"
                color="headerForeground"
                fontSize="20px"
                mb="s"
              >
                Mentoria Segura
              </Text>
              <Text
                as="p"
                variant="body"
                color="mutedForeground"
                lineHeight="1.6"
              >
                Compartilhe suas jornadas com seu mentor e receba apoio, oração
                e direcionamento com total privacidade.
              </Text>
            </FeatureCard>
          </FeaturesGrid>
        </FeaturesSection>

        <CTASection>
          <SectionTitle as="h2" variant="header">
            Faça parte desta jornada
          </SectionTitle>
          <Text
            as="p"
            variant="body"
            fontSize="20px"
            color="mutedForeground"
            lineHeight="1.6"
            maxWidth="600px"
          >
            Baixe o aplicativo e transforme sua vida ministerial.
          </Text>
          <StoreButtons>
            <StoreButton
              href="https://play.google.com/store/apps/details?id=com.br.ombrodecristo"
              target="_blank"
              rel="noopener noreferrer"
            >
              <IoLogoGooglePlaystore size={24} />
              <div>
                <div style={{ fontSize: "12px" }}>Disponível no</div>
                <div style={{ fontSize: "18px", fontWeight: 600 }}>
                  Google Play
                </div>
              </div>
            </StoreButton>
            <StoreButton
              href="https://apps.apple.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <IoLogoApple size={30} />
              <div>
                <div style={{ fontSize: "12px" }}>Baixar na</div>
                <div style={{ fontSize: "18px", fontWeight: 600 }}>
                  App Store
                </div>
              </div>
            </StoreButton>
          </StoreButtons>
        </CTASection>
      </Main>
      <Footer>
        © {new Date().getFullYear()} Ombro de Cristo. Todos os direitos
        reservados.
        <br />
        <FooterLink to="/terms-and-policy">
          Termos de Uso e Política de Privacidade
        </FooterLink>
      </Footer>
    </PageContainer>
  );
}
