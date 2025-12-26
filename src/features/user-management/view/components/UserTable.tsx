import styled from "@emotion/styled";
import {
  IoPencil,
  IoArrowUp,
  IoArrowDown,
  IoEyeOutline,
} from "react-icons/io5";
import type { ProfileWithRelations } from "@/data/repositories/profileRepository";
import { formatGender, formatRole } from "@/core/lib/formatters";
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
    width: 120px;
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

type UserTableProps = {
  profiles: ProfileWithRelations[];
  onEdit: (profile: ProfileWithRelations) => void;
  onDetails: (profile: ProfileWithRelations) => void;
  sortConfig: SortConfig;
  requestSort: (key: string) => void;
};

export default function UserTable({
  profiles,
  onEdit,
  onDetails,
  sortConfig,
  requestSort,
}: UserTableProps) {
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
            <TableHeaderCell onClick={() => requestSort("full_name")}>
              <HeaderCellContent>
                {t("users_table_header_name")} {getSortIcon("full_name")}
              </HeaderCellContent>
            </TableHeaderCell>
            <DesktopOnlyHeaderCell onClick={() => requestSort("role")}>
              <HeaderCellContent>
                {t("users_table_header_role")} {getSortIcon("role")}
              </HeaderCellContent>
            </DesktopOnlyHeaderCell>
            <DesktopOnlyHeaderCell onClick={() => requestSort("gender")}>
              <HeaderCellContent>
                {t("users_table_header_gender")} {getSortIcon("gender")}
              </HeaderCellContent>
            </DesktopOnlyHeaderCell>
            <DesktopOnlyHeaderCell onClick={() => requestSort("churches")}>
              <HeaderCellContent>
                {t("users_table_header_church")} {getSortIcon("churches")}
              </HeaderCellContent>
            </DesktopOnlyHeaderCell>
            <DesktopOnlyHeaderCell onClick={() => requestSort("mentor")}>
              <HeaderCellContent>
                {t("users_table_header_mentor")} {getSortIcon("mentor")}
              </HeaderCellContent>
            </DesktopOnlyHeaderCell>
            <TableHeaderCell>
              {t("churches_table_header_actions")}
            </TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {profiles.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={6}
                style={{ textAlign: "center", height: "100px" }}
              >
                {t("users_table_no_results")}
              </TableCell>
            </TableRow>
          ) : (
            profiles.map(profile => (
              <TableRow key={profile.id}>
                <TableCell style={{ fontWeight: "500" }}>
                  {profile.full_name}
                </TableCell>
                <DesktopOnlyCell>{formatRole(profile.role)}</DesktopOnlyCell>
                <DesktopOnlyCell>
                  {formatGender(profile.gender)}
                </DesktopOnlyCell>
                <DesktopOnlyCell>
                  {profile.churches?.name ?? t("common_undefined")}
                </DesktopOnlyCell>
                <DesktopOnlyCell>
                  {profile.mentor?.full_name ?? t("common_undefined")}
                </DesktopOnlyCell>
                <ActionsContainer>
                  <DesktopActions>
                    <Button
                      label={t("users_edit_button")}
                      onClick={() => onEdit(profile)}
                      icon={<IoPencil />}
                      size="small"
                      style={{ width: "auto" }}
                    />
                  </DesktopActions>
                  <MobileActions>
                    <Button
                      label={t("common_view")}
                      onClick={() => onDetails(profile)}
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
