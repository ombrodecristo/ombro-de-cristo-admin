import { useState, type FormEvent } from "react";
import styled from "@emotion/styled";
import { DevotionalFormViewModel } from "../../view-models/DevotionalFormViewModel";
import { useViewModel } from "@/shared/hooks/useViewModel";
import { Modal, Button, Input, Textarea, Label } from "@/shared/components";
import type { DevotionalWithAuthor } from "@/data/repositories/devotionalRepository";
import { IoSaveOutline } from "react-icons/io5";
import { useTranslation } from "react-i18next";

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
  paddingRight: props.theme.spacing.sm,

  "&::-webkit-scrollbar": {
    width: "10px",
  },
  "&::-webkit-scrollbar-track": {
    background: props.theme.colors.mutedBackground,
    borderRadius: props.theme.radii.round,
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: props.theme.colors.mutedForeground,
    borderRadius: props.theme.radii.round,
  },
  "&::-webkit-scrollbar-thumb:hover": {
    backgroundColor: props.theme.colors.primary,
  },
  scrollbarWidth: "auto",
  scrollbarColor: `${props.theme.colors.mutedForeground} ${props.theme.colors.mutedBackground}`,
}));

const Actions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding-top: ${props => props.theme.spacing.m}px;
  flex-shrink: 0;
`;

interface DevotionalFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  authorId: string;
  devotionalToEdit: DevotionalWithAuthor | null;
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

  const onFormSubmit = (e: FormEvent) => {
    viewModel.handleSubmit(e);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWidth="800px">
      <FormContainer onSubmit={onFormSubmit}>
        <Title>
          {viewModel.isEditing
            ? t("devotionals_form_edit_title")
            : t("devotionals_form_new_title")}
        </Title>
        <ScrollableContent>
          <div>
            <Label htmlFor="title">{t("devotionals_form_title_label")}</Label>
            <Input
              id="title"
              value={viewModel.title}
              onChange={e => viewModel.setTitle(e.target.value)}
              disabled={viewModel.loading}
              required
              error={viewModel.titleError || ""}
              placeholder={t("devotionals_form_title_placeholder")}
            />
          </div>
          <div>
            <Label htmlFor="content">
              {t("devotionals_form_content_label")}
            </Label>
            <Textarea
              id="content"
              value={viewModel.content}
              onChange={e => viewModel.setContent(e.target.value)}
              disabled={viewModel.loading}
              required
              error={viewModel.contentError || ""}
              placeholder={t("devotionals_form_content_placeholder")}
            />
          </div>
        </ScrollableContent>
        <Actions>
          <Button
            type="submit"
            label={t("common_save")}
            loading={viewModel.loading}
            icon={<IoSaveOutline size={20} />}
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
