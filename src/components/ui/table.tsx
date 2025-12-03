import styled from "@emotion/styled";

export const TableContainer = styled.div`
  border-radius: ${props => props.theme.borderRadii.l}px;
  border: 1px solid ${props => props.theme.colors.border};
  overflow: hidden;
  background-color: ${props => props.theme.colors.cardBackground};
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  text-align: left;
`;

export const TableHead = styled.thead`
  background-color: ${props => props.theme.colors.mutedBackground};
`;

export const TableBody = styled.tbody``;

export const TableRow = styled.tr`
  border-bottom: 1px solid ${props => props.theme.colors.border};

  &:last-of-type {
    border-bottom: none;
  }
`;

export const TableHeaderCell = styled.th`
  padding: ${props => props.theme.spacing.sm}px
    ${props => props.theme.spacing.m}px;
  font-weight: 600;
  font-size: 13px;
  color: ${props => props.theme.colors.mutedForeground};
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

export const TableCell = styled.td`
  padding: ${props => props.theme.spacing.m}px;
  font-size: 14px;
  color: ${props => props.theme.colors.mainForeground};
  vertical-align: middle;
`;
