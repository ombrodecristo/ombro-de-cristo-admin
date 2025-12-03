import styled from "@emotion/styled";
import {
  IoPencil,
  IoTrashOutline,
  IoArrowUp,
  IoArrowDown,
} from "react-icons/io5";
import type { DevotionalWithAuthor } from "@/data/repositories/devotionalRepository";
import { formatDate } from "@/core/lib/formatters";
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
      <IoArrowUp size={16} />
    ) : (
      <IoArrowDown size={16} />
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
                      icon={<IoPencil />}
                      variant="secondary"
                      size="small"
                      style={{ width: "auto" }}
                    />
                    <Button
                      label="Excluir"
                      onClick={() => onDelete(devotional)}
                      icon={<IoTrashOutline />}
                      variant="destructive"
                      size="small"
                      style={{ width: "auto" }}
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
