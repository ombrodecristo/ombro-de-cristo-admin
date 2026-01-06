import styled from "@emotion/styled";
import { IoCheckmarkCircle, IoAlertCircle } from "react-icons/io5";
import { BaseCard, GlobalLoader } from "@/shared/components";
import { useAuth } from "@/shared/hooks/useAuth";
import { useEffect, useState } from "react";
import { useViewModel } from "@/shared/hooks/useViewModel";
import {
  AuthConfirmedViewModel,
  PageState,
} from "../view-models/AuthConfirmedViewModel";

const PageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 100vh;
  padding: ${props => props.theme.spacing.m}px;
`;

const StyledCard = styled(BaseCard)`
  width: 100%;
  max-width: 448px;
  padding: ${props => props.theme.spacing.xl}px;
`;

const Header = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${props => props.theme.spacing.m}px;
  text-align: center;
  margin-bottom: ${props => props.theme.spacing.l}px;
`;

const StatusIcon = styled.div<{ success: boolean }>`
  color: ${props =>
    props.success
      ? props.theme.colors.success
      : props.theme.colors.destructiveBackground};
  svg {
    width: 48px;
    height: 48px;
  }
`;

const Title = styled.h1<{ success: boolean }>`
  font-family: ${props => props.theme.textVariants.header.fontFamily};
  font-weight: ${props => props.theme.textVariants.header.fontWeight};
  color: ${props =>
    props.success
      ? props.theme.colors.primary
      : props.theme.colors.destructiveBackground};
  font-size: 24px;
`;

const ContentText = styled.p`
  color: ${props => props.theme.colors.mutedForeground};
  line-height: 1.6;
  text-align: center;
`;

export default function AuthConfirmedPage() {
  const { initialHash, loading: authLoading } = useAuth();
  const [viewModel] = useState(() => new AuthConfirmedViewModel());
  useViewModel(viewModel);

  useEffect(() => {
    viewModel.processAuthConfirmation(authLoading, initialHash);
  }, [initialHash, authLoading, viewModel]);

  if (viewModel.pageState === PageState.Loading) {
    return <GlobalLoader />;
  }

  return (
    <PageContainer>
      <StyledCard>
        <Header>
          <StatusIcon success={viewModel.isSuccess}>
            {viewModel.isSuccess ? <IoCheckmarkCircle /> : <IoAlertCircle />}
          </StatusIcon>
          <Title success={viewModel.isSuccess}>{viewModel.title}</Title>
        </Header>
        <ContentText>{viewModel.message}</ContentText>
      </StyledCard>
    </PageContainer>
  );
}
