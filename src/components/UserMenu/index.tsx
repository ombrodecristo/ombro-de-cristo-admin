import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
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
import { User, LogOut, Loader2, Trash2, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { authService } from "@/services/authService";
import { logService } from "@/services/logService";
import { toast } from "sonner";

export default function UserMenu() {
  const { user, signOut } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  if (!user) {
    return null;
  }

  const handleDeleteAccount = async () => {
    setIsDeleting(true);
    const { error } = await authService.deleteOwnUser();

    if (error) {
      toast.error("Erro ao excluir sua conta. Tente novamente.");
      await logService.logError(error, {
        component: "UserMenu.handleDeleteAccount",
      });

      setIsDeleting(false);
    } else {
      toast.success("Conta excluída com sucesso.");
      signOut();
      setIsOpen(false);
    }
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <Button
          className={cn(
            "h-8 w-8 rounded-full p-0",
            "bg-black/10 text-primary-foreground",
            "hover:bg-black/20"
          )}
          onClick={() => setIsOpen(true)}
          aria-label="Menu do usuário"
        >
          <User className="h-6 w-6" />
        </Button>

        <DialogContent className="max-w-xs">
          <DialogHeader>
            <DialogTitle className="text-center">Minha Conta</DialogTitle>
          </DialogHeader>

          <DialogDescription asChild>
            <div className="text-center">
              <p className="text-sm text-muted-foreground break-words">
                {user.email}
              </p>
            </div>
          </DialogDescription>

          <div className="mt-4 space-y-4">
            <Button
              onClick={() => {
                signOut();
                setIsOpen(false);
              }}
              className="w-full"
            >
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
                    <AlertDialogCancel disabled={isDeleting}>
                      Cancelar
                    </AlertDialogCancel>

                    <AlertDialogAction
                      onClick={handleDeleteAccount}
                      disabled={isDeleting}
                      className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                    >
                      {isDeleting ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
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
    </>
  );
}
