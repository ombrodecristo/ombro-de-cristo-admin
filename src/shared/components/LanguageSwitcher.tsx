import styled from "@emotion/styled";
import { useTranslation } from "react-i18next";
import { useAuth } from "../hooks/useAuth";

const SwitcherContainer = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.s}px;
  background-color: ${props => props.theme.colors.mutedBackground};
  padding: ${props => props.theme.spacing.xs}px;
  border-radius: ${props => props.theme.radii.m}px;
`;

const LanguageButton = styled.button<{ isActive: boolean }>`
  border: none;
  background-color: ${props =>
    props.isActive ? props.theme.colors.cardBackground : "transparent"};
  color: ${props =>
    props.isActive
      ? props.theme.colors.primary
      : props.theme.colors.mutedForeground};
  font-weight: ${props => (props.isActive ? "700" : "500")};
  padding: ${props => props.theme.spacing.s}px
    ${props => props.theme.spacing.sm}px;
  border-radius: ${props => props.theme.radii.s}px;
  cursor: pointer;
  font-size: 13px;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: ${props => !props.isActive && props.theme.colors.border};
  }
`;

const languages = [
  { code: "pt", label: "PT" },
  { code: "en", label: "EN" },
  { code: "es", label: "ES" },
];

export function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const { changeLanguage } = useAuth();
  const currentLang = i18n.language.split("-")[0];

  return (
    <SwitcherContainer>
      {languages.map(lang => (
        <LanguageButton
          key={lang.code}
          isActive={currentLang === lang.code}
          onClick={() => changeLanguage(lang.code)}
        >
          {lang.label}
        </LanguageButton>
      ))}
    </SwitcherContainer>
  );
}
