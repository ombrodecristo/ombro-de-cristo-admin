import styled from "@emotion/styled";

export const TableContainer = styled.div`
  border-radius: ${props => props.theme.radii.l}px;
  border: 1px solid ${props => props.theme.colors.border};
  overflow-x: auto;
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

  tbody &:hover {
    background-color: ${props => props.theme.colors.mutedBackground}80;
  }
`;

export const TableHeaderCell = styled.th`
  padding: ${props => props.theme.spacing.m}px;
  font-weight: ${props => props.theme.textVariants.sectionHeader.fontWeight};
  font-size: ${props => props.theme.textVariants.sectionHeader.fontSize};
  color: ${props => props.theme.colors.mutedForeground};
  text-transform: ${props =>
    props.theme.textVariants.sectionHeader.textTransform};
  letter-spacing: ${props =>
    props.theme.textVariants.sectionHeader.letterSpacing};
  word-break: break-word;
`;

export const TableCell = styled.td`
  padding: ${props => props.theme.spacing.m}px;
  font-size: 14px;
  color: ${props => props.theme.colors.mainForeground};
  vertical-align: middle;
  word-break: break-word;
`;
