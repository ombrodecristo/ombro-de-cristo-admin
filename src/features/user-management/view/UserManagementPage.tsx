import { useState, type ChangeEvent } from "react";
import styled from "@emotion/styled";
import { useAuth } from "@/shared/hooks/useAuth";
import { useViewModel } from "@/shared/hooks/useViewModel";
import { UserManagementViewModel } from "../view-models/UserManagementViewModel";
import { Skeleton, Input, PageHeader } from "@/shared/components";
import UserTable from "./components/UserTable";
import EditUserModal from "./components/EditUserModal";
import { FiSearch } from "react-icons/fi";

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.l}px;
`;

export default function UserManagementPage() {
  const { user } = useAuth();

  const [viewModel] = useState(
    () => new UserManagementViewModel({ currentUserId: user?.id || "" })
  );

  useViewModel(viewModel);

  if (viewModel.loading && !viewModel.editingProfile) {
    return (
      <PageContainer>
        <PageHeader title="Perfis" />
        <Skeleton height="56px" width="400px" />
        <Skeleton height="400px" width="100%" />
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <PageHeader title="Perfis" />
      <Input
        placeholder="Pesquisar por nome..."
        value={viewModel.searchQuery}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          viewModel.setSearchQuery(e.target.value)
        }
        icon={<FiSearch size={20} />}
        style={{ maxWidth: "400px" }}
      />
      <UserTable
        profiles={viewModel.sortedProfiles}
        onEdit={viewModel.handleEdit}
        sortConfig={viewModel.sortConfig}
        requestSort={viewModel.requestSort}
      />
      {viewModel.editingProfile && (
        <EditUserModal
          isOpen={!!viewModel.editingProfile}
          profile={viewModel.editingProfile}
          onClose={viewModel.handleCloseModal}
          onSuccess={viewModel.handleUpdateSuccess}
        />
      )}
    </PageContainer>
  );
}
