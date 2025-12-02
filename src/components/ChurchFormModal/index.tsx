import { useEffect } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { type Church } from "@/types/database";
import { useChurchFormViewModel } from "./useChurchFormViewModel";

type ChurchFormModalProps = {
  open: boolean;
  churchToEdit: Church | null;
  onClose: () => void;
  onSuccess: () => void;
};

export default function ChurchFormModal({
  open,
  churchToEdit,
  onClose,
  onSuccess,
}: ChurchFormModalProps) {
  const { name, setName, loading, error, isEditing, handleSubmit } =
    useChurchFormViewModel({ churchToEdit, onClose, onSuccess });

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>
              {isEditing ? "Editar Igreja" : "Nova Igreja"}
            </DialogTitle>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="space-y-3">
              <Label htmlFor="name">Nome da igreja</Label>
              <Input
                id="name"
                placeholder="Ex: Igreja Central"
                value={name}
                onChange={e => setName(e.target.value)}
                disabled={loading}
                required
              />
            </div>
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
