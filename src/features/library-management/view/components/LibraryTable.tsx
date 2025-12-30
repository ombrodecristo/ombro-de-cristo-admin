import styled from "@emotion/styled";
import {
  IoPencil,
  IoTrashOutline,
  IoArrowUp,
  IoArrowDown,
  IoEyeOutline,
} from "react-icons/io5";
import type { LibraryItem } from "@/core/types/database";
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
import { useTranslation } from "react-i18next";

export type SortConfig = {
  key: keyof LibraryItem | null;
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

type LibraryTableProps = {
  items: LibraryItem[];
  onEdit: (item: LibraryItem) => void;
  onDelete: (item: LibraryItem) => void;
  onDetails: (item: LibraryItem) => void;
  sortConfig: SortConfig;
  requestSort: (key: keyof LibraryItem) => void;
};

export default function LibraryTable({
  items,
  onEdit,
  onDelete,
  onDetails,
  sortConfig,
  requestSort,
}: LibraryTableProps) {
  const { t } = useTranslation();

  const getSortIcon = (key: keyof LibraryItem) => {
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
                {t("library_table_header_title")} {getSortIcon("title")}
              </HeaderCellContent>
            </TableHeaderCell>
            <DesktopOnlyHeaderCell onClick={() => requestSort("content_type")}>
              <HeaderCellContent>
                {t("library_table_header_type")} {getSortIcon("content_type")}
              </HeaderCellContent>
            </DesktopOnlyHeaderCell>
            <DesktopOnlyHeaderCell onClick={() => requestSort("updated_at")}>
              <HeaderCellContent>
                {t("library_table_header_modified")} {getSortIcon("updated_at")}
              </HeaderCellContent>
            </DesktopOnlyHeaderCell>
            <TableHeaderCell>
              {t("churches_table_header_actions")}
            </TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={4}
                style={{ textAlign: "center", height: "100px" }}
              >
                {t("library_table_no_results")}
              </TableCell>
            </TableRow>
          ) : (
            items.map(item => (
              <TableRow key={item.id}>
                <TableCell style={{ fontWeight: "500" }}>
                  {item.title}
                </TableCell>
                <DesktopOnlyCell>
                  {t(`library_form_type_${item.content_type.toLowerCase()}`)}
                </DesktopOnlyCell>
                <DesktopOnlyCell>{formatDate(item.updated_at)}</DesktopOnlyCell>
                <ActionsContainer>
                  <DesktopActions>
                    <Button
                      label={t("churches_details_edit_button")}
                      onClick={() => onEdit(item)}
                      icon={<IoPencil />}
                      size="small"
                      style={{ width: "auto" }}
                    />
                    <Button
                      label={t("churches_details_delete_button")}
                      onClick={() => onDelete(item)}
                      icon={<IoTrashOutline />}
                      variant="destructive"
                      size="small"
                      style={{ width: "auto" }}
                    />
                  </DesktopActions>
                  <MobileActions>
                    <Button
                      label={t("common_view")}
                      onClick={() => onDetails(item)}
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
