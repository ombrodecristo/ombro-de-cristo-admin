import { useAuth } from "../../contexts/AuthContext";
import { useUserManagementViewModel } from "./useUserManagementViewModel";
import { Skeleton } from "@/components/ui/Skeleton";
import { Input } from "@/components/ui/Input";
import { PageHeader } from "@/components/ui/PageHeader";
import { FiSearch } from "react-icons/fi";
import styled from "@emotion/styled";

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.l}px;
`;

export default function UserManagementPage() {
  const { user } = useAuth();
  const { loading, searchQuery, setSearchQuery } = useUserManagementViewModel({
    currentUserId: user?.id || "",
  });

  if (loading) {
    return (
      <PageContainer>
        <PageHeader title="Perfis" />
        <Skeleton height="48px" width="320px" />
        <Skeleton height="400px" width="100%" />
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <PageHeader title="Perfis" />
      <Input
        placeholder="Pesquisar por nome..."
        value={searchQuery}
        onChange={e => setSearchQuery(e.target.value)}
        icon={<FiSearch size={20} />}
        style={{ maxWidth: "400px" }}
      />
      <p>
        A tabela e o modal de edição de usuários serão implementados na próxima
        etapa.
      </p>
    </PageContainer>
  );
}
