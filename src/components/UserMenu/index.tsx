import { useState, useEffect } from "react";
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
import {
  User,
  LogOut,
  Loader2,
  Trash2,
  AlertCircle,
  Edit,
  Save,
  KeyRound,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { authService } from "@/services/authService";
import { logService } from "@/services/logService";
import { toast } from "sonner";
import { type Profile } from "@/types/database";
import { profileService } from "@/services/profileService";
import { Input } from "../ui/input";
import ChangePasswordModal from "../ChangePasswordModal";
import { Label } from "../ui/label";

export default function UserMenu() {
  const { user, signOut } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isEditingName, setIsEditingName] = useState(false);
  const [fullName, setFullName] = useState("");
  const [isSavingName, setIsSavingName] = useState(false);
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);

  useEffect(() => {
    async function loadProfile() {
      if (user && isOpen) {
        const { data, error } = await profileService.getProfileById(user.id);
        if (error) {
          toast.error("Erro ao buscar dados da conta.");
          logService.logError(error, { component: "UserMenu.loadProfile" });
        } else {
          setProfile(data);
          setFullName(data.full_name);
        }
      }
    }
    loadProfile();
  }, [user, isOpen]);

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

  const handleSaveName = async () => {
    if (!user || !profile || fullName.trim().length < 3) {
      toast.error("O nome completo deve ter pelo menos 3 caracteres.");
      return;
    }
    setIsSavingName(true);
    const { data, error } = await profileService.updateProfile(user.id, {
      full_name: fullName.trim(),
    });
    setIsSavingName(false);
    if (error) {
      toast.error("Erro ao atualizar o nome.");
      logService.logError(error, { component: "UserMenu.handleSaveName" });
    } else {
      setProfile(data);
      setFullName(data.full_name);
      setIsEditingName(false);
      toast.success("Nome atualizado com sucesso!");
    }
  };

  const handleCloseModals = () => {
    setIsChangePasswordOpen(false);
    setIsOpen(false);
  };

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (!open) {
      setIsEditingName(false);
      if (profile) {
        setFullName(profile.full_name);
      }
    }
  };

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
          onClick={() => setIsOpen(true)}
          aria-label="Menu do usuário"
        >
          <User className="h-6 w-6" />
        </Button>

        <DialogContent className="max-w-xs">
          <DialogHeader>
            <DialogTitle className="text-center">Minha Conta</DialogTitle>
          </DialogHeader>

          {isEditingName ? (
            <div className="space-y-2 pt-2">
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
                  type="button"
                  size="icon"
                  variant="ghost"
                  className="absolute right-1 top-1/2 h-9 w-9 -translate-y-1/2 transform text-muted-foreground hover:bg-transparent hover:text-foreground"
                  onClick={handleSaveName}
                  disabled={isSavingName}
                >
                  {isSavingName ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Save className="h-4 w-4" />
                  )}
                </Button>
              </div>

              <Button
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
            </div>
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

      <ChangePasswordModal
        open={isChangePasswordOpen}
        onOpenChange={setIsChangePasswordOpen}
        onClose={handleCloseModals}
      />
    </>
  );
}
