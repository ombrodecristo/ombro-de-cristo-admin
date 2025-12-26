import { useState, type FormEvent, useEffect } from "react";
import styled from "@emotion/styled";
import { useAuth } from "@/shared/hooks/useAuth";
import { UserMenuViewModel } from "../../view-models/UserMenuViewModel";
import { useViewModel } from "@/shared/hooks/useViewModel";
import {
  Modal,
  Button,
  Input,
  ConfirmationModal,
  Label,
  LanguageSwitcher,
} from "@/shared/components";
import ChangePasswordModal from "./ChangePasswordModal";
import {
  IoPersonOutline,
  IoLogOutOutline,
  IoPencil,
  IoSaveOutline,
  IoKeyOutline,
  IoLanguageOutline,
} from "react-icons/io5";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";

const MenuTrigger = styled.button`
  height: 40px;
  width: 40px;
  border-radius: 50%;
  padding: 0;
  background-color: ${props => props.theme.colors.mutedBackground};
  color: ${props => props.theme.colors.mutedForeground};
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${props => props.theme.colors.border};
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.l}px;
  width: 100%;
`;

const ProfileSection = styled.div`
  text-align: center;
`;

const NameWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${props => props.theme.spacing.s}px;
`;

const Name = styled.p(props => ({
  ...props.theme.textVariants.bodyMedium,
  fontSize: "18px",
  color: props.theme.colors.mainForeground,
}));

const EditButton = styled.button`
  background: ${props => props.theme.colors.primary};
  border: none;
  cursor: pointer;
  border-radius: 50%;
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.theme.colors.primaryForeground};
  transition: opacity 0.2s ease-in-out;

  &:hover {
    opacity: 0.9;
  }
`;

const Email = styled.p(props => ({
  ...props.theme.textVariants.caption,
  fontSize: "14px",
  marginTop: "4px",
}));

const ActionList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.s}px;
`;

const LanguageSelectorContainer = styled.div`
  border-top: 1px solid ${props => props.theme.colors.border};
  padding-top: ${props => props.theme.spacing.m}px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const DeleteLink = styled.button(props => ({
  ...props.theme.textVariants.defaults,
  fontSize: "14px",
  background: "none",
  border: "none",
  cursor: "pointer",
  color: props.theme.colors.destructiveBackground,
  textAlign: "center",
  marginTop: props.theme.spacing.m,
  padding: props.theme.spacing.xs,

  "&:hover": {
    textDecoration: "underline",
  },
}));

const NameForm = styled.form`
  display: flex;
  gap: 8px;
  align-items: flex-end;
`;

const SaveButton = styled.button`
  width: 56px;
  height: 56px;
  flex-shrink: 0;
  border-radius: ${props => props.theme.radii.xl}px;
  background-color: ${props => props.theme.colors.buttonPrimaryBackground};
  color: ${props => props.theme.colors.buttonPrimaryForeground};
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: opacity 0.2s ease-in-out;
  &:hover {
    opacity: 0.9;
  }
  &:disabled {
    background-color: ${props => props.theme.colors.buttonDisabledBackground};
    color: ${props => props.theme.colors.buttonDisabledForeground};
    cursor: not-allowed;
    opacity: 1;
  }
`;

const Spinner = styled.div`
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  border: 3px solid #fff3;
  border-top-color: currentColor;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  animation: spin 1s linear infinite;
`;

export default function UserMenu() {
  const { user, signOut, refreshUserContext } = useAuth();
  const { t } = useTranslation();

  const [viewModel] = useState(
    () => new UserMenuViewModel({ user, signOut, refreshUserContext })
  );

  useViewModel(viewModel);

  useEffect(() => {
    if (viewModel.isOpen) {
      viewModel.loadProfile();
    }
  }, [viewModel.isOpen, viewModel]);

  if (!user) return null;

  const onFormSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const { error } = await viewModel.handleSaveName();
    if (error) {
      toast.error(t("auth_error_update_name"));
    } else {
      toast.success(t("auth_toast_name_updated"));
    }
  };

  const onSignOut = async () => {
    await signOut();
    toast.success(t("auth_toast_logout_success"));
  };

  const onDelete = async () => {
    const { error } = await viewModel.handleDeleteAccount();
    if (error) {
      toast.error(t("auth_error_delete_account"));
    } else {
      toast.success(t("auth_toast_account_deleted"));
    }
  };

  return (
    <>
      <MenuTrigger onClick={() => viewModel.setIsOpen(true)}>
        <IoPersonOutline size={20} />
      </MenuTrigger>

      <Modal
        isOpen={viewModel.isOpen}
        onClose={() => viewModel.setIsOpen(false)}
        maxWidth="400px"
      >
        <Content>
          <ProfileSection>
            {viewModel.isEditingName ? (
              <NameForm onSubmit={onFormSubmit}>
                <div style={{ flex: 1 }}>
                  <Label
                    htmlFor="fullNameEdit"
                    style={{ textAlign: "left", marginBottom: "4px" }}
                  >
                    {t("user_menu_edit_name")}
                  </Label>
                  <Input
                    id="fullNameEdit"
                    value={viewModel.fullName}
                    onChange={e => viewModel.setFullName(e.target.value)}
                    disabled={viewModel.isSavingName}
                    autoFocus
                    error={viewModel.nameError}
                    placeholder={t("user_menu_edit_name_placeholder")}
                  />
                </div>
                <SaveButton type="submit" disabled={viewModel.isSavingName}>
                  {viewModel.isSavingName ? (
                    <Spinner />
                  ) : (
                    <IoSaveOutline size={26} />
                  )}
                </SaveButton>
              </NameForm>
            ) : (
              <NameWrapper>
                <Name>{viewModel.profile?.full_name ?? "..."}</Name>
                <EditButton
                  onClick={() => viewModel.setIsEditingName(true)}
                  title={t("user_menu_edit_name")}
                >
                  <IoPencil size={16} />
                </EditButton>
              </NameWrapper>
            )}
            <Email>{user.email}</Email>
          </ProfileSection>

          <LanguageSelectorContainer>
            <Label
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                marginBottom: 0,
              }}
            >
              <IoLanguageOutline /> {t("profile_language")}
            </Label>
            <LanguageSwitcher />
          </LanguageSelectorContainer>

          <ActionList>
            <Button
              onClick={() => viewModel.setIsChangePasswordOpen(true)}
              label={t("user_menu_change_password")}
              variant="secondary"
              icon={<IoKeyOutline size={16} />}
            />
            <Button
              onClick={onSignOut}
              label={t("user_menu_logout")}
              variant="secondary"
              icon={<IoLogOutOutline size={16} />}
            />
          </ActionList>

          <DeleteLink onClick={() => viewModel.setDeleteConfirmOpen(true)}>
            {t("user_menu_delete_account")}
          </DeleteLink>
        </Content>
      </Modal>

      <ChangePasswordModal
        isOpen={viewModel.isChangePasswordOpen}
        onClose={() => viewModel.setIsChangePasswordOpen(false)}
      />

      <ConfirmationModal
        isOpen={viewModel.isDeleteConfirmOpen}
        onClose={() => viewModel.setDeleteConfirmOpen(false)}
        onConfirm={onDelete}
        title={t("user_menu_delete_confirm_title")}
        message={t("user_menu_delete_confirm_message")}
        confirmText={t("user_menu_delete_confirm_button")}
        variant="destructive"
        loading={viewModel.isDeleting}
      />
    </>
  );
}
