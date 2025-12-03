import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";
import { Button, Logo } from "@/shared/components";
import { FaGooglePlay, FaApple } from "react-icons/fa";
import { FiBookOpen, FiHeart, FiShield } from "react-icons/fi";
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

const PageContainer = styled.div`
  width: 100%;
  background-color: ${props => props.theme.colors.mainBackground};
  color: ${props => props.theme.colors.mainForeground};
`;

const Header = styled.header`
  padding: ${props => props.theme.spacing.m}px;
  background-color: ${props => props.theme.colors.cardBackground};
  border-bottom: 1px solid ${props => props.theme.colors.border};
`;

const Nav = styled.nav`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StyledLogo = styled(Logo)`
  transform: scale(0.6);
  align-items: flex-start;
  gap: 0;
  h1,
  p {
    text-align: left;
  }
`;

const Main = styled.main`
  display: flex;
  flex-direction: column;
`;

const Section = styled.section`
  padding: ${props => props.theme.spacing.xxxl}px
    ${props => props.theme.spacing.l}px;
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
  gap: ${props => props.theme.spacing.l}px;
  animation: ${fadeInUp} 0.8s ease-out;

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    min-height: 60vh;
    padding-top: ${props => props.theme.spacing.xl}px;
    padding-bottom: ${props => props.theme.spacing.xl}px;
  }
`;

const HeroTitle = styled.h1`
  font-size: 56px;
  line-height: 1.2;
  color: ${props => props.theme.colors.headerForeground};
  max-width: 800px;

  span {
    color: ${props => props.theme.colors.primary};
  }

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    font-size: 36px;
  }
`;

const HeroSubtitle = styled.p`
  font-family: ${props => props.theme.textVariants.body.fontFamily};
  font-size: 20px;
  line-height: 1.6;
  color: ${props => props.theme.colors.mutedForeground};
  max-width: 600px;

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    font-size: 18px;
  }
`;

const FeaturesSection = styled(Section)`
  background-color: ${props => props.theme.colors.cardBackground};
  border-top: 1px solid ${props => props.theme.colors.border};
  border-bottom: 1px solid ${props => props.theme.colors.border};
`;

const SectionTitle = styled.h2`
  font-size: 36px;
  color: ${props => props.theme.colors.headerForeground};
  margin-bottom: ${props => props.theme.spacing.l}px;

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    font-size: 28px;
  }
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${props => props.theme.spacing.l}px;
  margin-top: ${props => props.theme.spacing.xl}px;
`;

const FeatureCard = styled.div`
  background-color: ${props => props.theme.colors.mainBackground};
  padding: ${props => props.theme.spacing.l}px;
  border-radius: ${props => props.theme.borderRadii.l}px;
  border: 1px solid ${props => props.theme.colors.border};
  text-align: left;
`;

const FeatureIcon = styled.div`
  color: ${props => props.theme.colors.primary};
  margin-bottom: ${props => props.theme.spacing.m}px;
`;

const FeatureTitle = styled.h3`
  font-size: 20px;
  font-weight: 700;
  margin-bottom: ${props => props.theme.spacing.s}px;
`;

const FeatureDescription = styled.p`
  font-family: ${props => props.theme.textVariants.body.fontFamily};
  color: ${props => props.theme.colors.mutedForeground};
  line-height: 1.6;
`;

const CTASection = styled(Section)``;

const StoreButtons = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.m}px;
  justify-content: center;
  margin-top: ${props => props.theme.spacing.l}px;

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    flex-direction: column;
    align-items: center;
  }
`;

const StoreButton = styled.a`
  display: inline-flex;
  align-items: center;
  gap: ${props => props.theme.spacing.s}px;
  padding: ${props => props.theme.spacing.sm}px
    ${props => props.theme.spacing.l}px;
  background-color: #000;
  color: #fff;
  border-radius: ${props => props.theme.borderRadii.m}px;
  text-decoration: none;
  transition: transform 0.2s;
  min-width: 220px;

  &:hover {
    transform: scale(1.05);
  }
`;

const Footer = styled.footer`
  text-align: center;
  padding: ${props => props.theme.spacing.l}px;
  background-color: ${props => props.theme.colors.mutedBackground};
  color: ${props => props.theme.colors.mutedForeground};
  font-size: 14px;
  border-top: 1px solid ${props => props.theme.colors.border};
`;

const FooterLink = styled(Link)`
  color: ${props => props.theme.colors.primary};
  text-decoration: none;
  font-weight: 600;
  &:hover {
    text-decoration: underline;
  }
`;

export default function LandingPage() {
  return (
    <PageContainer>
      <Header>
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
      <Main>
        <HeroSection>
          <HeroTitle>
            Sua missão, <span>fortalecida</span> pela mentoria.
          </HeroTitle>
          <HeroSubtitle>
            O Ombro de Cristo é a plataforma que conecta missionários e
            mentores, oferecendo ferramentas para uma jornada espiritual mais
            profunda e acompanhada.
          </HeroSubtitle>
        </HeroSection>

        <FeaturesSection>
          <SectionTitle>Ferramentas para sua caminhada</SectionTitle>
          <FeaturesGrid>
            <FeatureCard>
              <FeatureIcon>
                <FiBookOpen size={32} />
              </FeatureIcon>
              <FeatureTitle>Devocionais Inspiradores</FeatureTitle>
              <FeatureDescription>
                Comece e termine seu dia com reflexões que nutrem a alma e
                direcionam seu propósito.
              </FeatureDescription>
            </FeatureCard>
            <FeatureCard>
              <FeatureIcon>
                <FiHeart size={32} />
              </FeatureIcon>
              <FeatureTitle>Diário Pessoal</FeatureTitle>
              <FeatureDescription>
                Um espaço seguro para registrar suas orações, pensamentos e o
                agir de Deus em sua vida.
              </FeatureDescription>
            </FeatureCard>
            <FeatureCard>
              <FeatureIcon>
                <FiShield size={32} />
              </FeatureIcon>
              <FeatureTitle>Mentoria Segura</FeatureTitle>
              <FeatureDescription>
                Compartilhe suas jornadas com seu mentor e receba apoio, oração
                e direcionamento com total privacidade.
              </FeatureDescription>
            </FeatureCard>
          </FeaturesGrid>
        </FeaturesSection>

        <CTASection>
          <SectionTitle>Faça parte desta jornada</SectionTitle>
          <HeroSubtitle>
            Baixe o aplicativo e transforme sua vida ministerial.
          </HeroSubtitle>
          <StoreButtons>
            <StoreButton
              href="https://play.google.com/store/apps/details?id=com.br.ombrodecristo"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGooglePlay size={24} />
              <div>
                <div>Disponível no</div>
                <div style={{ fontSize: "18px", fontWeight: "600" }}>
                  Google Play
                </div>
              </div>
            </StoreButton>
            <StoreButton
              href="https://apps.apple.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaApple size={30} />
              <div>
                <div>Baixar na</div>
                <div style={{ fontSize: "18px", fontWeight: "600" }}>
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
