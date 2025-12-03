import { useState, type FormEvent } from "react";
import styled from "@emotion/styled";
import type { Profile, UserRole, UserGender } from "@/core/types/database";
import type { ProfileWithRelations } from "@/data/repositories/profileRepository";
import {
  EditUserViewModel,
  allRoles,
  allGenders,
} from "../../view-models/EditUserViewModel";
import { useViewModel } from "@/shared/hooks/useViewModel";
import { formatGender, formatRole } from "@/core/lib/formatters";
import { Modal, Button, Input, Label, Select } from "@/shared/components";
import { IoInformationCircleOutline } from "react-icons/io5";

const Content = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.m}px;
  width: 400px;
`;

const Title = styled.h2(props => ({
  ...props.theme.textVariants.subHeader,
  fontSize: "22px",
  color: props.theme.colors.mainForeground,
  textAlign: "center",
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
  const [viewModel] = useState(
    () => new EditUserViewModel({ profile, onClose, onSuccess })
  );

  useViewModel(viewModel);

  const churchOptions = [
    { value: "none", label: "Nenhuma" },
    ...viewModel.churches.map(c => ({ value: c.id, label: c.name })),
  ];

  const onFormSubmit = (e: FormEvent) => {
    viewModel.handleSubmit(e);
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
            value={viewModel.newRole}
            onChange={value => viewModel.setNewRole(value as UserRole)}
            disabled={viewModel.loading}
            options={allRoles.map(role => ({
              value: role,
              label: formatRole(role, viewModel.newGender || profile.gender),
            }))}
          />
        </FormGroup>
        <FormGroup>
          <Label>Gênero</Label>
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
          <Label>Igreja</Label>
          <Select
            value={viewModel.newChurchId || "none"}
            onChange={value =>
              viewModel.setNewChurchId(value === "none" ? null : value)
            }
            disabled={viewModel.loading || viewModel.loadingChurches}
            options={churchOptions}
            placeholder={
              viewModel.loadingChurches
                ? "Carregando..."
                : "Selecione uma igreja"
            }
          />
        </FormGroup>
        <Alert>
          <IoInformationCircleOutline
            size={24}
            style={{ flexShrink: 0, marginTop: "2px" }}
          />
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
          <Button type="submit" label="Salvar" loading={viewModel.loading} />
          <Button
            type="button"
            label="Cancelar"
            variant="secondary"
            onClick={onClose}
            disabled={viewModel.loading}
          />
        </Actions>
      </Content>
    </Modal>
  );
}
