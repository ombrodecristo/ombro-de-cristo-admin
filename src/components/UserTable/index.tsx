import { Edit, ArrowUp, ArrowDown } from "lucide-react";
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
import { type SortConfig } from "@/pages/Dashboard/useDashboardViewModel";
import { type ProfileWithRelations } from "@/services/profileService";

type UserTableProps = {
  profiles: ProfileWithRelations[];
  onEdit: (profile: ProfileWithRelations) => void;
  sortConfig: SortConfig;
  requestSort: (key: keyof ProfileWithRelations) => void;
};

export default function UserTable({
  profiles,
  onEdit,
  sortConfig,
  requestSort,
}: UserTableProps) {
  const getSortIcon = (key: keyof ProfileWithRelations) => {
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
                onClick={() => requestSort("full_name")}
              >
                <div className="flex items-center">
                  Nome {getSortIcon("full_name")}
                </div>
              </TableHead>
              <TableHead
                className="cursor-pointer"
                onClick={() => requestSort("role")}
              >
                <div className="flex items-center">
                  Permissão {getSortIcon("role")}
                </div>
              </TableHead>
              <TableHead
                className="cursor-pointer"
                onClick={() => requestSort("gender")}
              >
                <div className="flex items-center">
                  Gênero {getSortIcon("gender")}
                </div>
              </TableHead>
              <TableHead
                className="cursor-pointer"
                onClick={() => requestSort("churches")}
              >
                <div className="flex items-center">
                  Igreja {getSortIcon("churches")}
                </div>
              </TableHead>
              <TableHead
                className="cursor-pointer"
                onClick={() => requestSort("mentor")}
              >
                <div className="flex items-center">
                  Mentor {getSortIcon("mentor")}
                </div>
              </TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {profiles.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  Nenhum usuário encontrado.
                </TableCell>
              </TableRow>
            ) : (
              profiles.map((profile) => (
                <TableRow key={profile.id}>
                  <TableCell className="font-medium">
                    {profile.full_name}
                  </TableCell>
                  <TableCell>{profile.role}</TableCell>
                  <TableCell>{profile.gender}</TableCell>
                  <TableCell>{profile.churches?.name ?? "N/A"}</TableCell>
                  <TableCell>{profile.mentor?.full_name ?? "N/A"}</TableCell>
                  <TableCell>
                    <Button
                      variant="default"
                      size="sm"
                      onClick={() => onEdit(profile)}
                    >
                      <Edit className="mr-2 h-4 w-4" /> Alterar
                    </Button>
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
