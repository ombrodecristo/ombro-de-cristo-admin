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
import { Textarea } from "@/components/ui/textarea";
import { Spinner } from "@/components/ui/spinner";
import { type Devotional } from "@/types/database";
import { useDevotionalFormViewModel } from "./useDevotionalFormViewModel";

type DevotionalFormModalProps = {
  open: boolean;
  authorId: string;
  devotionalToEdit: Devotional | null;
  onClose: () => void;
  onSuccess: () => void;
};

export default function DevotionalFormModal({
  open,
  authorId,
  devotionalToEdit,
  onClose,
  onSuccess,
}: DevotionalFormModalProps) {
  const {
    title,
    setTitle,
    content,
    setContent,
    loading,
    error,
    isEditing,
    handleSubmit,
  } = useDevotionalFormViewModel({
    authorId,
    devotionalToEdit,
    onClose,
    onSuccess,
  });

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>
              {isEditing ? "Editar Devocional" : "Novo Devocional"}
            </DialogTitle>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="space-y-3">
              <Label htmlFor="title">Título</Label>
              <Input
                id="title"
                placeholder="Título do devocional"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                disabled={loading}
                required
              />
            </div>

            <div className="space-y-3">
              <Label htmlFor="content">Conteúdo</Label>
              <Textarea
                id="content"
                placeholder="Escreva o devocional aqui..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                disabled={loading}
                required
                className="min-h-[200px]"
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
