import { type UserRole, type UserGender } from "@/types/database";

export const roleMap: Record<UserRole, { MALE: string; FEMALE: string }> = {
  ADMIN: { MALE: "Administrador", FEMALE: "Administradora" },
  MENTOR: { MALE: "Mentor", FEMALE: "Mentora" },
  MISSIONARY: { MALE: "Missionário", FEMALE: "Missionária" },
};

export const genderMap: Record<UserGender, string> = {
  MALE: "Masculino",
  FEMALE: "Feminino",
};

export const formatRole = (role: UserRole, gender: UserGender) => {
  const roleInfo = roleMap[role];

  return roleInfo?.[gender] || role;
};

export const formatGender = (gender: UserGender) => genderMap[gender] || gender;

export const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};
