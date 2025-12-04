import styled from "@emotion/styled";
import {
  IoPencil,
  IoTrashOutline,
  IoArrowUp,
  IoArrowDown,
  IoEyeOutline,
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

type DevotionalTableProps = {
  devotionals: DevotionalWithAuthor[];
  onEdit: (devotional: DevotionalWithAuthor) => void;
  onDelete: (devotional: DevotionalWithAuthor) => void;
  onDetails: (devotional: DevotionalWithAuthor) => void;
  sortConfig: SortConfig;
  requestSort: (key: string) => void;
};

export default function DevotionalTable({
  devotionals,
  onEdit,
  onDelete,
  onDetails,
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
            <DesktopOnlyHeaderCell onClick={() => requestSort("author")}>
              <HeaderCellContent>
                Autoria {getSortIcon("author")}
              </HeaderCellContent>
            </DesktopOnlyHeaderCell>
            <DesktopOnlyHeaderCell onClick={() => requestSort("updated_at")}>
              <HeaderCellContent>
                Última Modificação {getSortIcon("updated_at")}
              </HeaderCellContent>
            </DesktopOnlyHeaderCell>
            <TableHeaderCell>Ações</TableHeaderCell>
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
                <DesktopOnlyCell>
                  {devotional.author?.full_name ?? "N/A"}
                </DesktopOnlyCell>
                <DesktopOnlyCell>
                  {formatDate(devotional.updated_at)}
                </DesktopOnlyCell>
                <ActionsContainer>
                  <DesktopActions>
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
                  </DesktopActions>
                  <MobileActions>
                    <Button
                      label="Visualizar"
                      onClick={() => onDetails(devotional)}
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
