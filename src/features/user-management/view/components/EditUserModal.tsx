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
import { IoInformationCircleOutline, IoSaveOutline } from "react-icons/io5";

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
    <Modal isOpen={isOpen} onClose={onClose} maxWidth="512px">
      <FormContainer onSubmit={onFormSubmit}>
        <Title>Editar Perfil</Title>
        <ScrollableContent>
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
            <IoInformationCircleOutline size={28} style={{ flexShrink: 0 }} />
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
        </ScrollableContent>
        <Actions>
          <Button
            type="submit"
            label="Salvar"
            loading={viewModel.loading}
            icon={<IoSaveOutline size={20} />}
          />
          <Button
            type="button"
            label="Cancelar"
            variant="secondary"
            onClick={onClose}
            disabled={viewModel.loading}
          />
        </Actions>
      </FormContainer>
    </Modal>
  );
}
