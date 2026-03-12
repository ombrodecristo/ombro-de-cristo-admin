import { useState, type FormEvent, useEffect } from "react";
import styled from "@emotion/styled";
import { DevotionalFormViewModel } from "../../view-models/DevotionalFormViewModel";
import { useViewModel } from "@/shared/hooks/useViewModel";
import {
  Modal,
  Button,
  Input,
  Textarea,
  Label,
  Select,
} from "@/shared/components";
import type { DevotionalWithTranslations } from "@/data/repositories/devotionalRepository";
import {
  IoSaveOutline,
  IoAlertCircle,
  IoCheckmarkCircle,
  IoSync,
  IoSparklesOutline,
  IoCreateOutline,
} from "react-icons/io5";
import { useTranslation } from "react-i18next";
import type { Theme } from "@/core/lib/theme";

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

const Title = styled.h2(props => ({
  ...props.theme.textVariants.subHeader,
  fontSize: "22px",
  color: props.theme.colors.mainForeground,
  textAlign: "center",
  paddingBottom: props.theme.spacing.m,
  flexShrink: 0,
}));

const ScrollableContent = styled.div(props => ({
  flex: 1,
  overflowY: "auto",
  minHeight: 0,
  display: "flex",
  flexDirection: "column",
  gap: props.theme.spacing.m,
  padding: `${props.theme.spacing.m}px 0`,
  paddingRight: props.theme.spacing.sm,

  "&::-webkit-scrollbar": {
    width: "10px",
  },
  "&::-webkit-scrollbar-track": {
    background: (props.theme as Theme).colors.mutedBackground,
    borderRadius: (props.theme as Theme).radii.round,
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: (props.theme as Theme).colors.mutedForeground,
    borderRadius: (props.theme as Theme).radii.round,
  },
  "&::-webkit-scrollbar-thumb:hover": {
    backgroundColor: (props.theme as Theme).colors.primary,
  },
}));

const FormFieldsContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.m}px;
`;

const ProcessingOverlay = styled.div`
  position: absolute;
  inset: 0;
  background-color: rgba(240, 239, 236, 0.85);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 10;
  border-radius: ${props => props.theme.radii.m}px;
  gap: ${props => props.theme.spacing.m}px;
  color: ${props => props.theme.colors.primary};
  font-weight: 500;
  text-align: center;
`;

const Actions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding-top: ${props => props.theme.spacing.m}px;
  flex-shrink: 0;
`;

const TabsContainer = styled.div`
  display: flex;
  border-bottom: 1px solid ${props => props.theme.colors.border};
`;

const TabButton = styled.button<{ isActive: boolean }>`
  padding: 10px 16px;
  cursor: pointer;
  border: none;
  background-color: transparent;
  border-bottom: 2px solid
    ${props => (props.isActive ? props.theme.colors.primary : "transparent")};
  color: ${props =>
    props.isActive
      ? props.theme.colors.primary
      : props.theme.colors.mutedForeground};
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const StatusIcon = styled.span<{
  status: "completed" | "processing" | "error" | "new";
}>`
  display: flex;
  color: ${props => {
    switch (props.status) {
      case "completed":
        return props.theme.colors.success;
      case "error":
      case "new":
        return props.theme.colors.destructiveBackground;
      default:
        return props.theme.colors.mutedForeground;
    }
  }};
`;

const EmptyStateContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: ${props => props.theme.spacing.xl}px;
  gap: ${props => props.theme.spacing.l}px;
  height: 100%;
`;

interface DevotionalFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  authorId: string;
  devotionalToEdit: DevotionalWithTranslations | null;
}

export default function DevotionalFormModal({
  isOpen,
  onClose,
  onSuccess,
  authorId,
  devotionalToEdit,
}: DevotionalFormModalProps) {
  const { t } = useTranslation();
  const [viewModel] = useState(
    () =>
      new DevotionalFormViewModel({
        devotionalToEdit,
        onClose,
        onSuccess,
        authorId,
      })
  );
  useViewModel(viewModel);

  useEffect(() => {
    viewModel.updateDevotional(devotionalToEdit);
  }, [devotionalToEdit, viewModel]);

  const { currentTranslation, isEditing, activeTab, showEmptyState } =
    viewModel;

  const onFormSubmit = (e: FormEvent) => {
    viewModel.handleSubmit(e);
  };

  const TabStatusIcon = ({
    lang,
  }: {
    lang: keyof typeof viewModel.translations;
  }) => {
    const translation = viewModel.translations[lang];
    if (viewModel.originalLanguage === lang) return <span>🌟</span>;
    if (translation.status === "new") return null;

    const statusMap = {
      completed: <IoCheckmarkCircle />,
      processing: <IoSync style={{ animation: "spin 1s linear infinite" }} />,
      error: <IoAlertCircle />,
    };

    return (
      <StatusIcon status={translation.status}>
        {statusMap[translation.status as "completed" | "processing" | "error"]}
      </StatusIcon>
    );
  };

  const languages: { key: "pt" | "en" | "es"; label: string }[] = [
    { key: "pt", label: t("profile_language_pt") },
    { key: "en", label: t("profile_language_en") },
    { key: "es", label: t("profile_language_es") },
  ];

  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWidth="800px">
      <FormContainer onSubmit={onFormSubmit}>
        <Title>
          {isEditing
            ? t("devotionals_form_edit_title")
            : t("devotionals_form_new_title")}
        </Title>

        {isEditing && (
          <TabsContainer>
            {languages.map(({ key, label }) => (
              <TabButton
                key={key}
                type="button"
                isActive={activeTab === key}
                onClick={() => viewModel.setActiveTab(key)}
              >
                <TabStatusIcon lang={key} />
                {label.split(" ")[0]}
                {viewModel.originalLanguage === key &&
                  ` ${t("devotionals_form_original_language_tag")}`}
              </TabButton>
            ))}
          </TabsContainer>
        )}

        <ScrollableContent>
          {showEmptyState ? (
            <EmptyStateContainer>
              <p>{t("devotionals_form_empty_state_message")}</p>
              <div style={{ display: "flex", gap: "16px" }}>
                <Button
                  type="button"
                  label={t("devotionals_form_generate_ai")}
                  onClick={viewModel.handleGenerateWithAI}
                  loading={viewModel.loading}
                  variant="secondary"
                  icon={<IoSparklesOutline size={18} />}
                />
                <Button
                  type="button"
                  label={t("devotionals_form_write_manually")}
                  onClick={viewModel.handleManualEdit}
                  variant="secondary"
                  icon={<IoCreateOutline size={18} />}
                />
              </div>
            </EmptyStateContainer>
          ) : (
            <FormFieldsContainer>
              {viewModel.isCurrentTranslationProcessing && (
                <ProcessingOverlay>
                  <IoSync
                    size={32}
                    style={{ animation: "spin 1.5s linear infinite" }}
                  />
                  <span>{t("devotionals_form_generating_ai")}</span>
                </ProcessingOverlay>
              )}

              {!isEditing && (
                <Label>
                  {t("devotionals_form_original_language_label")}
                  <Select
                    value={viewModel.originalLanguage}
                    onChange={val =>
                      viewModel.setOriginalLanguage(val as "pt" | "en" | "es")
                    }
                    options={languages.map(l => ({
                      value: l.key,
                      label: l.label,
                    }))}
                  />
                </Label>
              )}
              <div>
                <Label htmlFor="title">
                  {t("devotionals_form_title_label")}
                </Label>
                <Input
                  id="title"
                  value={currentTranslation.title}
                  onChange={e =>
                    viewModel.handleInputChange("title", e.target.value)
                  }
                  disabled={
                    viewModel.loading ||
                    viewModel.isCurrentTranslationProcessing
                  }
                  required
                  error={viewModel.error}
                  placeholder={t("devotionals_form_title_placeholder")}
                />
              </div>
              <div>
                <Label htmlFor="content">
                  {t("devotionals_form_content_label")}
                </Label>
                <Textarea
                  id="content"
                  value={currentTranslation.content}
                  onChange={e =>
                    viewModel.handleInputChange("content", e.target.value)
                  }
                  disabled={
                    viewModel.loading ||
                    viewModel.isCurrentTranslationProcessing
                  }
                  required
                  placeholder={t("devotionals_form_content_placeholder")}
                />
              </div>
            </FormFieldsContainer>
          )}
        </ScrollableContent>

        <Actions>
          <Button
            type="submit"
            label={
              isEditing
                ? t("devotionals_form_save_changes_button")
                : t("devotionals_form_publish_button")
            }
            loading={viewModel.loading}
            icon={<IoSaveOutline size={20} />}
            disabled={showEmptyState}
          />
          <Button
            type="button"
            label={t("common_cancel")}
            variant="secondary"
            onClick={onClose}
            disabled={viewModel.loading}
          />
        </Actions>
      </FormContainer>
    </Modal>
  );
}
