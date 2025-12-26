import i18n from "@/core/i18n";
import type { UserRole, UserGender } from "@/core/types/database";

export const formatRole = (role: UserRole) => {
  return i18n.t(`role_${role}`);
};

export const formatGender = (gender: UserGender | null | undefined) => {
  if (!gender) {
    return i18n.t("gender_undefined");
  }

  return i18n.t(`gender_${gender}`);
};

export const formatDate = (dateString: string) => {
  if (!dateString) return i18n.t("common_undefined");

  return new Date(dateString).toLocaleDateString(i18n.language, {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};
