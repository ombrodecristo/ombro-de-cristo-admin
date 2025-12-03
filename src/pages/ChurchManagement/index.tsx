import styled from "@emotion/styled";
import { type ChangeEvent } from "react";
import { FiPlus, FiSearch } from "react-icons/fi";
import { useChurchManagementViewModel } from "./useChurchManagementViewModel";
import {
  Skeleton,
  Input,
  PageHeader,
  Button,
  ConfirmationModal,
} from "@/shared/components";
import ChurchTable from "@/components/ChurchTable";
import ChurchFormModal from "@/components/ChurchFormModal";

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.l}px;
`;

export default function ChurchManagementPage() {
  const {
    loading,
    searchQuery,
    setSearchQuery,
    sortConfig,
    sortedChurches,
    requestSort,
    isFormOpen,
    isDeleteAlertOpen,
    isDeleting,
    selectedChurch,
    handleOpenCreate,
    handleOpenEdit,
    handleOpenDelete,
    handleCloseModals,
    handleFormSuccess,
    handleDeleteConfirm,
  } = useChurchManagementViewModel();

  if (loading && !isFormOpen && !isDeleteAlertOpen) {
    return (
      <PageContainer>
        <PageHeader title="Igrejas">
          <Skeleton height="48px" width="160px" />
        </PageHeader>
        <Skeleton height="48px" width="320px" />
        <Skeleton height="400px" width="100%" />
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <PageHeader title="Igrejas">
        <Button
          label="Nova Igreja"
          onClick={handleOpenCreate}
          icon={<FiPlus />}
        />
      </PageHeader>
      <Input
        placeholder="Pesquisar por nome..."
        value={searchQuery}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setSearchQuery(e.target.value)
        }
        icon={<FiSearch size={20} />}
        style={{ maxWidth: "400px" }}
      />
      <ChurchTable
        churches={sortedChurches}
        onEdit={handleOpenEdit}
        onDelete={handleOpenDelete}
        sortConfig={sortConfig}
        requestSort={requestSort}
      />

      <ChurchFormModal
        isOpen={isFormOpen}
        churchToEdit={selectedChurch}
        onClose={handleCloseModals}
        onSuccess={handleFormSuccess}
      />

      <ConfirmationModal
        isOpen={isDeleteAlertOpen}
        onClose={handleCloseModals}
        onConfirm={handleDeleteConfirm}
        title="Excluir Igreja?"
        message={
          <>
            A igreja{" "}
            <strong style={{ fontWeight: "bold" }}>
              {selectedChurch?.name}
            </strong>{" "}
            será excluída permanentemente. Perfis associados perderão o vínculo.
            Esta ação não pode ser desfeita.
          </>
        }
        confirmText="Sim, excluir"
        variant="destructive"
        loading={isDeleting}
      />
    </PageContainer>
  );
}
