import { useState, type ChangeEvent, useEffect } from "react";
import styled from "@emotion/styled";
import { useViewModel } from "@/shared/hooks/useViewModel";
import { LibraryManagementViewModel } from "../view-models/LibraryManagementViewModel";
import {
  Skeleton,
  Input,
  PageHeader,
  Button,
  ConfirmationModal,
} from "@/shared/components";
import LibraryTable from "./components/LibraryTable";
import LibraryFormModal from "./components/LibraryFormModal";
import { IoAdd, IoSearchOutline } from "react-icons/io5";
import { useTranslation } from "react-i18next";

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.l}px;
`;

export default function LibraryManagementPage() {
  const { t } = useTranslation();
  const [viewModel] = useState(() => new LibraryManagementViewModel());
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
        <PageHeader title={t("library_page_title")}>
          <Skeleton height="40px" width="40px" />
        </PageHeader>
        <Skeleton height="56px" width="100%" />
        <Skeleton height="400px" width="100%" />
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <PageHeader title={t("library_page_title")}>
        <Button
          label={t("library_new_button")}
          onClick={viewModel.handleOpenCreate}
          icon={<IoAdd size={20} />}
          size="small"
          hideTextOnMobile
        />
      </PageHeader>
      <Input
        placeholder={t("library_search_placeholder")}
        value={viewModel.searchQuery}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          viewModel.setSearchQuery(e.target.value)
        }
        icon={<IoSearchOutline size={20} />}
      />
      <LibraryTable
        items={viewModel.sortedItems}
        onEdit={viewModel.handleOpenEdit}
        onDelete={viewModel.handleOpenDelete}
        sortConfig={viewModel.sortConfig}
        requestSort={viewModel.requestSort}
      />

      {viewModel.isFormOpen && (
        <LibraryFormModal
          isOpen={viewModel.isFormOpen}
          itemToEdit={viewModel.selectedItem}
          onClose={viewModel.handleCloseModals}
          onSuccess={viewModel.handleFormSuccess}
        />
      )}

      {viewModel.selectedItem && viewModel.isDeleteAlertOpen && (
        <ConfirmationModal
          isOpen={viewModel.isDeleteAlertOpen}
          onClose={viewModel.handleCloseModals}
          onConfirm={viewModel.handleDeleteConfirm}
          title={t("library_delete_title")}
          message={
            <span
              dangerouslySetInnerHTML={{
                __html: t("library_delete_message", {
                  title: viewModel.selectedItem.title,
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
