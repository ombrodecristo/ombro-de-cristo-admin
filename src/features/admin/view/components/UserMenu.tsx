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
} from "@/shared/components";
import ChangePasswordModal from "./ChangePasswordModal";
import {
  IoPersonOutline,
  IoLogOutOutline,
  IoPencil,
  IoSaveOutline,
  IoKeyOutline,
} from "react-icons/io5";
import { toast } from "sonner";

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
  width: 320px;
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

export default function UserMenu() {
  const { user, signOut, refreshUserContext } = useAuth();

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
      toast.error(error);
    } else {
      toast.success("Seu nome foi atualizado!");
    }
  };

  const onSignOut = async () => {
    await signOut();
    toast.success("Sessão encerrada com sucesso.");
  };

  const onDelete = async () => {
    const { error } = await viewModel.handleDeleteAccount();
    if (error) {
      toast.error(error);
    } else {
      toast.success("Sua conta foi excluída com sucesso.");
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
                    Editar Nome
                  </Label>
                  <Input
                    id="fullNameEdit"
                    value={viewModel.fullName}
                    onChange={e => viewModel.setFullName(e.target.value)}
                    disabled={viewModel.isSavingName}
                    autoFocus
                    error={viewModel.nameError}
                    placeholder="Seu nome completo"
                  />
                </div>
                <Button
                  type="submit"
                  label=""
                  loading={viewModel.isSavingName}
                  disabled={viewModel.isSavingName}
                  style={{ width: "56px", height: "56px", flexShrink: 0 }}
                  icon={<IoSaveOutline size={20} />}
                />
              </NameForm>
            ) : (
              <NameWrapper>
                <Name>{viewModel.profile?.full_name ?? "..."}</Name>
                <EditButton
                  onClick={() => viewModel.setIsEditingName(true)}
                  title="Editar nome"
                >
                  <IoPencil size={16} />
                </EditButton>
              </NameWrapper>
            )}
            <Email>{user.email}</Email>
          </ProfileSection>

          <ActionList>
            <Button
              onClick={() => viewModel.setIsChangePasswordOpen(true)}
              label="Alterar Senha"
              variant="secondary"
              icon={<IoKeyOutline size={16} />}
            />
            <Button
              onClick={onSignOut}
              label="Encerrar sessão"
              variant="secondary"
              icon={<IoLogOutOutline size={16} />}
            />
          </ActionList>

          <DeleteLink onClick={() => viewModel.setDeleteConfirmOpen(true)}>
            Excluir minha conta
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
        title="Excluir sua conta?"
        message="Esta ação é permanente e não pode ser desfeita. Todos os seus dados, incluindo as anotações do diário, serão excluídos para sempre. Tem certeza?"
        confirmText="Sim, excluir"
        variant="destructive"
        loading={viewModel.isDeleting}
      />
    </>
  );
}
