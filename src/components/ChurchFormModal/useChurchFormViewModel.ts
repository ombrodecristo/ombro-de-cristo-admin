import { useState, useEffect, type FormEvent } from "react";
import { type Church } from "@/types/database";
import { churchService } from "@/services/churchService";
import { logService } from "@/services/logService";
import { validateChurchName } from "@/lib/validators";

type UseChurchFormViewModelProps = {
  churchToEdit: Church | null;
  onClose: () => void;
  onSuccess: () => void;
};

export function useChurchFormViewModel({
  churchToEdit,
  onClose,
  onSuccess,
}: UseChurchFormViewModelProps) {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isEditing = churchToEdit !== null;

  useEffect(() => {
    if (churchToEdit) {
      setName(churchToEdit.name);
    } else {
      setName("");
    }
    setError(null);
  }, [churchToEdit]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    const nameValidation = validateChurchName(name);
    if (!nameValidation.isValid) {
      setError(nameValidation.message);
      return;
    }

    if (isEditing && name.trim() === churchToEdit.name) {
      onClose();
      return;
    }

    setLoading(true);

    const { data, error: apiError } = isEditing
      ? await churchService.updateChurch(churchToEdit.id, name.trim())
      : await churchService.createChurch(name.trim());

    setLoading(false);

    if (apiError) {
      const friendlyMessage = isEditing
        ? "Não foi possível salvar as alterações."
        : "Não foi possível criar a nova igreja.";
      setError(friendlyMessage);
      await logService.logError(apiError, {
        component: "useChurchFormViewModel",
        context: { churchId: churchToEdit?.id, name },
      });
    } else if (data) {
      onSuccess();
      onClose();
    }
  };

  return {
    name,
    setName,
    loading,
    error,
    isEditing,
    handleSubmit,
  };
}
