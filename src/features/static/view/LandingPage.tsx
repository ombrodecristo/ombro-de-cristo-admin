import styled from "@emotion/styled";
import { Box, Button, Logo, Text } from "@/shared/components";
import { IoLogoGooglePlaystore, IoLogoApple } from "react-icons/io5";
import {
  IoBookOutline,
  IoHeartOutline,
  IoShieldOutline,
} from "react-icons/io5";

const PageContainer = styled(Box)`
  width: 100%;
  height: 100vh;
  background-color: ${props => props.theme.colors.mainBackground};
  color: ${props => props.theme.colors.mainForeground};
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const Header = styled(Box)`
  padding: ${props => props.theme.spacing.s}px
    ${props => props.theme.spacing.m}px;
  background-color: ${props => props.theme.colors.cardBackground};
  border-bottom: 1px solid ${props => props.theme.colors.border};
  flex-shrink: 0;
`;

const Nav = styled(Box)`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Main = styled(Box)`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${props => props.theme.spacing.l};
  text-align: center;
  position: relative;
`;

const ContentWrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${props => props.theme.spacing.l}px;
  max-width: 800px;
`;

const HeroTitle = styled(Text)`
  font-size: 48px;
  line-height: 1.2;
  color: ${props => props.theme.colors.headerForeground};

  span {
    color: ${props => props.theme.colors.primary};
  }

  @media (max-width: 768px) {
    font-size: 32px;
  }
`;

const FeaturesContainer = styled(Box)`
  display: flex;
  gap: ${props => props.theme.spacing.xxl}px;
  margin-top: ${props => props.theme.spacing.m}px;

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    flex-direction: column;
    gap: ${props => props.theme.spacing.l}px;
  }
`;

const FeatureItem = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${props => props.theme.spacing.s}px;
  color: ${props => props.theme.colors.mutedForeground};
  max-width: 200px;
`;

const FeatureIcon = styled(Box)`
  color: ${props => props.theme.colors.primary};
  margin-bottom: ${props => props.theme.spacing.xs}px;
`;

const StoreButtons = styled(Box)`
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
  justify-content: center;
  gap: ${props => props.theme.spacing.s}px;
  padding: ${props => props.theme.spacing.sm}px
    ${props => props.theme.spacing.l}px;
  background-color: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.primaryForeground};
  border-radius: ${props => props.theme.radii.m}px;
  text-decoration: none;
  transition: all 0.2s ease-in-out;
  min-width: 220px;

  &:hover {
    transform: scale(1.05);
    opacity: 0.9;
  }

  & > div {
    text-align: left;
  }
`;

const Footer = styled.footer`
  position: absolute;
  bottom: ${props => props.theme.spacing.m}px;
  left: 0;
  right: 0;
  text-align: center;
  padding: 0 ${props => props.theme.spacing.m}px;
  font-size: 14px;
  color: ${props => props.theme.colors.mutedForeground};
`;

const FooterLink = styled.a`
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
          <Logo direction="row" size={40} showSlogan={false} variant="dark" />
          <a
            href="/login"
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: "none" }}
          >
            <Button
              label="Acesso Administrativo"
              variant="secondary"
              style={{ width: "auto", height: "44px" }}
            />
          </a>
        </Nav>
      </Header>
      <Main as="main">
        <ContentWrapper>
          <HeroTitle as="h1" variant="header">
            Sua missão, <span>fortalecida</span> pela mentoria.
          </HeroTitle>

          <Text
            as="p"
            variant="body"
            fontSize="18px"
            color="mutedForeground"
            lineHeight="1.6"
            maxWidth="600px"
          >
            O Ombro de Cristo conecta missionários e mentores com ferramentas
            para uma jornada espiritual mais profunda e acompanhada.
          </Text>

          <FeaturesContainer>
            <FeatureItem>
              <FeatureIcon>
                <IoBookOutline size={32} />
              </FeatureIcon>
              <Text as="h3" variant="bodyMedium" color="headerForeground">
                Devocionais
              </Text>
              <Text as="p" variant="caption" fontSize="14px">
                Reflexões que nutrem a alma e direcionam seu propósito.
              </Text>
            </FeatureItem>
            <FeatureItem>
              <FeatureIcon>
                <IoHeartOutline size={32} />
              </FeatureIcon>
              <Text as="h3" variant="bodyMedium" color="headerForeground">
                Diário Pessoal
              </Text>
              <Text as="p" variant="caption" fontSize="14px">
                Um espaço seguro para registrar suas orações e pensamentos.
              </Text>
            </FeatureItem>
            <FeatureItem>
              <FeatureIcon>
                <IoShieldOutline size={32} />
              </FeatureIcon>
              <Text as="h3" variant="bodyMedium" color="headerForeground">
                Mentoria Segura
              </Text>
              <Text as="p" variant="caption" fontSize="14px">
                Receba apoio, oração e direcionamento com total privacidade.
              </Text>
            </FeatureItem>
          </FeaturesContainer>

          <StoreButtons>
            <StoreButton
              href="https://play.google.com/store/apps/details?id=com.br.ombrodecristo"
              target="_blank"
              rel="noopener noreferrer"
            >
              <IoLogoGooglePlaystore size={24} />
              <div>
                <div style={{ fontSize: "12px", lineHeight: 1.2 }}>
                  Disponível no
                </div>
                <div
                  style={{ fontSize: "18px", fontWeight: 600, lineHeight: 1.2 }}
                >
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
                <div style={{ fontSize: "12px", lineHeight: 1.2 }}>
                  Baixar na
                </div>
                <div
                  style={{ fontSize: "18px", fontWeight: 600, lineHeight: 1.2 }}
                >
                  App Store
                </div>
              </div>
            </StoreButton>
          </StoreButtons>
        </ContentWrapper>
        <Footer>
          © {new Date().getFullYear()} Ombro de Cristo. Todos os direitos
          reservados.
          {" | "}
          <FooterLink
            href="/terms-and-policy"
            target="_blank"
            rel="noopener noreferrer"
          >
            Termos de Uso e Política de Privacidade
          </FooterLink>
        </Footer>
      </Main>
    </PageContainer>
  );
}
