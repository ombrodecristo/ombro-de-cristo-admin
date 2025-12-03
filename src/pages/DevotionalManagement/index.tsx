import { useAuth } from "@/contexts/AuthContext";
import { useDevotionalManagementViewModel } from "./useDevotionalManagementViewModel";
import { Skeleton } from "@/components/ui/Skeleton";
import { Input } from "@/components/ui/Input";
import { PageHeader } from "@/components/ui/PageHeader";
import { Button } from "@/components/ui/Button";
import { ConfirmationModal } from "@/components/ui/ConfirmationModal";
import DevotionalTable from "@/components/DevotionalTable";
import DevotionalFormModal from "@/components/DevotionalFormModal";
import { FiPlus, FiSearch } from "react-icons/fi";
import styled from "@emotion/styled";

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.l}px;
`;

export default function DevotionalManagementPage() {
  const { user } = useAuth();
  const {
    loading,
    searchQuery,
    setSearchQuery,
    sortConfig,
    sortedDevotionals,
    requestSort,
    isFormOpen,
    isDeleteAlertOpen,
    isDeleting,
    selectedDevotional,
    handleOpenCreate,
    handleOpenEdit,
    handleOpenDelete,
    handleCloseModals,
    handleFormSuccess,
    handleDeleteConfirm,
  } = useDevotionalManagementViewModel();

  if (loading && !isFormOpen && !isDeleteAlertOpen) {
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
          onClick={handleOpenCreate}
          icon={<FiPlus />}
        />
      </PageHeader>
      <Input
        placeholder="Pesquisar por título..."
        value={searchQuery}
        onChange={e => setSearchQuery(e.target.value)}
        icon={<FiSearch size={20} />}
        style={{ maxWidth: "400px" }}
      />
      <DevotionalTable
        devotionals={sortedDevotionals}
        onEdit={handleOpenEdit}
        onDelete={handleOpenDelete}
        sortConfig={sortConfig}
        requestSort={requestSort}
      />

      <DevotionalFormModal
        isOpen={isFormOpen}
        devotionalToEdit={selectedDevotional}
        authorId={user!.id}
        onClose={handleCloseModals}
        onSuccess={handleFormSuccess}
      />

      <ConfirmationModal
        isOpen={isDeleteAlertOpen}
        onClose={handleCloseModals}
        onConfirm={handleDeleteConfirm}
        title="Excluir Devocional?"
        message="Este devocional será excluído permanentemente. Esta ação não pode ser desfeita."
        confirmText="Sim, excluir"
        variant="destructive"
        loading={isDeleting}
      />
    </PageContainer>
  );
}
