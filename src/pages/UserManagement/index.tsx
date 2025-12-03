import { useAuth } from "@/hooks/useAuth";
import { useUserManagementViewModel } from "./useUserManagementViewModel";
import { Skeleton, Input, PageHeader } from "@/shared/components";
import UserTable from "@/components/UserTable";
import EditUserModal from "@/components/EditUserModal";
import { FiSearch } from "react-icons/fi";
import styled from "@emotion/styled";
import { type ChangeEvent } from "react";

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.l}px;
`;

export default function UserManagementPage() {
  const { user } = useAuth();

  const {
    loading,
    searchQuery,
    setSearchQuery,
    sortConfig,
    sortedProfiles,
    requestSort,
    editingProfile,
    handleEdit,
    handleCloseModal,
    handleUpdateSuccess,
  } = useUserManagementViewModel({ currentUserId: user?.id || "" });

  if (loading && !editingProfile) {
    return (
      <PageContainer>
        <PageHeader title="Perfis" />
        <Skeleton height="48px" width="320px" />
        <Skeleton height="400px" width="100%" />
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <PageHeader title="Perfis" />
      <Input
        placeholder="Pesquisar por nome..."
        value={searchQuery}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setSearchQuery(e.target.value)
        }
        icon={<FiSearch size={20} />}
        style={{ maxWidth: "400px" }}
      />
      <UserTable
        profiles={sortedProfiles}
        onEdit={handleEdit}
        sortConfig={sortConfig}
        requestSort={requestSort}
      />
      {editingProfile && (
        <EditUserModal
          isOpen={!!editingProfile}
          profile={editingProfile}
          onClose={handleCloseModal}
          onSuccess={handleUpdateSuccess}
        />
      )}
    </PageContainer>
  );
}
