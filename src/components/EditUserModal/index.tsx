import styled from "@emotion/styled";
import { type FormEvent } from "react";
import {
  type Profile,
  type UserRole,
  type UserGender,
} from "../../types/database";
import { type ProfileWithRelations } from "../../services/profileService";
import {
  useEditUserModalViewModel,
  allRoles,
  allGenders,
} from "./useEditUserModalViewModel";
import { formatGender, formatRole } from "@/lib/formatters";
import { Modal, Button, Input, Label, Select } from "@/shared/components";
import { FiInfo } from "react-icons/fi";

const Content = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.m}px;
  width: 400px;
`;

const Title = styled.h2`
  font-size: 22px;
  font-weight: 700;
  text-align: center;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Actions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 8px;
`;

const Alert = styled.div`
  background-color: ${props => props.theme.colors.mutedBackground};
  border-radius: ${props => props.theme.borderRadii.s}px;
  padding: ${props => props.theme.spacing.sm}px;
  display: flex;
  gap: ${props => props.theme.spacing.s}px;
  align-items: flex-start;
  color: ${props => props.theme.colors.mutedForeground};
  font-size: 13px;
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
  const {
    newRole,
    setNewRole,
    newGender,
    setNewGender,
    newChurchId,
    setNewChurchId,
    churches,
    loadingChurches,
    loading,
    handleSubmit,
  } = useEditUserModalViewModel({ profile, onClose, onSuccess });

  const churchOptions = [
    { value: "none", label: "Nenhuma" },
    ...churches.map(c => ({ value: c.id, label: c.name })),
  ];

  const onFormSubmit = (e: FormEvent) => {
    handleSubmit(e);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Content onSubmit={onFormSubmit}>
        <Title>Editar Perfil</Title>
        <FormGroup>
          <Label htmlFor="user-name">Nome Completo</Label>
          <Input id="user-name" value={profile.full_name} disabled />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="mentor-name">Mentoria</Label>
          <Input
            id="mentor-name"
            value={profile.mentor?.full_name ?? "Nenhuma"}
            disabled
          />
        </FormGroup>
        <FormGroup>
          <Label>Permissão</Label>
          <Select
            value={newRole}
            onChange={(value: string) => setNewRole(value as UserRole)}
            disabled={loading}
            options={allRoles.map(role => ({
              value: role,
              label: formatRole(role, newGender || profile.gender),
            }))}
          />
        </FormGroup>
        <FormGroup>
          <Label>Gênero</Label>
          <Select
            value={newGender}
            onChange={(value: string) => setNewGender(value as UserGender)}
            disabled={loading}
            options={allGenders.map(gender => ({
              value: gender,
              label: formatGender(gender),
            }))}
          />
        </FormGroup>
        <FormGroup>
          <Label>Igreja</Label>
          <Select
            value={newChurchId || "none"}
            onChange={(value: string) =>
              setNewChurchId(value === "none" ? null : value)
            }
            disabled={loading || loadingChurches}
            options={churchOptions}
            placeholder={
              loadingChurches ? "Carregando..." : "Selecione uma igreja"
            }
          />
        </FormGroup>

        <Alert>
          <FiInfo size={24} style={{ flexShrink: 0, marginTop: "2px" }} />
          <div>
            <p>
              As alterações de permissão e gênero serão aplicadas no próximo
              login do perfil no aplicativo.
            </p>
            <p style={{ marginTop: "4px" }}>
              O nome e a mentoria são gerenciados pelo próprio perfil no
              aplicativo.
            </p>
          </div>
        </Alert>

        <Actions>
          <Button type="submit" label="Salvar" loading={loading} />
          <Button
            type="button"
            label="Cancelar"
            variant="secondary"
            onClick={onClose}
            disabled={loading}
          />
        </Actions>
      </Content>
    </Modal>
  );
}
