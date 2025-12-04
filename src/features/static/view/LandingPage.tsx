import { useState, useEffect, useRef, type TouchEvent } from "react";
import styled from "@emotion/styled";
import { Box, Button, Logo, Text } from "@/shared/components";
import { IoLogoGooglePlaystore, IoLogoApple } from "react-icons/io5";
import {
  IoBookOutline,
  IoHeartOutline,
  IoShieldOutline,
} from "react-icons/io5";

const features = [
  {
    icon: <IoBookOutline size={32} />,
    title: "Devocionais",
    description: "Reflexões que nutrem a alma e direcionam seu propósito.",
  },
  {
    icon: <IoHeartOutline size={32} />,
    title: "Diário Pessoal",
    description: "Um espaço seguro para registrar suas orações e pensamentos.",
  },
  {
    icon: <IoShieldOutline size={32} />,
    title: "Mentoria Segura",
    description: "Receba apoio, oração e direcionamento com total privacidade.",
  },
];

const PageContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100%;
  background-color: ${props => props.theme.colors.mainBackground};
  color: ${props => props.theme.colors.mainForeground};
  background: radial-gradient(
    ellipse at 50% -20%,
    ${props => props.theme.colors.mutedBackground},
    ${props => props.theme.colors.mainBackground} 70%
  );
`;

const Header = styled(Box)`
  padding: ${props => props.theme.spacing.m}px
    ${props => props.theme.spacing.l}px;
  flex-shrink: 0;
  width: 100%;
  border-bottom: 1px solid ${props => props.theme.colors.border};
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
  overflow: hidden;
  padding: ${props => props.theme.spacing.l}px;
  text-align: center;
`;

const ContentWrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${props => props.theme.spacing.l}px;
  max-width: 800px;
  width: 100%;
  padding: ${props => props.theme.spacing.m}px 0;
  transition: all 0.2s ease-out;

  @media (max-height: 720px) {
    gap: ${props => props.theme.spacing.m}px;
    padding: ${props => props.theme.spacing.s}px 0;
  }
`;

const HeroTitle = styled(Text)`
  font-size: 48px;
  line-height: 1.2;
  color: ${props => props.theme.colors.headerForeground};
  font-weight: 700;

  span {
    color: ${props => props.theme.colors.primary};
  }

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    font-size: 32px;
  }
`;

const Subtitle = styled(Text)`
  font-size: 18px;
  color: ${props => props.theme.colors.mutedForeground};
  line-height: 1.6;
  max-width: 600px;

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    font-size: 16px;
  }
  @media (max-height: 680px) {
    display: none;
  }
`;

const FeaturesSection = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-top: ${props => props.theme.spacing.m}px;
`;

const FeaturesContainer = styled(Box)`
  display: flex;
  justify-content: center;
  gap: ${props => props.theme.spacing.l}px;
  flex-wrap: wrap;

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    width: 100%;
    overflow: hidden;
  }
`;

const CarouselTrack = styled(Box)<{ activeIndex: number }>`
  display: flex;
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    transition: transform 0.4s ease-in-out;
    transform: translateX(-${props => props.activeIndex * 100}%);
  }
`;

const FeatureItem = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${props => props.theme.spacing.s}px;
  color: ${props => props.theme.colors.mutedForeground};
  width: 240px;

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    width: 100%;
    flex-shrink: 0;
    padding: 0 ${props => props.theme.spacing.m}px;
  }
`;

const FeatureIcon = styled(Box)`
  color: ${props => props.theme.colors.primary};
  margin-bottom: ${props => props.theme.spacing.xs}px;
`;

const CarouselDots = styled(Box)`
  display: none;
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    display: flex;
    justify-content: center;
    gap: ${props => props.theme.spacing.s}px;
    margin-top: ${props => props.theme.spacing.l}px;
  }
`;

const Dot = styled.button<{ isActive: boolean }>`
  background-color: ${props =>
    props.isActive ? props.theme.colors.primary : props.theme.colors.border};
  width: 10px;
  height: 10px;
  border-radius: 50%;
  border: none;
  cursor: pointer;
  padding: 0;
  transition: all 0.3s;
  transform: ${props => (props.isActive ? "scale(1.2)" : "scale(1)")};
`;

const StoreButtons = styled(Box)`
  display: flex;
  gap: ${props => props.theme.spacing.m}px;
  justify-content: center;
  margin-top: ${props => props.theme.spacing.l}px;
  flex-wrap: wrap;

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    flex-direction: column;
    align-items: center;
    width: 100%;
    max-width: 280px;
  }

  @media (max-height: 720px) {
    margin-top: ${props => props.theme.spacing.m}px;
  }
`;

const StoreButton = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${props => props.theme.spacing.s}px;
  padding: ${props => props.theme.spacing.sm}px
    ${props => props.theme.spacing.l}px;
  background-color: ${props => props.theme.colors.black};
  color: ${props => props.theme.colors.white};
  border-radius: ${props => props.theme.radii.m}px;
  text-decoration: none;
  transition: all 0.2s ease-in-out;
  min-width: 220px;

  &:hover {
    transform: scale(1.05);
    background-color: #111;
  }

  & > div {
    text-align: left;
  }

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    width: 100%;
  }
`;

const Footer = styled.footer`
  text-align: center;
  padding: ${props => props.theme.spacing.m}px;
  font-size: 14px;
  color: ${props => props.theme.colors.mutedForeground};
  flex-shrink: 0;
  border-top: 1px solid ${props => props.theme.colors.border};
`;

const FooterLink = styled.a`
  font-weight: 500;
  color: ${props => props.theme.colors.primary};
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

export default function LandingPage() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const minSwipeDistance = 50;

  const resetInterval = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    intervalRef.current = setInterval(() => {
      setActiveIndex(prevIndex => (prevIndex + 1) % features.length);
    }, 5000);
  };

  useEffect(() => {
    resetInterval();

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const handleTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    setTouchStart(e.targetTouches[0].clientX);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  const handleTouchEnd = (e: TouchEvent<HTMLDivElement>) => {
    const touchEnd = e.changedTouches[0].clientX;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      setActiveIndex(prev => (prev + 1) % features.length);
    } else if (isRightSwipe) {
      setActiveIndex(prev => (prev - 1 + features.length) % features.length);
    }

    resetInterval();
  };

  const handleDotClick = (index: number) => {
    setActiveIndex(index);
    resetInterval();
  };

  return (
    <PageContainer>
      <Header as="header">
        <Nav>
          <Logo direction="row" size={40} showSlogan={false} variant="dark" />
          <a
            href="/login"
            rel="noopener noreferrer"
            style={{ textDecoration: "none" }}
          >
            <Button
              label="Acesso Administrativo"
              variant="secondary"
              size="small"
              style={{ width: "auto" }}
            />
          </a>
        </Nav>
      </Header>

      <Main as="main">
        <ContentWrapper>
          <HeroTitle as="h1" variant="header">
            Sua missão, <span>fortalecida</span> pela mentoria.
          </HeroTitle>

          <Subtitle as="p">
            O Ombro de Cristo conecta sua missão à mentoria, com ferramentas
            para uma jornada espiritual mais profunda e acompanhada.
          </Subtitle>

          <FeaturesSection>
            <FeaturesContainer>
              <CarouselTrack
                activeIndex={activeIndex}
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
              >
                {features.map((feature, index) => (
                  <FeatureItem key={index}>
                    <FeatureIcon>{feature.icon}</FeatureIcon>
                    <Text as="h3" variant="bodyMedium" color="headerForeground">
                      {feature.title}
                    </Text>
                    <Text
                      as="p"
                      variant="caption"
                      fontSize="14px"
                      lineHeight="1.5"
                    >
                      {feature.description}
                    </Text>
                  </FeatureItem>
                ))}
              </CarouselTrack>
            </FeaturesContainer>
            <CarouselDots>
              {features.map((_, index) => (
                <Dot
                  key={index}
                  isActive={index === activeIndex}
                  onClick={() => handleDotClick(index)}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </CarouselDots>
          </FeaturesSection>

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
                  style={{
                    fontSize: "18px",
                    fontWeight: 600,
                    lineHeight: 1.2,
                  }}
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
                  style={{
                    fontSize: "18px",
                    fontWeight: 600,
                    lineHeight: 1.2,
                  }}
                >
                  App Store
                </div>
              </div>
            </StoreButton>
          </StoreButtons>
        </ContentWrapper>
      </Main>

      <Footer>
        © {new Date().getFullYear()} Ombro de Cristo. Todos os direitos
        reservados.
        {" | "}
        <FooterLink
          href="/terms-and-policy"
          target="_blank"
          rel="noopener noreferrer"
        >
          Termos e Privacidade
        </FooterLink>
      </Footer>
    </PageContainer>
  );
}
