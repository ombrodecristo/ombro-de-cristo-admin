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
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  useEditUserModalViewModel,
  allRoles,
  allGenders,
} from "./useEditUserModalViewModel";
import { useEffect } from "react";
import { toast } from "sonner";
import { Spinner } from "../ui/spinner";
import { formatGender, formatRole } from "@/lib/formatters";
import { Info } from "lucide-react";

type EditUserModalProps = {
  profile: ProfileWithRelations;
  onClose: () => void;
  onSuccess: (updatedProfile: Profile) => void;
};

export default function EditUserModal({
  profile,
  onClose,
  onSuccess,
}: EditUserModalProps) {
  const {
    newRole,
    setNewRole,
    newGender,
    setNewGender,
    newChurchId,
    setNewChurchId,
    churches,
    loadingChurches,
    loading,
    error,
    success,
    handleSubmit,
  } = useEditUserModalViewModel({
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
      toast.success("Perfil atualizado com sucesso!");
    }
  }, [success]);

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Editar Perfil</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="user-name">Nome Completo</Label>
              <Input
                id="user-name"
                value={profile.full_name}
                disabled
                className="opacity-100 bg-muted text-muted-foreground"
              />
            </div>
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="mentor-name">Mentoria</Label>
              <Input
                id="mentor-name"
                value={profile.mentor?.full_name ?? "Nenhuma"}
                disabled
                className="opacity-100 bg-muted text-muted-foreground"
              />
            </div>
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="role-select">Permissão</Label>
              <Select
                value={newRole}
                onValueChange={value => setNewRole(value as UserRole)}
                disabled={loading}
              >
                <SelectTrigger id="role-select">
                  <SelectValue placeholder="Selecione uma permissão" />
                </SelectTrigger>
                <SelectContent>
                  {allRoles.map(role => (
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
                onValueChange={value => setNewGender(value as UserGender)}
                disabled={loading}
              >
                <SelectTrigger id="gender-select">
                  <SelectValue placeholder="Selecione um gênero" />
                </SelectTrigger>
                <SelectContent>
                  {allGenders.map(gender => (
                    <SelectItem key={gender} value={gender}>
                      {formatGender(gender)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="church-select">Igreja</Label>
              <Select
                value={newChurchId || "none"}
                onValueChange={value =>
                  setNewChurchId(value === "none" ? null : value)
                }
                disabled={loading || loadingChurches}
              >
                <SelectTrigger id="church-select">
                  <SelectValue
                    placeholder={
                      loadingChurches
                        ? "Carregando igrejas..."
                        : "Selecione uma igreja"
                    }
                  />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">Nenhuma</SelectItem>
                  {churches.map(church => (
                    <SelectItem key={church.id} value={church.id}>
                      {church.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Alert
              variant="default"
              className="mt-2 flex items-start justify-start gap-2 [&>svg]:static [&>svg~*]:pl-0"
            >
              <Info className="h-5 w-5 mt-0.5" />
              <div className="flex flex-col">
                <AlertDescription className="text-xs">
                  As alterações de permissão e gênero serão aplicadas no próximo
                  login do perfil no aplicativo.
                </AlertDescription>
                <AlertDescription className="text-xs mt-1">
                  O nome e a mentoria são gerenciados pelo próprio perfil no
                  aplicativo.
                </AlertDescription>
              </div>
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
