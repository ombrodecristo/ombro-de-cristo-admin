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
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();

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
                {t("devotionals_table_header_title")} {getSortIcon("title")}
              </HeaderCellContent>
            </TableHeaderCell>
            <DesktopOnlyHeaderCell onClick={() => requestSort("author")}>
              <HeaderCellContent>
                {t("devotionals_table_header_author")} {getSortIcon("author")}
              </HeaderCellContent>
            </DesktopOnlyHeaderCell>
            <DesktopOnlyHeaderCell onClick={() => requestSort("updated_at")}>
              <HeaderCellContent>
                {t("devotionals_table_header_modified")}{" "}
                {getSortIcon("updated_at")}
              </HeaderCellContent>
            </DesktopOnlyHeaderCell>
            <TableHeaderCell>
              {t("churches_table_header_actions")}
            </TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {devotionals.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={4}
                style={{ textAlign: "center", height: "100px" }}
              >
                {t("devotionals_table_no_results")}
              </TableCell>
            </TableRow>
          ) : (
            devotionals.map(devotional => (
              <TableRow key={devotional.id}>
                <TableCell style={{ fontWeight: "500" }}>
                  {devotional.title}
                </TableCell>
                <DesktopOnlyCell>
                  {devotional.author?.full_name ?? t("common_undefined")}
                </DesktopOnlyCell>
                <DesktopOnlyCell>
                  {formatDate(devotional.updated_at)}
                </DesktopOnlyCell>
                <ActionsContainer>
                  <DesktopActions>
                    <Button
                      label={t("churches_details_edit_button")}
                      onClick={() => onEdit(devotional)}
                      icon={<IoPencil />}
                      variant="secondary"
                      size="small"
                      style={{ width: "auto" }}
                    />
                    <Button
                      label={t("churches_details_delete_button")}
                      onClick={() => onDelete(devotional)}
                      icon={<IoTrashOutline />}
                      variant="destructive"
                      size="small"
                      style={{ width: "auto" }}
                    />
                  </DesktopActions>
                  <MobileActions>
                    <Button
                      label={t("common_view")}
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
