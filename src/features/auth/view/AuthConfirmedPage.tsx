import styled from "@emotion/styled";
import { IoCheckmarkCircle, IoAlertCircle } from "react-icons/io5";
import { BaseCard, GlobalLoader } from "@/shared/components";
import { useAuth } from "@/shared/hooks/useAuth";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

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

enum PageState {
  Loading,
  Success,
  Error,
}

export default function AuthConfirmedPage() {
  const { t } = useTranslation();
  const { initialHash, loading: authLoading } = useAuth();
  const [pageState, setPageState] = useState<PageState>(PageState.Loading);

  useEffect(() => {
    if (authLoading) {
      setPageState(PageState.Loading);

      return;
    }

    const hashParams = new URLSearchParams(initialHash.substring(1));
    const errorDescription = hashParams.get("error_description");
    const tokenType = hashParams.get("type");

    if (errorDescription) {
      setPageState(PageState.Error);
    } else if (tokenType === "signup" || tokenType === "invite") {
      setPageState(PageState.Success);
    } else {
      setPageState(PageState.Error);
    }
  }, [initialHash, authLoading]);

  if (pageState === PageState.Loading) {
    return <GlobalLoader />;
  }

  const isSuccess = pageState === PageState.Success;

  const title = isSuccess
    ? t("auth_confirmed_title_success")
    : t("auth_confirmed_title_error");

  const message = isSuccess
    ? t("auth_confirmed_message_success")
    : t("auth_confirmed_message_error");

  return (
    <PageContainer>
      <StyledCard>
        <Header>
          <StatusIcon success={isSuccess}>
            {isSuccess ? <IoCheckmarkCircle /> : <IoAlertCircle />}
          </StatusIcon>
          <Title success={isSuccess}>{title}</Title>
        </Header>

        <ContentText>{message}</ContentText>
      </StyledCard>
    </PageContainer>
  );
}
