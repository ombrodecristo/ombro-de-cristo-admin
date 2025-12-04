import styled from "@emotion/styled";
import {
  IoPencil,
  IoTrashOutline,
  IoArrowUp,
  IoArrowDown,
  IoEyeOutline,
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

const ActionsContainer = styled(TableCell)`
  width: auto;
  @media (min-width: ${props => props.theme.breakpoints.tablet}) {
    width: 220px;
  }
`;

const DesktopOnlyCell = styled(TableCell)`
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    display: none;
  }
`;

const DesktopOnlyHeaderCell = styled(TableHeaderCell)`
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    display: none;
  }
`;

const DesktopActions = styled.div`
  display: flex;
  gap: 8px;
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    display: none;
  }
`;

const MobileActions = styled.div`
  display: none;
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    display: flex;
  }
`;

type ChurchTableProps = {
  churches: Church[];
  onEdit: (church: Church) => void;
  onDelete: (church: Church) => void;
  onDetails: (church: Church) => void;
  sortConfig: SortConfig;
  requestSort: (key: keyof Church) => void;
};

export default function ChurchTable({
  churches,
  onEdit,
  onDelete,
  onDetails,
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
            <DesktopOnlyHeaderCell onClick={() => requestSort("updated_at")}>
              <HeaderCellContent>
                Última Modificação {getSortIcon("updated_at")}
              </HeaderCellContent>
            </DesktopOnlyHeaderCell>
            <TableHeaderCell>Ações</TableHeaderCell>
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
                <DesktopOnlyCell>
                  {formatDate(church.updated_at)}
                </DesktopOnlyCell>
                <ActionsContainer>
                  <DesktopActions>
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
                  </DesktopActions>
                  <MobileActions>
                    <Button
                      label="Visualizar"
                      onClick={() => onDetails(church)}
                      icon={<IoEyeOutline />}
                      variant="secondary"
                      size="small"
                      style={{ width: "auto" }}
                    />
                  </MobileActions>
                </ActionsContainer>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
