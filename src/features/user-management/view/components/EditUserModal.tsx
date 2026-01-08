import { useState, type FormEvent, type ChangeEvent } from "react";
import styled from "@emotion/styled";
import type {
  Profile,
  UserRole,
  UserGender,
  Permissions,
} from "@/core/types/database";
import type { ProfileWithRelations } from "@/data/repositories/profileRepository";
import {
  EditUserViewModel,
  allRoles,
  allGenders,
} from "../../view-models/EditUserViewModel";
import { useViewModel } from "@/shared/hooks/useViewModel";
import { formatGender, formatRole } from "@/core/lib/formatters";
import { Modal, Button, Input, Label, Select } from "@/shared/components";
import { IoInformationCircleOutline, IoSaveOutline } from "react-icons/io5";
import { useTranslation } from "react-i18next";
import { useAuth } from "@/shared/hooks/useAuth";

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

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Actions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding-top: ${props => props.theme.spacing.m}px;
  flex-shrink: 0;
`;

const Alert = styled.div`
  background-color: ${props => props.theme.colors.mutedBackground};
  border-radius: ${props => props.theme.radii.s}px;
  padding: ${props => props.theme.spacing.sm}px;
  display: flex;
  gap: ${props => props.theme.spacing.s}px;
  align-items: center;
  color: ${props => props.theme.colors.mutedForeground};
  font-size: 13px;
`;

const CheckboxContainer = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  user-select: none;
`;

interface EditUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: ProfileWithRelations;
  onSuccess: (updatedProfile: Profile) => void;
}

export default function EditUserModal({
  isOpen,
  onClose,
  profile,
  onSuccess,
}: EditUserModalProps) {
  const { t } = useTranslation();
  const { user } = useAuth();
  const currentUserPermissions = user?.app_metadata.permissions || {};

  const [viewModel] = useState(
    () =>
      new EditUserViewModel({
        profile,
        onClose,
        onSuccess,
        currentUserPermissions,
      })
  );

  useViewModel(viewModel);

  const churchOptions = [
    { value: "none", label: t("users_edit_no_church") },
    ...viewModel.churches.map(c => ({ value: c.id, label: c.name })),
  ];

  const onFormSubmit = (e: FormEvent) => {
    viewModel.handleSubmit(e);
  };

  const permissionItems: { key: keyof Permissions; label: string }[] = [
    { key: "can_manage_users", label: "Gerenciar Perfis" },
    { key: "can_manage_churches", label: "Gerenciar Igrejas" },
    { key: "can_manage_devotionals", label: "Gerenciar Devocionais" },
    { key: "can_manage_library", label: "Gerenciar Biblioteca" },
  ];

  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWidth="512px">
      <FormContainer onSubmit={onFormSubmit}>
        <Title>{t("users_edit_title")}</Title>
        <ScrollableContent>
          <FormGroup>
            <Label htmlFor="user-name">{t("users_edit_name_label")}</Label>
            <Input id="user-name" value={profile.full_name} disabled />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="mentor-name">{t("users_edit_mentor_label")}</Label>
            <Input
              id="mentor-name"
              value={profile.mentor?.full_name ?? t("users_edit_no_church")}
              disabled
            />
          </FormGroup>
          <FormGroup>
            <Label>{t("users_edit_role_label")}</Label>
            <Select
              value={viewModel.newRole}
              onChange={value => viewModel.setNewRole(value as UserRole)}
              disabled={viewModel.loading || !viewModel.canEditPermissions}
              options={allRoles.map(role => ({
                value: role,
                label: formatRole(role),
              }))}
            />
          </FormGroup>
          <FormGroup>
            <Label>{t("users_edit_gender_label")}</Label>
            <Select
              value={viewModel.newGender}
              onChange={value => viewModel.setNewGender(value as UserGender)}
              disabled={viewModel.loading}
              options={allGenders.map(gender => ({
                value: gender,
                label: formatGender(gender),
              }))}
            />
          </FormGroup>
          <FormGroup>
            <Label>{t("users_edit_church_label")}</Label>
            <Select
              value={viewModel.newChurchId || "none"}
              onChange={value =>
                viewModel.setNewChurchId(value === "none" ? null : value)
              }
              disabled={viewModel.loading || viewModel.loadingChurches}
              options={churchOptions}
              placeholder={
                viewModel.loadingChurches
                  ? t("users_edit_loading_churches")
                  : t("users_edit_select_church")
              }
            />
          </FormGroup>

          {viewModel.canEditPermissions && viewModel.newRole === "ADMIN" && (
            <FormGroup>
              <Label>Permissões de Administrador</Label>
              {permissionItems.map(item => (
                <CheckboxContainer key={item.key}>
                  <input
                    type="checkbox"
                    checked={viewModel.permissions[item.key] || false}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      viewModel.setPermission(item.key, e.target.checked)
                    }
                    disabled={viewModel.loading}
                  />
                  {item.label}
                </CheckboxContainer>
              ))}
            </FormGroup>
          )}

          <Alert>
            <IoInformationCircleOutline size={28} style={{ flexShrink: 0 }} />
            <div>
              <p>{t("users_edit_alert")}</p>
            </div>
          </Alert>
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
