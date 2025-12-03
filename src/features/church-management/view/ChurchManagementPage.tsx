import { useState, type ChangeEvent } from "react";
import styled from "@emotion/styled";
import { useViewModel } from "@/shared/hooks/useViewModel";
import { ChurchManagementViewModel } from "../view-models/ChurchManagementViewModel";
import {
  Skeleton,
  Input,
  PageHeader,
  Button,
  ConfirmationModal,
} from "@/shared/components";
import ChurchTable from "./components/ChurchTable";
import ChurchFormModal from "./components/ChurchFormModal";
import { IoAdd, IoSearchOutline } from "react-icons/io5";

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.l}px;
`;

export default function ChurchManagementPage() {
  const [viewModel] = useState(() => new ChurchManagementViewModel());
  useViewModel(viewModel);

  if (
    viewModel.loading &&
    !viewModel.isFormOpen &&
    !viewModel.isDeleteAlertOpen
  ) {
    return (
      <PageContainer>
        <PageHeader title="Igrejas">
          <Skeleton height="56px" width="160px" />
        </PageHeader>
        <Skeleton height="56px" width="400px" />
        <Skeleton height="400px" width="100%" />
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <PageHeader title="Igrejas">
        <Button
          label="Nova Igreja"
          onClick={viewModel.handleOpenCreate}
          icon={<IoAdd size={20} />}
        />
      </PageHeader>
      <Input
        placeholder="Pesquisar por nome..."
        value={viewModel.searchQuery}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          viewModel.setSearchQuery(e.target.value)
        }
        icon={<IoSearchOutline size={20} />}
        style={{ maxWidth: "400px" }}
      />
      <ChurchTable
        churches={viewModel.sortedChurches}
        onEdit={viewModel.handleOpenEdit}
        onDelete={viewModel.handleOpenDelete}
        sortConfig={viewModel.sortConfig}
        requestSort={viewModel.requestSort}
      />

      {viewModel.isFormOpen && (
        <ChurchFormModal
          isOpen={viewModel.isFormOpen}
          churchToEdit={viewModel.selectedChurch}
          onClose={viewModel.handleCloseModals}
          onSuccess={viewModel.handleFormSuccess}
        />
      )}

      {viewModel.selectedChurch && viewModel.isDeleteAlertOpen && (
        <ConfirmationModal
          isOpen={viewModel.isDeleteAlertOpen}
          onClose={viewModel.handleCloseModals}
          onConfirm={viewModel.handleDeleteConfirm}
          title="Excluir Igreja?"
          message={
            <>
              A igreja{" "}
              <strong style={{ fontWeight: "bold" }}>
                {viewModel.selectedChurch.name}
              </strong>{" "}
              será excluída permanentemente. Perfis associados perderão o
              vínculo. Esta ação não pode ser desfeita.
            </>
          }
          confirmText="Sim, excluir"
          variant="destructive"
          loading={viewModel.isDeleting}
        />
      )}
    </PageContainer>
  );
}
