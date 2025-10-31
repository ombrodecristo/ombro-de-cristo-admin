import { useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  User,
  LogOut,
  Trash2,
  AlertCircle,
  Edit,
  Save,
  KeyRound,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { Input } from "../ui/input";
import ChangePasswordModal from "../ChangePasswordModal";
import { Label } from "../ui/label";
import { useUserMenuViewModel } from "./useUserMenuViewModel";
import { Spinner } from "../ui/spinner";

export default function UserMenu() {
  const { user, signOut } = useAuth();
  const {
    isOpen,
    isDeleting,
    profile,
    isEditingName,
    setIsEditingName,
    fullName,
    setFullName,
    isSavingName,
    isChangePasswordOpen,
    setIsChangePasswordOpen,
    error,
    successMessage,
    handleDeleteAccount,
    handleSaveName,
    handleCloseModals,
    handleOpenChange,
    handleSignOut,
    setError,
    setSuccessMessage,
  } = useUserMenuViewModel({ user, signOut });

  useEffect(() => {
    if (error) {
      toast.error(error);
      setError(null);
    }
  }, [error, setError]);

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      setSuccessMessage(null);
    }
  }, [successMessage, setSuccessMessage]);

  if (!user) {
    return null;
  }

  return (
    <>
      <Dialog open={isOpen} onOpenChange={handleOpenChange}>
        <Button
          className={cn(
            "h-8 w-8 rounded-full p-0",
            "bg-black/10 text-primary-foreground",
            "hover:bg-black/20"
          )}
          onClick={() => handleOpenChange(true)}
          aria-label="Menu do usuário"
        >
          <User className="h-6 w-6" />
        </Button>

        <DialogContent className="max-w-xs">
          <DialogHeader>
            <DialogTitle className="text-center">Minha Conta</DialogTitle>
          </DialogHeader>

          {isEditingName ? (
            <form
              onSubmit={(e) => {
                handleSaveName(e);
              }}
              className="space-y-2 pt-2"
            >
              <Label htmlFor="fullNameEdit" className="sr-only">
                Nome Completo
              </Label>
              <div className="relative">
                <Input
                  id="fullNameEdit"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  disabled={isSavingName}
                  className="pr-10"
                />
                <Button
                  type="submit"
                  size="icon"
                  variant="ghost"
                  className="absolute right-1 top-1/2 h-9 w-9 -translate-y-1/2 transform text-muted-foreground hover:bg-transparent hover:text-foreground"
                  disabled={isSavingName}
                >
                  {isSavingName ? (
                    <Spinner className="h-4 w-4" />
                  ) : (
                    <Save className="h-4 w-4" />
                  )}
                </Button>
              </div>
              <Button
                type="button"
                variant="link"
                size="sm"
                className="h-auto p-0"
                onClick={() => {
                  setIsEditingName(false);
                  if (profile) {
                    setFullName(profile.full_name);
                  }
                }}
              >
                Cancelar
              </Button>
            </form>
          ) : (
            <DialogDescription asChild>
              <div className="text-center">
                <div className="group relative mx-auto inline-block">
                  <p className="text-md break-words font-medium text-foreground">
                    {profile?.full_name ?? "..."}
                  </p>

                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute -right-8 top-1/2 h-6 w-6 -translate-y-1/2 transform text-muted-foreground"
                    onClick={() => setIsEditingName(true)}
                    aria-label="Editar nome"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                </div>
                <br />
                <p className="text-sm text-muted-foreground break-words">
                  {user.email}
                </p>
              </div>
            </DialogDescription>
          )}

          <div className="mt-4 space-y-4">
            <Button
              onClick={() => setIsChangePasswordOpen(true)}
              className="w-full"
              variant="outline"
            >
              <KeyRound className="mr-2 h-4 w-4" />
              Alterar Senha
            </Button>

            <Button onClick={handleSignOut} className="w-full">
              <LogOut className="mr-2 h-4 w-4" />
              Sair
            </Button>

            <div className="border-t pt-4 text-center">
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    variant="link"
                    size="sm"
                    className="h-auto p-0 text-destructive hover:text-destructive/80"
                  >
                    Excluir minha conta
                  </Button>
                </AlertDialogTrigger>

                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle className="flex items-center gap-2">
                      <AlertCircle className="h-5 w-5 text-destructive" />
                      Você tem certeza?
                    </AlertDialogTitle>

                    <AlertDialogDescription>
                      Esta ação é{" "}
                      <span className="font-semibold">IRREVERSÍVEL</span>.
                      <br />
                      <br />
                      <span className="font-semibold">TODOS</span> os seus dados
                      serão excluídos{" "}
                      <span className="font-semibold">PERMANENTEMENTE</span>.
                    </AlertDialogDescription>
                  </AlertDialogHeader>

                  <AlertDialogFooter>
                    <AlertDialogCancel
                      disabled={isDeleting}
                      className={cn(
                        buttonVariants({ variant: "ghost" }),
                        "mt-0"
                      )}
                    >
                      Cancelar
                    </AlertDialogCancel>

                    <AlertDialogAction
                      onClick={handleDeleteAccount}
                      disabled={isDeleting}
                      className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                    >
                      {isDeleting ? (
                        <Spinner className="mr-2 h-4 w-4" />
                      ) : (
                        <Trash2 className="mr-2 h-4 w-4" />
                      )}
                      Sim, desejo excluir minha conta
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <ChangePasswordModal
        open={isChangePasswordOpen}
        onOpenChange={setIsChangePasswordOpen}
        onClose={handleCloseModals}
      />
    </>
  );
}
