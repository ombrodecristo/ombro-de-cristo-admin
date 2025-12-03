import { useEffect, useState } from "react";
import styled from "@emotion/styled";
import {
  FiMail,
  FiLock,
  FiUser,
  FiUsers,
  FiArrowRight,
  FiEye,
  FiEyeOff,
} from "react-icons/fi";
import { FaApple } from "react-icons/fa";
import { IoLogoGooglePlaystore } from "react-icons/io5";

import { useSignUpViewModel } from "./useSignUpViewModel";
import { type UserGender } from "@/types/database";

import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { PasswordInput } from "@/components/ui/PasswordInput";
import { Select, type SelectOption } from "@/components/ui/Select";
import { LegalAgreement } from "./LegalAgreement";

const PageContainer = styled.div`
  display: flex;
  width: 100%;
  min-height: 100vh;
  flex-direction: column;
  @media (min-width: ${props => props.theme.breakpoints.tablet}) {
    flex-direction: row;
    height: 100vh;
    overflow: hidden;
  }
`;

const IntroPanel = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${props => props.theme.spacing.s}px;
  background-color: ${props => props.theme.colors.primary};
  padding: ${props => props.theme.spacing.l}px;
  text-align: center;
  color: ${props => props.theme.colors.primaryForeground};

  @media (min-width: ${props => props.theme.breakpoints.tablet}) {
    width: 33.333%;
    height: 100%;
    gap: ${props => props.theme.spacing.m}px;
    padding: ${props => props.theme.spacing.xl}px;
  }
`;

const IntroHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: ${props => props.theme.spacing.m}px;

  @media (min-width: ${props => props.theme.breakpoints.tablet}) {
    flex-direction: column;
    gap: ${props => props.theme.spacing.l}px;
  }
`;

const LogoImage = styled.img`
  height: 48px;
  width: 48px;
  object-fit: contain;

  @media (min-width: ${props => props.theme.breakpoints.tablet}) {
    height: 128px;
    width: 128px;
  }
`;

const AppTitle = styled.h1`
  font-size: 24px;
  font-weight: bold;

  @media (min-width: ${props => props.theme.breakpoints.tablet}) {
    font-size: 36px;
  }
`;

const Slogan = styled.p`
  font-size: 14px;
  color: rgba(255, 255, 255, 0.8);

  @media (min-width: ${props => props.theme.breakpoints.tablet}) {
    font-size: 18px;
  }
`;

const FormPanel = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.theme.colors.mainBackground};
  padding: ${props => props.theme.spacing.m}px;

  @media (min-width: ${props => props.theme.breakpoints.tablet}) {
    width: 66.666%;
    overflow-y: auto;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const ErrorMessage = styled.p`
  font-family: ${props => props.theme.textVariants.error.fontFamily};
  font-size: ${props => props.theme.textVariants.error.fontSize}px;
  font-weight: ${props => props.theme.textVariants.error.fontWeight};
  color: ${props => props.theme.colors.destructiveBackground};
`;

const Separator = styled.div`
  border-top: 1px solid ${props => props.theme.colors.border};
  margin: ${props => props.theme.spacing.m}px 0;
`;

const FooterText = styled.p`
  text-align: center;
  font-size: ${props => props.theme.textVariants.caption.fontSize}px;
  font-weight: ${props => props.theme.textVariants.caption.fontWeight};
  color: ${props => props.theme.colors.mutedForeground};
`;

const StoreButtonsContainer = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.m}px;
`;

const SuccessMessage = styled.p`
  text-align: center;
  color: ${props => props.theme.colors.success};
  padding: ${props => props.theme.spacing.l}px 0;
`;

export default function SignUpPage() {
  const {
    fullName,
    setFullName,
    gender,
    setGender,
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    acceptedTerms,
    setAcceptedTerms,
    loading,
    error,
    successMessage,
    handleSubmit,
  } = useSignUpViewModel();

  const [localError, setLocalError] = useState<string | null>(null);

  useEffect(() => {
    setLocalError(error);
  }, [error]);

  useEffect(() => {
    if (fullName || gender || email || password || confirmPassword) {
      setLocalError(null);
    }
  }, [fullName, gender, email, password, confirmPassword]);

  const genderOptions: SelectOption[] = [
    { value: "MALE", label: "Masculino" },
    { value: "FEMALE", label: "Feminino" },
  ];

  return (
    <PageContainer>
      <IntroPanel>
        <IntroHeader>
          <LogoImage src="/logo.png" alt="Logo Ombro de Cristo" />
          <AppTitle>Ombro de Cristo</AppTitle>
        </IntroHeader>
        <Slogan>Sua missão, fortalecida pela mentoria.</Slogan>
      </IntroPanel>
      <FormPanel>
        <Card style={{ width: "100%", maxWidth: "448px" }}>
          <CardHeader>
            <CardTitle style={{ fontSize: "24px", paddingTop: "8px" }}>
              Junte-se à nossa comunidade
            </CardTitle>
          </CardHeader>
          <CardContent>
            {successMessage ? (
              <SuccessMessage>{successMessage}</SuccessMessage>
            ) : (
              <Form onSubmit={handleSubmit}>
                <FormGroup>
                  <Label htmlFor="fullName">Nome Completo</Label>
                  <Input
                    id="fullName"
                    type="text"
                    placeholder="Seu nome"
                    value={fullName}
                    onChange={e => setFullName(e.target.value)}
                    required
                    disabled={loading}
                    icon={<FiUser size={20} />}
                  />
                </FormGroup>

                <FormGroup>
                  <Label htmlFor="gender">Gênero</Label>
                  <Select
                    options={genderOptions}
                    value={gender}
                    onChange={(value: string) => setGender(value as UserGender)}
                    disabled={loading}
                    placeholder="Seu gênero"
                    icon={<FiUsers size={20} />}
                  />
                </FormGroup>

                <FormGroup>
                  <Label htmlFor="email">E-mail</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="email@exemplo.com"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                    autoComplete="email"
                    disabled={loading}
                    icon={<FiMail size={20} />}
                  />
                </FormGroup>

                <FormGroup>
                  <Label htmlFor="password">Senha</Label>
                  <PasswordInput
                    id="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                    autoComplete="new-password"
                    disabled={loading}
                    icon={<FiLock size={20} />}
                    toggleIconShow={<FiEye size={20} />}
                    toggleIconHide={<FiEyeOff size={20} />}
                  />
                </FormGroup>

                <FormGroup>
                  <Label htmlFor="confirmPassword">Confirmar Senha</Label>
                  <PasswordInput
                    id="confirmPassword"
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                    required
                    autoComplete="new-password"
                    disabled={loading}
                    icon={<FiLock size={20} />}
                    toggleIconShow={<FiEye size={20} />}
                    toggleIconHide={<FiEyeOff size={20} />}
                  />
                </FormGroup>

                <LegalAgreement
                  accepted={acceptedTerms}
                  onToggle={setAcceptedTerms}
                  isDisabled={loading}
                />

                {localError && <ErrorMessage>{localError}</ErrorMessage>}

                <Button
                  type="submit"
                  disabled={loading}
                  loading={loading}
                  label="Criar conta"
                  icon={<FiArrowRight />}
                />
              </Form>
            )}

            <Separator />

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "16px",
                textAlign: "center",
              }}
            >
              <FooterText>
                Em breve nas principais lojas de aplicativos!
              </FooterText>
              <StoreButtonsContainer>
                <Button
                  variant="secondary"
                  disabled
                  label="Google Play"
                  icon={<IoLogoGooglePlaystore size={16} />}
                />
                <Button
                  variant="secondary"
                  disabled
                  label="App Store"
                  icon={<FaApple size={16} />}
                />
              </StoreButtonsContainer>
            </div>
          </CardContent>
        </Card>
      </FormPanel>
    </PageContainer>
  );
}
