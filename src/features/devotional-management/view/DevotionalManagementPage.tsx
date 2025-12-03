import { useState, type ChangeEvent } from "react";
import styled from "@emotion/styled";
import { useAuth } from "@/shared/hooks/useAuth";
import { useViewModel } from "@/shared/hooks/useViewModel";
import { DevotionalManagementViewModel } from "../view-models/DevotionalManagementViewModel";
import {
  Skeleton,
  Input,
  PageHeader,
  Button,
  ConfirmationModal,
} from "@/shared/components";
import DevotionalTable from "./components/DevotionalTable";
import DevotionalFormModal from "./components/DevotionalFormModal";
import { FiPlus, FiSearch } from "react-icons/fi";

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.l}px;
`;

export default function DevotionalManagementPage() {
  const { user } = useAuth();
  const [viewModel] = useState(() => new DevotionalManagementViewModel());
  useViewModel(viewModel);

  if (
    viewModel.loading &&
    !viewModel.isFormOpen &&
    !viewModel.isDeleteAlertOpen
  ) {
    return (
      <PageContainer>
        <PageHeader title="Devocionais">
          <Skeleton height="48px" width="200px" />
        </PageHeader>
        <Skeleton height="48px" width="320px" />
        <Skeleton height="400px" width="100%" />
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <PageHeader title="Devocionais">
        <Button
          label="Novo Devocional"
          onClick={viewModel.handleOpenCreate}
          icon={<FiPlus />}
        />
      </PageHeader>
      <Input
        placeholder="Pesquisar por título..."
        value={viewModel.searchQuery}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          viewModel.setSearchQuery(e.target.value)
        }
        icon={<FiSearch size={20} />}
        style={{ maxWidth: "400px" }}
      />
      <DevotionalTable
        devotionals={viewModel.sortedDevotionals}
        onEdit={viewModel.handleOpenEdit}
        onDelete={viewModel.handleOpenDelete}
        sortConfig={viewModel.sortConfig}
        requestSort={viewModel.requestSort}
      />

      {viewModel.isFormOpen && (
        <DevotionalFormModal
          isOpen={viewModel.isFormOpen}
          devotionalToEdit={viewModel.selectedDevotional}
          authorId={user!.id}
          onClose={viewModel.handleCloseModals}
          onSuccess={viewModel.handleFormSuccess}
        />
      )}

      {viewModel.selectedDevotional && viewModel.isDeleteAlertOpen && (
        <ConfirmationModal
          isOpen={viewModel.isDeleteAlertOpen}
          onClose={viewModel.handleCloseModals}
          onConfirm={viewModel.handleDeleteConfirm}
          title="Excluir Devocional?"
          message="Este devocional será excluído permanentemente. Esta ação não pode ser desfeita."
          confirmText="Sim, excluir"
          variant="destructive"
          loading={viewModel.isDeleting}
        />
      )}
    </PageContainer>
  );
}
