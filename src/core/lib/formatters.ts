import type { UserRole, UserGender } from "@/core/types/database";

export const roleMap: Record<UserRole, string> = {
  ADMIN: "Administração",
  MENTOR: "Mentoria",
  MISSIONARY: "Membro da Missão",
};

export const genderMap: Record<UserGender, string> = {
  MALE: "Masculino",
  FEMALE: "Feminino",
};

export const formatRole = (role: UserRole, _gender?: UserGender) => {
  return roleMap[role] || role;
};

export const formatGender = (gender: UserGender) => genderMap[gender] || gender;

export const formatDate = (dateString: string) => {
  if (!dateString) return "N/A";

  return new Date(dateString).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};
