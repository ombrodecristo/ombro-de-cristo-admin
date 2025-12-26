import { useEffect, useState, type FormEvent } from "react";
import styled from "@emotion/styled";
import { ChangePasswordViewModel } from "../../view-models/ChangePasswordViewModel";
import { useViewModel } from "@/shared/hooks/useViewModel";
import { Modal, Button, Input, Label } from "@/shared/components";
import { IoLockClosedOutline, IoSaveOutline } from "react-icons/io5";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";

const Content = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.m}px;
  width: 100%;
`;

const Title = styled.h2`
  font-size: 22px;
  font-weight: 700;
  text-align: center;
  color: ${props => props.theme.colors.mainForeground};
`;

const Actions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 8px;
`;

interface ChangePasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ChangePasswordModal({
  isOpen,
  onClose,
}: ChangePasswordModalProps) {
  const { t } = useTranslation();
  const [viewModel] = useState(() => new ChangePasswordViewModel({ onClose }));
  useViewModel(viewModel);

  useEffect(() => {
    if (viewModel.success) {
      toast.success(t("auth_toast_password_changed"));
    }
  }, [viewModel.success, t]);

  const onFormSubmit = (e: FormEvent) => {
    viewModel.handleSubmit(e);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWidth="400px">
      <Content onSubmit={onFormSubmit}>
        <Title>{t("change_password_modal_title")}</Title>

        <div>
          <Label htmlFor="new-password">
            {t("change_password_new_password")}
          </Label>
          <Input
            id="new-password"
            placeholder="••••••••"
            value={viewModel.password}
            onChange={e => viewModel.setPassword(e.target.value)}
            required
            disabled={viewModel.loading}
            icon={<IoLockClosedOutline size={20} />}
            isPassword
            error={viewModel.passwordError || ""}
          />
        </div>

        <div>
          <Label htmlFor="confirm-password">
            {t("change_password_confirm_password")}
          </Label>
          <Input
            id="confirm-password"
            placeholder="••••••••"
            value={viewModel.confirmPassword}
            onChange={e => viewModel.setConfirmPassword(e.target.value)}
            required
            disabled={viewModel.loading}
            icon={<IoLockClosedOutline size={20} />}
            isPassword
            error={viewModel.confirmPasswordError || ""}
          />
        </div>

        <Actions>
          <Button
            type="submit"
            label={t("password_recovery_change_button")}
            loading={viewModel.loading}
            disabled={viewModel.loading}
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
