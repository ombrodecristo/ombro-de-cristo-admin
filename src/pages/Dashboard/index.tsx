import { useAuth } from "../../contexts/AuthContext";
import UserTable from "../../components/UserTable";
import EditUserRoleModal from "../../components/EditUserRoleModal";
import { useDashboardViewModel } from "./useDashboardViewModel";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export default function Dashboard() {
  const { user } = useAuth();
  const {
    loading,
    error,
    editingProfile,
    searchQuery,
    setSearchQuery,
    sortConfig,
    sortedProfiles,
    requestSort,
    handleUpdateSuccess,
    handleEdit,
    handleCloseModal,
  } = useDashboardViewModel({ currentUserId: user?.id || "" });

  if (loading && !editingProfile) {
    return (
      <div className="space-y-4">
        <div className="space-y-2">
          <Skeleton className="h-8 w-64" />
          <Skeleton className="h-4 w-48" />
        </div>
        <Skeleton className="h-96 w-full" />
      </div>
    );
  }

  if (error) {
    return <div>Erro ao carregar usuários: {error}</div>;
  }

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Usuários</h1>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Pesquisar por nome..."
          className="max-w-sm pl-9"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <UserTable
        profiles={sortedProfiles}
        onEdit={handleEdit}
        sortConfig={sortConfig}
        requestSort={requestSort}
      />

      {editingProfile && (
        <EditUserRoleModal
          profile={editingProfile}
          onClose={handleCloseModal}
          onSuccess={handleUpdateSuccess}
        />
      )}
    </div>
  );
}
