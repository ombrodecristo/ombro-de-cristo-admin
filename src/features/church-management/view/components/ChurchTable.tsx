import styled from "@emotion/styled";
import {
  IoPencil,
  IoTrashOutline,
  IoArrowUp,
  IoArrowDown,
} from "react-icons/io5";
import { type Church } from "@/core/types/database";
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
            <TableHeaderCell onClick={() => requestSort("name")}>
              <HeaderCellContent>Nome {getSortIcon("name")}</HeaderCellContent>
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
                      icon={<IoPencil />}
                      variant="secondary"
                      size="small"
                      style={{ width: "auto" }}
                    />
                    <Button
                      label="Excluir"
                      onClick={() => onDelete(church)}
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
