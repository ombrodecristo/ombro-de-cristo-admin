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
import { type DevotionalWithAuthor } from "@/services/devotionalService";
import { type SortConfig } from "@/pages/DevotionalManagement/useDevotionalManagementViewModel";
import { formatDate } from "@/lib/formatters";

type DevotionalTableProps = {
  devotionals: DevotionalWithAuthor[];
  onEdit: (devotional: DevotionalWithAuthor) => void;
  onDelete: (devotional: DevotionalWithAuthor) => void;
  sortConfig: SortConfig;
  requestSort: (key: keyof DevotionalWithAuthor | "author") => void;
};

export default function DevotionalTable({
  devotionals,
  onEdit,
  onDelete,
  sortConfig,
  requestSort,
}: DevotionalTableProps) {
  const getSortIcon = (key: keyof DevotionalWithAuthor | "author") => {
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
                onClick={() => requestSort("title")}
              >
                <div className="flex items-center">
                  Título {getSortIcon("title")}
                </div>
              </TableHead>
              <TableHead
                className="cursor-pointer"
                onClick={() => requestSort("author")}
              >
                <div className="flex items-center">
                  Autoria {getSortIcon("author")}
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
            {devotionals.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="h-24 text-center">
                  Nenhum devocional encontrado.
                </TableCell>
              </TableRow>
            ) : (
              devotionals.map((devotional) => (
                <TableRow key={devotional.id}>
                  <TableCell className="font-medium">
                    {devotional.title}
                  </TableCell>
                  <TableCell>{devotional.author?.full_name ?? "N/A"}</TableCell>
                  <TableCell>{formatDate(devotional.updated_at)}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onEdit(devotional)}
                      >
                        <Edit className="mr-2 h-4 w-4" /> Editar
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => onDelete(devotional)}
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
