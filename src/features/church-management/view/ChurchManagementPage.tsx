import { useState, type ChangeEvent, useEffect } from "react";
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
import { ChurchDetailsModal } from "./components/ChurchDetailsModal";
import type { Church } from "@/core/types/database";
import { useTranslation } from "react-i18next";

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.l}px;
`;

export default function ChurchManagementPage() {
  const { t } = useTranslation();
  const [viewModel] = useState(() => new ChurchManagementViewModel());
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
        <PageHeader title={t("churches_page_title")}>
          <Skeleton height="40px" width="40px" />
        </PageHeader>
        <Skeleton height="56px" width="100%" />
        <Skeleton height="400px" width="100%" />
      </PageContainer>
    );
  }

  const handleEditFromDetails = (church: Church) => {
    viewModel.handleCloseDetailsModal();
    viewModel.handleOpenEdit(church);
  };

  const handleDeleteFromDetails = (church: Church) => {
    viewModel.handleCloseDetailsModal();
    viewModel.handleOpenDelete(church);
  };

  return (
    <PageContainer>
      <PageHeader title={t("churches_page_title")}>
        <Button
          label={t("churches_new_button")}
          onClick={viewModel.handleOpenCreate}
          icon={<IoAdd size={20} />}
          size="small"
          hideTextOnMobile
        />
      </PageHeader>
      <Input
        placeholder={t("churches_search_placeholder")}
        value={viewModel.searchQuery}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          viewModel.setSearchQuery(e.target.value)
        }
        icon={<IoSearchOutline size={20} />}
      />
      <ChurchTable
        churches={viewModel.sortedChurches}
        onEdit={viewModel.handleOpenEdit}
        onDelete={viewModel.handleOpenDelete}
        onDetails={viewModel.handleOpenDetailsModal}
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

      {viewModel.selectedChurchForDetails && (
        <ChurchDetailsModal
          isOpen={viewModel.isDetailsModalOpen}
          onClose={viewModel.handleCloseDetailsModal}
          church={viewModel.selectedChurchForDetails}
          onEdit={handleEditFromDetails}
          onDelete={handleDeleteFromDetails}
        />
      )}

      {viewModel.selectedChurch && viewModel.isDeleteAlertOpen && (
        <ConfirmationModal
          isOpen={viewModel.isDeleteAlertOpen}
          onClose={viewModel.handleCloseModals}
          onConfirm={viewModel.handleDeleteConfirm}
          title={t("churches_delete_title")}
          message={
            <span
              dangerouslySetInnerHTML={{
                __html: t("churches_delete_message", {
                  name: viewModel.selectedChurch.name,
                }),
              }}
            />
          }
          confirmText={t("common_yes_delete")}
          variant="destructive"
          loading={viewModel.isDeleting}
        />
      )}
    </PageContainer>
  );
}
