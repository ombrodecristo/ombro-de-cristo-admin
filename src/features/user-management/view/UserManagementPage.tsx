import { useState, type ChangeEvent, useEffect } from "react";
import styled from "@emotion/styled";
import { useAuth } from "@/shared/hooks/useAuth";
import { useViewModel } from "@/shared/hooks/useViewModel";
import { UserManagementViewModel } from "../view-models/UserManagementViewModel";
import { Skeleton, Input, PageHeader } from "@/shared/components";
import UserTable from "./components/UserTable";
import EditUserModal from "./components/EditUserModal";
import { IoSearchOutline } from "react-icons/io5";
import { UserDetailsModal } from "./components/UserDetailsModal";
import type { ProfileWithRelations } from "@/data/repositories/profileRepository";
import { useTranslation } from "react-i18next";

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.l}px;
`;

export default function UserManagementPage() {
  const { t } = useTranslation();
  const { user } = useAuth();

  const [viewModel] = useState(
    () => new UserManagementViewModel({ currentUserId: user?.id || "" })
  );

  useViewModel(viewModel);

  useEffect(() => {
    viewModel.init();
  }, [viewModel]);

  if (viewModel.loading && !viewModel.editingProfile) {
    return (
      <PageContainer>
        <PageHeader title={t("users_page_title")} />
        <Skeleton height="56px" width="100%" />
        <Skeleton height="400px" width="100%" />
      </PageContainer>
    );
  }

  const handleEditFromDetails = (profile: ProfileWithRelations) => {
    viewModel.handleCloseDetailsModal();
    viewModel.handleEdit(profile);
  };

  const canEditUsers =
    user?.app_metadata.permissions?.can_manage_users || false;

  return (
    <PageContainer>
      <PageHeader title={t("users_page_title")} />
      <Input
        placeholder={t("users_search_placeholder")}
        value={viewModel.searchQuery}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          viewModel.setSearchQuery(e.target.value)
        }
        icon={<IoSearchOutline size={20} />}
      />
      <UserTable
        profiles={viewModel.sortedProfiles}
        onEdit={viewModel.handleEdit}
        onDetails={viewModel.handleOpenDetailsModal}
        sortConfig={viewModel.sortConfig}
        requestSort={viewModel.requestSort}
        canEditUsers={canEditUsers}
      />
      {viewModel.editingProfile && (
        <EditUserModal
          isOpen={!!viewModel.editingProfile}
          profile={viewModel.editingProfile}
          onClose={viewModel.handleCloseModal}
          onSuccess={viewModel.handleUpdateSuccess}
        />
      )}
      {viewModel.viewingProfile && (
        <UserDetailsModal
          isOpen={!!viewModel.viewingProfile}
          profile={viewModel.viewingProfile}
          onClose={viewModel.handleCloseDetailsModal}
          onEdit={handleEditFromDetails}
        />
      )}
    </PageContainer>
  );
}
