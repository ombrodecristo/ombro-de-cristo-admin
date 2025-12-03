import styled from "@emotion/styled";
import { FiEdit, FiTrash2, FiArrowUp, FiArrowDown } from "react-icons/fi";
import type { DevotionalWithAuthor } from "@/data/repositories/devotionalRepository";
import { formatDate } from "@/lib/formatters";
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
  key: string | null;
  direction: "ascending" | "descending";
};

const HeaderCellContent = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  cursor: pointer;
  user-select: none;
`;

const ActionsCell = styled.div`
  display: flex;
  gap: 8px;
`;

type DevotionalTableProps = {
  devotionals: DevotionalWithAuthor[];
  onEdit: (devotional: DevotionalWithAuthor) => void;
  onDelete: (devotional: DevotionalWithAuthor) => void;
  sortConfig: SortConfig;
  requestSort: (key: string) => void;
};

export default function DevotionalTable({
  devotionals,
  onEdit,
  onDelete,
  sortConfig,
  requestSort,
}: DevotionalTableProps) {
  const getSortIcon = (key: string) => {
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
            <TableHeaderCell onClick={() => requestSort("title")}>
              <HeaderCellContent>
                Título {getSortIcon("title")}
              </HeaderCellContent>
            </TableHeaderCell>
            <TableHeaderCell onClick={() => requestSort("author")}>
              <HeaderCellContent>
                Autoria {getSortIcon("author")}
              </HeaderCellContent>
            </TableHeaderCell>
            <TableHeaderCell onClick={() => requestSort("updated_at")}>
              <HeaderCellContent>
                Última Modificação {getSortIcon("updated_at")}
              </HeaderCellContent>
            </TableHeaderCell>
            <TableHeaderCell style={{ width: "220px" }}>Ações</TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {devotionals.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={4}
                style={{ textAlign: "center", height: "100px" }}
              >
                Nenhum devocional encontrado.
              </TableCell>
            </TableRow>
          ) : (
            devotionals.map(devotional => (
              <TableRow key={devotional.id}>
                <TableCell style={{ fontWeight: "500" }}>
                  {devotional.title}
                </TableCell>
                <TableCell>{devotional.author?.full_name ?? "N/A"}</TableCell>
                <TableCell>{formatDate(devotional.updated_at)}</TableCell>
                <TableCell>
                  <ActionsCell>
                    <Button
                      label="Editar"
                      onClick={() => onEdit(devotional)}
                      icon={<FiEdit />}
                      variant="secondary"
                      style={{ height: "40px", width: "auto" }}
                    />
                    <Button
                      label="Excluir"
                      onClick={() => onDelete(devotional)}
                      icon={<FiTrash2 />}
                      variant="destructive"
                      style={{ height: "40px", width: "auto" }}
                    />
                  </ActionsCell>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
