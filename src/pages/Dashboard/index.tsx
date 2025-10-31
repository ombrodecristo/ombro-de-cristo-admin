import { useAuth } from "../../contexts/AuthContext";
import UserTable from "../../components/UserTable";
import EditUserRoleModal from "../../components/EditUserRoleModal";
import { useDashboardViewModel } from "./useDashboardViewModel";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { Search, X } from "lucide-react";
import { useEffect } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

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

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

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

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Usuários</h1>
      <div className="relative w-full max-w-sm">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Pesquisar por nome..."
          className="pl-9 pr-10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        {searchQuery && (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="absolute right-1 top-1/2 h-9 w-9 -translate-y-1/2 transform text-muted-foreground hover:bg-transparent hover:text-foreground"
            onClick={() => setSearchQuery("")}
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Limpar busca</span>
          </Button>
        )}
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
