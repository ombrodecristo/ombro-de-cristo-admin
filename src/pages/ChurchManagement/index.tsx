import { useEffect } from "react";
import { toast } from "sonner";
import { Search, X, PlusCircle, AlertCircle, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Spinner } from "@/components/ui/spinner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useChurchManagementViewModel } from "./useChurchManagementViewModel";
import ChurchTable from "@/components/ChurchTable";
import ChurchFormModal from "@/components/ChurchFormModal";

export default function ChurchManagementPage() {
  const {
    loading,
    error,
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

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  if (loading && !isFormOpen && !isDeleteAlertOpen) {
    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-10 w-36" />
        </div>
        <Skeleton className="h-12 w-80" />
        <Skeleton className="h-96 w-full" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Igrejas</h1>
        <Button onClick={handleOpenCreate}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Nova Igreja
        </Button>
      </div>

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

      <ChurchTable
        churches={sortedChurches}
        onEdit={handleOpenEdit}
        onDelete={handleOpenDelete}
        sortConfig={sortConfig}
        requestSort={requestSort}
      />

      {isFormOpen && (
        <ChurchFormModal
          open={isFormOpen}
          churchToEdit={selectedChurch}
          onClose={handleCloseModals}
          onSuccess={() => {
            toast.success(
              selectedChurch
                ? "Igreja atualizada com sucesso!"
                : "Igreja criada com sucesso!"
            );
            handleFormSuccess();
          }}
        />
      )}

      {isDeleteAlertOpen && selectedChurch && (
        <AlertDialog open={isDeleteAlertOpen} onOpenChange={handleCloseModals}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-destructive" />
                Excluir Igreja?
              </AlertDialogTitle>

              <AlertDialogDescription>
                A igreja{" "}
                <span className="font-semibold">{selectedChurch.name}</span>{" "}
                será excluída permanentemente. Perfis associados perderão o
                vínculo. Esta ação não pode ser desfeita.
              </AlertDialogDescription>
            </AlertDialogHeader>

            <AlertDialogFooter>
              <AlertDialogCancel disabled={isDeleting}>
                Cancelar
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDeleteConfirm}
                disabled={isDeleting}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              >
                {isDeleting ? (
                  <Spinner className="mr-2 h-4 w-4" />
                ) : (
                  <Trash2 className="mr-2 h-4 w-4" />
                )}
                Sim, excluir
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </div>
  );
}
