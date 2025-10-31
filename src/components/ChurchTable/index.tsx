import { Edit, ArrowUp, ArrowDown, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { type Church } from "@/types/database";
import { type SortConfig } from "@/pages/ChurchManagement/useChurchManagementViewModel";
import { formatDate } from "@/lib/formatters";

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
    if (sortConfig.key !== key) {
      return null;
    }
    return sortConfig.direction === "ascending" ? (
      <ArrowUp className="ml-2 h-4 w-4" />
    ) : (
      <ArrowDown className="ml-2 h-4 w-4" />
    );
  };

  return (
    <Card>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead
                className="cursor-pointer"
                onClick={() => requestSort("name")}
              >
                <div className="flex items-center">
                  Nome {getSortIcon("name")}
                </div>
              </TableHead>
              <TableHead
                className="cursor-pointer"
                onClick={() => requestSort("updated_at")}
              >
                <div className="flex items-center">
                  Última Modificação {getSortIcon("updated_at")}
                </div>
              </TableHead>
              <TableHead className="w-[180px]">Ações</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {churches.length === 0 ? (
              <TableRow>
                <TableCell colSpan={3} className="h-24 text-center">
                  Nenhuma igreja encontrada.
                </TableCell>
              </TableRow>
            ) : (
              churches.map((church) => (
                <TableRow key={church.id}>
                  <TableCell className="font-medium">{church.name}</TableCell>
                  <TableCell>{formatDate(church.updated_at)}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onEdit(church)}
                      >
                        <Edit className="mr-2 h-4 w-4" /> Editar
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => onDelete(church)}
                      >
                        <Trash2 className="mr-2 h-4 w-4" /> Excluir
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
