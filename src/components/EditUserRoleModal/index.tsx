import { type Profile, type UserRole } from "../../types/database";
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
import { Loader2 } from "lucide-react";
import { useEditUserRoleViewModel, allRoles } from "./useEditUserRoleViewModel";

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
  const { newRole, setNewRole, loading, handleSubmit } =
    useEditUserRoleViewModel({
      profile,
      onClose,
      onSuccess,
    });

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Alterar Permissão</DialogTitle>
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
                      {role}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Alert variant="default" className="mt-2">
              <AlertDescription className="text-xs">
                Nota: O usuário precisará fazer logout e login novamente no app
                para que suas permissões sejam atualizadas.
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
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Salvar
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
