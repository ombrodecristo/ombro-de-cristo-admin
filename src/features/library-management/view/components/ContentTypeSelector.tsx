import styled from "@emotion/styled";
import { useTranslation } from "react-i18next";
import {
  IoLogoYoutube,
  IoCloudUploadOutline,
  IoDocumentTextOutline,
} from "react-icons/io5";

const SelectorContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: ${props => props.theme.spacing.s}px;
  width: 100%;
`;

const TypeButton = styled.button<{ isActive: boolean; disabled: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  gap: ${props => props.theme.spacing.s}px;
  padding: ${props => props.theme.spacing.m}px;
  border: 1.5px solid
    ${props =>
      props.isActive ? props.theme.colors.primary : props.theme.colors.border};
  background-color: ${props =>
    props.isActive
      ? `${props.theme.colors.primary}1A`
      : props.theme.colors.cardBackground};
  color: ${props =>
    props.isActive
      ? props.theme.colors.primary
      : props.theme.colors.mutedForeground};
  border-radius: ${props => props.theme.radii.m}px;
  cursor: ${props => (props.disabled ? "not-allowed" : "pointer")};
  font-size: 14px;
  font-weight: 600;
  transition: all 0.2s ease-in-out;
  opacity: ${props => (props.disabled && !props.isActive ? 0.6 : 1)};
  min-height: 100px;
  line-height: 1.4;

  &:hover {
    ${props =>
      !props.disabled &&
      `
      border-color: ${props.theme.colors.primary};
      color: ${props.theme.colors.primary};
    `}
  }

  svg {
    font-size: 24px;
    margin-bottom: 4px;
  }
`;

type ContentType = "YOUTUBE" | "DIRECT_UPLOAD" | "PDF";

interface ContentTypeSelectorProps {
  value: ContentType;
  onChange: (value: ContentType) => void;
  disabled: boolean;
}

export default function ContentTypeSelector({
  value,
  onChange,
  disabled,
}: ContentTypeSelectorProps) {
  const { t } = useTranslation();

  const types = [
    {
      id: "YOUTUBE" as ContentType,
      label: t("library_form_type_youtube"),
      icon: <IoLogoYoutube />,
    },
    {
      id: "DIRECT_UPLOAD" as ContentType,
      label: t("library_form_type_direct_upload"),
      icon: <IoCloudUploadOutline />,
    },
    {
      id: "PDF" as ContentType,
      label: t("library_form_type_pdf"),
      icon: <IoDocumentTextOutline />,
    },
  ];

  return (
    <SelectorContainer>
      {types.map(type => (
        <TypeButton
          key={type.id}
          type="button"
          isActive={value === type.id}
          onClick={() => onChange(type.id)}
          disabled={disabled}
        >
          {type.icon}
          <span>{type.label}</span>
        </TypeButton>
      ))}
    </SelectorContainer>
  );
}
