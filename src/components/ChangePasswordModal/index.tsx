import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
  DialogDescription,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Loader2, Lock } from "lucide-react";
import { useChangePasswordViewModel } from "./useChangePasswordViewModel";
import { PasswordInput } from "../ui/password-input";

type ChangePasswordModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onClose: () => void;
};

export default function ChangePasswordModal({
  open,
  onOpenChange,
  onClose,
}: ChangePasswordModalProps) {
  const {
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    loading,
    handleSubmit,
  } = useChangePasswordViewModel({ onClose });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Altere sua Senha</DialogTitle>
            <DialogDescription className="text-sm text-muted-foreground pt-1">
              Defina uma nova senha para sua conta.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="space-y-3">
              <Label htmlFor="password">Nova Senha</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <PasswordInput
                  id="password"
                  placeholder="••••••••"
                  className="pl-9"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="new-password"
                  disabled={loading}
                />
              </div>
            </div>

            <div className="space-y-3">
              <Label htmlFor="confirmPassword">Confirmar Nova Senha</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <PasswordInput
                  id="confirmPassword"
                  placeholder="••••••••"
                  className="pl-9"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  autoComplete="new-password"
                  disabled={loading}
                />
              </div>
            </div>
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="ghost" disabled={loading}>
                Cancelar
              </Button>
            </DialogClose>

            <Button type="submit" variant="default" disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Alterar Senha
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
