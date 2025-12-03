import styled from "@emotion/styled";
import { FiEdit, FiTrash2, FiArrowUp, FiArrowDown } from "react-icons/fi";
import { type Church } from "@/types/database";
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
  key: keyof Church | null;
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

type ChurchTableProps = {
  churches: Church[];
  onEdit: (church: Church) => void;
  onDelete: (church: Church) => void;
  sortConfig: SortConfig;
  requestSort: (key: keyof Church) => void;
};

export default function ChurchTable({
  churches,
  onEdit,
  onDelete,
  sortConfig,
  requestSort,
}: ChurchTableProps) {
  const getSortIcon = (key: keyof Church) => {
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
            <TableHeaderCell onClick={() => requestSort("name")}>
              <HeaderCellContent>Nome {getSortIcon("name")}</HeaderCellContent>
            </TableHeaderCell>
            <TableHeaderCell onClick={() => requestSort("updated_at")}>
              <HeaderCellContent>
                Última Modificação {getSortIcon("updated_at")}
              </HeaderCellContent>
            </TableHeaderCell>
            <TableHeaderCell style={{ width: "180px" }}>Ações</TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {churches.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={3}
                style={{ textAlign: "center", height: "100px" }}
              >
                Nenhuma igreja encontrada.
              </TableCell>
            </TableRow>
          ) : (
            churches.map(church => (
              <TableRow key={church.id}>
                <TableCell style={{ fontWeight: "500" }}>
                  {church.name}
                </TableCell>
                <TableCell>{formatDate(church.updated_at)}</TableCell>
                <TableCell>
                  <ActionsCell>
                    <Button
                      label="Editar"
                      onClick={() => onEdit(church)}
                      icon={<FiEdit />}
                      variant="secondary"
                      style={{ height: "40px", width: "auto" }}
                    />
                    <Button
                      label="Excluir"
                      onClick={() => onDelete(church)}
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
