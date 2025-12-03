import styled from "@emotion/styled";
import { type FormEvent } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useUserMenuViewModel } from "./useUserMenuViewModel";
import { Modal, Button, Input, ConfirmationModal } from "@/shared/components";
import ChangePasswordModal from "../ChangePasswordModal";
import { FiUser, FiLogOut, FiEdit, FiSave, FiKey } from "react-icons/fi";
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

const Name = styled.p`
  font-size: 18px;
  font-weight: 600;
  color: ${props => props.theme.colors.mainForeground};
`;

const EditButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: ${props => props.theme.colors.mutedForeground};
  &:hover {
    color: ${props => props.theme.colors.primary};
  }
`;

const Email = styled.p`
  font-size: 14px;
  color: ${props => props.theme.colors.mutedForeground};
  margin-top: 4px;
`;

const ActionList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.s}px;
`;

const DeleteLink = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: ${props => props.theme.colors.destructiveBackground};
  text-align: center;
  font-size: 14px;
  margin-top: ${props => props.theme.spacing.m}px;

  &:hover {
    text-decoration: underline;
  }
`;

const NameForm = styled.form`
  display: flex;
  gap: 8px;
  align-items: center;
`;

export default function UserMenu() {
  const { user, signOut } = useAuth();

  const {
    isOpen,
    setIsOpen,
    isDeleting,
    isDeleteConfirmOpen,
    setDeleteConfirmOpen,
    profile,
    isEditingName,
    setIsEditingName,
    fullName,
    setFullName,
    isSavingName,
    isChangePasswordOpen,
    setIsChangePasswordOpen,
    handleDeleteAccount,
    handleSaveName,
  } = useUserMenuViewModel({ user, signOut });

  if (!user) return null;

  const onFormSubmit = async (e: FormEvent) => {
    const { error, success } = await handleSaveName(e);
    if (error) {
      toast.error(error);
    }
    if (success) {
      toast.success("Seu nome foi atualizado!");
    }
  };

  const onSignOut = async () => {
    await signOut();
    toast.success("Sessão encerrada com sucesso.");
  };

  const onDelete = async () => {
    const { error } = await handleDeleteAccount();
    if (error) {
      toast.error(error);
    } else {
      toast.success("Sua conta foi excluída com sucesso.");
    }
  };

  return (
    <>
      <MenuTrigger onClick={() => setIsOpen(true)}>
        <FiUser size={20} />
      </MenuTrigger>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <Content>
          <ProfileSection>
            {isEditingName ? (
              <NameForm onSubmit={onFormSubmit}>
                <Input
                  id="fullNameEdit"
                  value={fullName}
                  onChange={e => setFullName(e.target.value)}
                  disabled={isSavingName}
                  autoFocus
                />
                <Button
                  type="submit"
                  label=""
                  loading={isSavingName}
                  disabled={isSavingName}
                  style={{ width: "48px", height: "48px", flexShrink: 0 }}
                  icon={<FiSave size={20} />}
                />
              </NameForm>
            ) : (
              <NameWrapper>
                <Name>{profile?.full_name ?? "..."}</Name>
                <EditButton onClick={() => setIsEditingName(true)}>
                  <FiEdit size={16} />
                </EditButton>
              </NameWrapper>
            )}
            <Email>{user.email}</Email>
          </ProfileSection>

          <ActionList>
            <Button
              onClick={() => setIsChangePasswordOpen(true)}
              label="Alterar Senha"
              variant="secondary"
              icon={<FiKey size={16} />}
            />
            <Button
              onClick={onSignOut}
              label="Encerrar sessão"
              icon={<FiLogOut size={16} />}
            />
          </ActionList>

          <DeleteLink onClick={() => setDeleteConfirmOpen(true)}>
            Excluir minha conta
          </DeleteLink>
        </Content>
      </Modal>

      <ChangePasswordModal
        isOpen={isChangePasswordOpen}
        onClose={() => setIsChangePasswordOpen(false)}
      />

      <ConfirmationModal
        isOpen={isDeleteConfirmOpen}
        onClose={() => setDeleteConfirmOpen(false)}
        onConfirm={onDelete}
        title="Excluir sua conta?"
        message="Esta ação é permanente e não pode ser desfeita. Todos os seus dados, incluindo as anotações do diário, serão excluídos para sempre. Tem certeza?"
        confirmText="Sim, excluir"
        variant="destructive"
        loading={isDeleting}
      />
    </>
  );
}
