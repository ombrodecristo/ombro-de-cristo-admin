import { useState, type ChangeEvent, useEffect } from "react";
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
import { IoAdd, IoSearchOutline } from "react-icons/io5";
import { DevotionalDetailsModal } from "./components/DevotionalDetailsModal";
import type { DevotionalWithAuthor } from "@/data/repositories/devotionalRepository";
import { useTranslation } from "react-i18next";

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.l}px;
`;

export default function DevotionalManagementPage() {
  const { t } = useTranslation();
  const { user } = useAuth();
  const [viewModel] = useState(() => new DevotionalManagementViewModel());
  useViewModel(viewModel);

  useEffect(() => {
    viewModel.init();
  }, [viewModel]);

  if (
    viewModel.loading &&
    !viewModel.isFormOpen &&
    !viewModel.isDeleteAlertOpen
  ) {
    return (
      <PageContainer>
        <PageHeader title={t("devotionals_page_title")}>
          <Skeleton height="40px" width="40px" />
        </PageHeader>
        <Skeleton height="56px" width="100%" />
        <Skeleton height="400px" width="100%" />
      </PageContainer>
    );
  }

  const handleEditFromDetails = (devotional: DevotionalWithAuthor) => {
    viewModel.handleCloseDetailsModal();
    viewModel.handleOpenEdit(devotional);
  };

  const handleDeleteFromDetails = (devotional: DevotionalWithAuthor) => {
    viewModel.handleCloseDetailsModal();
    viewModel.handleOpenDelete(devotional);
  };

  return (
    <PageContainer>
      <PageHeader title={t("devotionals_page_title")}>
        <Button
          label={t("devotionals_new_button")}
          onClick={viewModel.handleOpenCreate}
          icon={<IoAdd size={20} />}
          size="small"
          hideTextOnMobile
        />
      </PageHeader>
      <Input
        placeholder={t("devotionals_search_placeholder")}
        value={viewModel.searchQuery}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          viewModel.setSearchQuery(e.target.value)
        }
        icon={<IoSearchOutline size={20} />}
      />
      <DevotionalTable
        devotionals={viewModel.sortedDevotionals}
        onEdit={viewModel.handleOpenEdit}
        onDelete={viewModel.handleOpenDelete}
        onDetails={viewModel.handleOpenDetailsModal}
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

      {viewModel.selectedDevotionalForDetails && (
        <DevotionalDetailsModal
          isOpen={viewModel.isDetailsModalOpen}
          onClose={viewModel.handleCloseDetailsModal}
          devotional={viewModel.selectedDevotionalForDetails}
          onEdit={handleEditFromDetails}
          onDelete={handleDeleteFromDetails}
        />
      )}

      {viewModel.selectedDevotional && viewModel.isDeleteAlertOpen && (
        <ConfirmationModal
          isOpen={viewModel.isDeleteAlertOpen}
          onClose={viewModel.handleCloseModals}
          onConfirm={viewModel.handleDeleteConfirm}
          title={t("devotionals_delete_title")}
          message={t("devotionals_delete_message")}
          confirmText={t("common_yes_delete")}
          variant="destructive"
          loading={viewModel.isDeleting}
        />
      )}
    </PageContainer>
  );
}
