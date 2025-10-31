import {
  type Profile,
  type UserRole,
  type UserGender,
} from "../../types/database";
import { type ProfileWithRelations } from "../../services/profileService";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  useEditUserRoleViewModel,
  allRoles,
  allGenders,
} from "./useEditUserRoleViewModel";
import { useEffect } from "react";
import { toast } from "sonner";
import { Spinner } from "../ui/spinner";
import { formatGender, formatRole } from "@/lib/formatters";
import { Info } from "lucide-react";

type EditUserRoleModalProps = {
  profile: ProfileWithRelations;
  onClose: () => void;
  onSuccess: (updatedProfile: Profile) => void;
};

export default function EditUserRoleModal({
  profile,
  onClose,
  onSuccess,
}: EditUserRoleModalProps) {
  const {
    newRole,
    setNewRole,
    newGender,
    setNewGender,
    loading,
    error,
    success,
    handleSubmit,
  } = useEditUserRoleViewModel({
    profile,
    onClose,
    onSuccess,
  });

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  useEffect(() => {
    if (success) {
      toast.success("Usuário atualizado com sucesso!");
    }
  }, [success]);

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Editar Usuário</DialogTitle>
            <p className="pt-1 text-sm text-muted-foreground">
              Usuário: <strong>{profile.full_name}</strong>
            </p>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="role-select">Permissão</Label>
              <Select
                value={newRole}
                onValueChange={(value) => setNewRole(value as UserRole)}
                disabled={loading}
              >
                <SelectTrigger id="role-select">
                  <SelectValue placeholder="Selecione uma permissão" />
                </SelectTrigger>
                <SelectContent>
                  {allRoles.map((role) => (
                    <SelectItem key={role} value={role}>
                      {formatRole(role, newGender || profile.gender)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="gender-select">Gênero</Label>
              <Select
                value={newGender}
                onValueChange={(value) => setNewGender(value as UserGender)}
                disabled={loading}
              >
                <SelectTrigger id="gender-select">
                  <SelectValue placeholder="Selecione um gênero" />
                </SelectTrigger>
                <SelectContent>
                  {allGenders.map((gender) => (
                    <SelectItem key={gender} value={gender}>
                      {formatGender(gender)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Alert
              variant="default"
              className="mt-2 flex items-center justify-center gap-2 [&>svg]:static [&>svg~*]:pl-0"
            >
              <Info className="h-12 w-12 ml-2" />
              <AlertDescription className="text-xs ml-2 mt-2">
                O usuário precisará sair da conta e fazer login novamente nas
                plataformas para que as suas permissões sejam atualizadas.
              </AlertDescription>
            </Alert>
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="ghost" disabled={loading}>
                Cancelar
              </Button>
            </DialogClose>

            <Button type="submit" variant="default" disabled={loading}>
              {loading && <Spinner className="mr-2 h-4 w-4" />}
              Salvar
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
