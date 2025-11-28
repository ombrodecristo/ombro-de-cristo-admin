import { useState, useEffect, type FormEvent } from "react";
import { type Devotional } from "@/types/database";
import { devotionalService } from "@/services/devotionalService";
import { logService } from "@/services/logService";
import {
  validateDevotionalTitle,
  validateDevotionalContent,
} from "@/lib/validators";

type UseDevotionalFormViewModelProps = {
  authorId: string;
  devotionalToEdit: Devotional | null;
  onClose: () => void;
  onSuccess: () => void;
};

export function useDevotionalFormViewModel({
  authorId,
  devotionalToEdit,
  onClose,
  onSuccess,
}: UseDevotionalFormViewModelProps) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isEditing = devotionalToEdit !== null;

  useEffect(() => {
    if (devotionalToEdit) {
      setTitle(devotionalToEdit.title);
      setContent(devotionalToEdit.content);
    } else {
      setTitle("");
      setContent("");
    }
    setError(null);
  }, [devotionalToEdit]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    const titleValidation = validateDevotionalTitle(title);
    if (!titleValidation.isValid) {
      setError(titleValidation.message);
      return;
    }

    const contentValidation = validateDevotionalContent(content);
    if (!contentValidation.isValid) {
      setError(contentValidation.message);
      return;
    }

    if (
      isEditing &&
      title.trim() === devotionalToEdit.title &&
      content.trim() === devotionalToEdit.content
    ) {
      onClose();
      return;
    }

    setLoading(true);

    const { data, error: apiError } = isEditing
      ? await devotionalService.updateDevotional(
          devotionalToEdit.id,
          title.trim(),
          content.trim()
        )
      : await devotionalService.createDevotional(
          title.trim(),
          content.trim(),
          authorId
        );

    setLoading(false);

    if (apiError) {
      const friendlyMessage = isEditing
        ? "Não foi possível salvar as alterações."
        : "Não foi possível criar o novo devocional.";
      setError(friendlyMessage);
      await logService.logError(apiError, {
        component: "useDevotionalFormViewModel",
        context: { devotionalId: devotionalToEdit?.id, title },
      });
    } else if (data) {
      onSuccess();
      onClose();
    }
  };

  return {
    title,
    setTitle,
    content,
    setContent,
    loading,
    error,
    isEditing,
    handleSubmit,
  };
}
