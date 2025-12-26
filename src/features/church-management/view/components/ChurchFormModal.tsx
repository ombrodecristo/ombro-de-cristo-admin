import { useState, type FormEvent } from "react";
import styled from "@emotion/styled";
import { ChurchFormViewModel } from "../../view-models/ChurchFormViewModel";
import { useViewModel } from "@/shared/hooks/useViewModel";
import { Modal, Button, Input, Label } from "@/shared/components";
import type { Church } from "@/core/types/database";
import { IoSaveOutline } from "react-icons/io5";
import { useTranslation } from "react-i18next";

const Content = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.m}px;
  width: 100%;
`;

const Title = styled.h2(props => ({
  ...props.theme.textVariants.subHeader,
  fontSize: "22px",
  color: props.theme.colors.mainForeground,
  textAlign: "center",
}));

const Actions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 8px;
`;

interface ChurchFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  churchToEdit: Church | null;
}

export default function ChurchFormModal({
  isOpen,
  onClose,
  onSuccess,
  churchToEdit,
}: ChurchFormModalProps) {
  const { t } = useTranslation();

  const [viewModel] = useState(
    () => new ChurchFormViewModel({ churchToEdit, onClose, onSuccess })
  );

  useViewModel(viewModel);

  const onFormSubmit = (e: FormEvent) => {
    viewModel.handleSubmit(e);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWidth="400px">
      <Content onSubmit={onFormSubmit}>
        <Title>
          {viewModel.isEditing
            ? t("churches_form_edit_title")
            : t("churches_form_new_title")}
        </Title>
        <div>
          <Label htmlFor="name">{t("churches_form_name_label")}</Label>
          <Input
            id="name"
            value={viewModel.name}
            onChange={e => viewModel.setName(e.target.value)}
            disabled={viewModel.loading}
            required
            error={viewModel.error || ""}
            placeholder={t("churches_form_name_placeholder")}
          />
        </div>
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
      </Content>
    </Modal>
  );
}
