import styled from "@emotion/styled";
import { FiEdit, FiArrowUp, FiArrowDown } from "react-icons/fi";
import { type ProfileWithRelations } from "@/services/profileService";
import { formatGender, formatRole } from "@/lib/formatters";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableHeaderCell,
  TableRow,
  Button,
} from "@/shared/components";

export type SortConfig = {
  key: keyof ProfileWithRelations | null;
  direction: "ascending" | "descending";
};

const HeaderCellContent = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  cursor: pointer;
  user-select: none;
`;

type UserTableProps = {
  profiles: ProfileWithRelations[];
  onEdit: (profile: ProfileWithRelations) => void;
  sortConfig: SortConfig;
  requestSort: (key: keyof ProfileWithRelations) => void;
};

export default function UserTable({
  profiles,
  onEdit,
  sortConfig,
  requestSort,
}: UserTableProps) {
  const getSortIcon = (key: keyof ProfileWithRelations) => {
    if (sortConfig.key !== key) return null;
    return sortConfig.direction === "ascending" ? (
      <FiArrowUp size={16} />
    ) : (
      <FiArrowDown size={16} />
    );
  };

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableHeaderCell onClick={() => requestSort("full_name")}>
              <HeaderCellContent>
                Nome {getSortIcon("full_name")}
              </HeaderCellContent>
            </TableHeaderCell>
            <TableHeaderCell onClick={() => requestSort("role")}>
              <HeaderCellContent>
                Permissão {getSortIcon("role")}
              </HeaderCellContent>
            </TableHeaderCell>
            <TableHeaderCell onClick={() => requestSort("gender")}>
              <HeaderCellContent>
                Gênero {getSortIcon("gender")}
              </HeaderCellContent>
            </TableHeaderCell>
            <TableHeaderCell onClick={() => requestSort("churches")}>
              <HeaderCellContent>
                Igreja {getSortIcon("churches")}
              </HeaderCellContent>
            </TableHeaderCell>
            <TableHeaderCell onClick={() => requestSort("mentor")}>
              <HeaderCellContent>
                Mentoria {getSortIcon("mentor")}
              </HeaderCellContent>
            </TableHeaderCell>
            <TableHeaderCell style={{ width: "120px" }}>Ações</TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {profiles.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={6}
                style={{ textAlign: "center", height: "100px" }}
              >
                Nenhum perfil encontrado.
              </TableCell>
            </TableRow>
          ) : (
            profiles.map(profile => (
              <TableRow key={profile.id}>
                <TableCell style={{ fontWeight: "500" }}>
                  {profile.full_name}
                </TableCell>
                <TableCell>
                  {formatRole(profile.role, profile.gender)}
                </TableCell>
                <TableCell>{formatGender(profile.gender)}</TableCell>
                <TableCell>{profile.churches?.name ?? "N/A"}</TableCell>
                <TableCell>{profile.mentor?.full_name ?? "N/A"}</TableCell>
                <TableCell>
                  <Button
                    label="Editar"
                    onClick={() => onEdit(profile)}
                    icon={<FiEdit />}
                    style={{ height: "40px", width: "auto" }}
                  />
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
