import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { LegalContent } from "@/pages/TermsAndPolicy/LegalContent";

type LegalAgreementProps = {
  accepted: boolean;
  onToggle: (checked: boolean) => void;
  isDisabled: boolean;
};

export function LegalAgreement({
  accepted,
  onToggle,
  isDisabled,
}: LegalAgreementProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAccept = () => {
    onToggle(true);
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="flex items-center space-x-2">
        <Checkbox
          id="terms"
          checked={accepted}
          onCheckedChange={onToggle}
          disabled={isDisabled}
        />
        <Label
          htmlFor="terms"
          className="text-sm font-normal text-muted-foreground"
        >
          Eu li e concordo com os{" "}
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="text-primary hover:underline font-semibold disabled:text-muted-foreground disabled:no-underline"
            disabled={isDisabled}
          >
            Termos de Uso e Política de Privacidade
          </button>
          .
        </Label>
      </div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-4xl h-[90vh] flex flex-col">
          <DialogHeader>
            <DialogTitle>Termos de Uso e Política de Privacidade</DialogTitle>
          </DialogHeader>
          <div className="flex-1 overflow-y-auto pr-6 -mr-6">
            <LegalContent showAcceptButton onAccept={handleAccept} />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
