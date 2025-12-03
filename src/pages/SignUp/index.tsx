import { useEffect, useState, type FormEvent } from "react";
import styled from "@emotion/styled";
import { FiMail, FiLock, FiUser, FiArrowRight } from "react-icons/fi";
import { useSignUpViewModel } from "./useSignUpViewModel";
import { Button, BaseCard, Input, Label, Logo } from "@/shared/components";
import { LegalAgreement } from "./LegalAgreement";
import { toast } from "sonner";

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 100vh;
  padding: ${props => props.theme.spacing.m}px;
`;

const StyledCard = styled(BaseCard)`
  width: 100%;
  max-width: 448px;
  padding: ${props => props.theme.spacing.xl}px;
`;

const Header = styled.header`
  margin-bottom: ${props => props.theme.spacing.xl}px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.l}px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.s}px;
`;

const GenderSelector = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.s}px;
`;

const GenderButton = styled.button<{ isActive: boolean }>`
  flex: 1;
  height: 56px;
  border-radius: ${props => props.theme.borderRadii.m}px;
  border: ${props =>
    props.isActive ? "0" : `1.5px solid ${props.theme.colors.inputBorder}`};
  background-color: ${props =>
    props.isActive
      ? props.theme.colors.primaryBackground
      : props.theme.colors.inputBackground};
  color: ${props =>
    props.isActive
      ? props.theme.colors.primaryForeground
      : props.theme.colors.mainForeground};
  font-family: ${props => props.theme.textVariants.bodyMedium.fontFamily};
  font-weight: ${props => (props.isActive ? "700" : "500")};
  font-size: 16px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
`;

const ErrorMessage = styled.p`
  font-family: ${props => props.theme.textVariants.error.fontFamily};
  font-size: ${props => props.theme.textVariants.error.fontSize}px;
  font-weight: ${props => props.theme.textVariants.error.fontWeight};
  color: ${props => props.theme.colors.destructiveBackground};
  text-align: center;
  margin-top: ${props => props.theme.spacing.s}px;
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
    if (successMessage) {
      toast.success(successMessage, {
        description: "Verifique sua caixa de entrada e a pasta de spam.",
      });
    }
  }, [successMessage]);

  useEffect(() => {
    if (
      fullName ||
      gender ||
      email ||
      password ||
      confirmPassword ||
      acceptedTerms
    ) {
      setLocalError(null);
    }
  }, [fullName, gender, email, password, confirmPassword, acceptedTerms]);

  const onFormSubmit = (e: FormEvent) => {
    handleSubmit(e);
  };

  if (successMessage) {
    return (
      <PageContainer>
        <StyledCard>
          <Header>
            <Logo />
          </Header>
        </StyledCard>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <StyledCard>
        <Header>
          <Logo />
        </Header>
        <Form onSubmit={onFormSubmit}>
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
              icon={<FiUser size={22} />}
            />
          </FormGroup>

          <FormGroup>
            <Label>Gênero</Label>
            <GenderSelector>
              <GenderButton
                type="button"
                isActive={gender === "MALE"}
                onClick={() => setGender("MALE")}
                disabled={loading}
              >
                Masculino
              </GenderButton>
              <GenderButton
                type="button"
                isActive={gender === "FEMALE"}
                onClick={() => setGender("FEMALE")}
                disabled={loading}
              >
                Feminino
              </GenderButton>
            </GenderSelector>
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
              icon={<FiMail size={22} />}
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="password">Senha</Label>
            <Input
              id="password"
              placeholder="••••••••"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              autoComplete="new-password"
              disabled={loading}
              icon={<FiLock size={22} />}
              isPassword
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="confirmPassword">Confirmar Senha</Label>
            <Input
              id="confirmPassword"
              placeholder="••••••••"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              required
              autoComplete="new-password"
              disabled={loading}
              icon={<FiLock size={22} />}
              isPassword
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
            style={{ marginTop: "8px" }}
          />
        </Form>
      </StyledCard>
    </PageContainer>
  );
}
