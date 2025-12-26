import styled from "@emotion/styled";
import { useTranslation } from "react-i18next";

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: ${props => props.theme.spacing.xl}px;
`;

const H1 = styled.h1(props => ({
  ...props.theme.textVariants.header,
  fontSize: "24px",
  lineHeight: "32px",
  marginBottom: props.theme.spacing.m,
}));

const H2 = styled.h2(props => ({
  ...props.theme.textVariants.subHeader,
  color: props.theme.colors.mainForeground,
  fontSize: "18px",
  marginTop: props.theme.spacing.l,
  marginBottom: props.theme.spacing.s,
}));

const P = styled.p(props => ({
  ...props.theme.textVariants.body,
  lineHeight: "26px",
  marginBottom: props.theme.spacing.m,
  color: props.theme.colors.mutedForeground,
}));

const Bold = styled.strong(props => ({
  ...props.theme.textVariants.bodyMedium,
  color: props.theme.colors.mainForeground,
}));

const UL = styled.ul`
  padding-left: ${props => props.theme.spacing.m}px;
  list-style: none;
`;

const LI = styled.li(props => ({
  ...props.theme.textVariants.body,
  color: props.theme.colors.mutedForeground,
  lineHeight: "26px",
  marginBottom: props.theme.spacing.m,
  paddingLeft: props.theme.spacing.m,
  position: "relative",

  "&::before": {
    content: "'•'",
    position: "absolute",
    left: 0,
    color: props.theme.colors.primary,
  },
}));

const Divider = styled.div`
  height: 1px;
  background-color: ${props => props.theme.colors.border};
  margin: ${props => props.theme.spacing.xl}px 0;
`;

export function LegalContent() {
  const { t } = useTranslation();

  return (
    <Container>
      <H1>{t("legal_terms_title")}</H1>
      <P>{t("legal_terms_intro")}</P>

      <H2>{t("legal_terms_1_header")}</H2>
      <P>{t("legal_terms_1_p1")}</P>

      <H2>{t("legal_terms_2_header")}</H2>
      <P>{t("legal_terms_2_p1")}</P>

      <H2>{t("legal_terms_3_header")}</H2>
      <UL>
        <LI>{t("legal_terms_3_li1")}</LI>
        <LI>{t("legal_terms_3_li2")}</LI>
        <LI>{t("legal_terms_3_li3")}</LI>
        <LI>{t("legal_terms_3_li4")}</LI>
      </UL>

      <H2>{t("legal_terms_4_header")}</H2>
      <P>{t("legal_terms_4_p1")}</P>
      <UL>
        <LI>{t("legal_terms_4_li1")}</LI>
        <LI>{t("legal_terms_4_li2")}</LI>
        <LI>{t("legal_terms_4_li3")}</LI>
        <LI>{t("legal_terms_4_li4")}</LI>
      </UL>

      <H2>{t("legal_terms_5_header")}</H2>
      <UL>
        <LI>{t("legal_terms_5_li1")}</LI>
        <LI>{t("legal_terms_5_li2")}</LI>
        <LI>{t("legal_terms_5_li3")}</LI>
        <LI>{t("legal_terms_5_li5")}</LI>
      </UL>

      <H2>{t("legal_terms_6_header")}</H2>
      <UL>
        <LI>{t("legal_terms_6_li1")}</LI>
        <LI>{t("legal_terms_6_li2")}</LI>
      </UL>

      <H2>{t("legal_terms_7_header")}</H2>
      <UL>
        <LI>{t("legal_terms_7_li1")}</LI>
        <LI>{t("legal_terms_7_li2")}</LI>
        <LI>{t("legal_terms_7_li3")}</LI>
      </UL>

      <H2>{t("legal_terms_8_header")}</H2>
      <UL>
        <LI>{t("legal_terms_8_li1")}</LI>
        <LI>{t("legal_terms_8_li2")}</LI>
      </UL>

      <H2>{t("legal_terms_9_header")}</H2>
      <P>{t("legal_terms_9_p1")}</P>

      <H2>{t("legal_terms_10_header")}</H2>
      <P>{t("legal_terms_10_p1")}</P>

      <H2>{t("legal_terms_11_header")}</H2>
      <P>{t("legal_terms_11_p1")}</P>

      <Divider />

      <H1>{t("legal_privacy_title")}</H1>
      <P>{t("legal_privacy_intro")}</P>

      <H2>{t("legal_privacy_1_header")}</H2>
      <P>
        <Bold>{t("legal_privacy_1_a_header")}</Bold>
      </P>
      <UL>
        <LI>{t("legal_privacy_1_li1")}</LI>
        <LI>{t("legal_privacy_1_li2")}</LI>
        <LI>{t("legal_privacy_1_li3")}</LI>
      </UL>

      <P style={{ marginTop: "16px" }}>
        <Bold>{t("legal_privacy_1_b_header")}</Bold>
      </P>
      <UL>
        <LI>{t("legal_privacy_1_li4")}</LI>
        <LI>{t("legal_privacy_1_li5")}</LI>
      </UL>

      <H2>{t("legal_privacy_2_header")}</H2>
      <UL>
        <LI>{t("legal_privacy_2_li1")}</LI>
        <LI>{t("legal_privacy_2_li2")}</LI>
        <LI>{t("legal_privacy_2_li3")}</LI>
        <LI>{t("legal_privacy_2_li4")}</LI>
      </UL>

      <H2>{t("legal_privacy_3_header")}</H2>
      <P>{t("legal_privacy_3_p1")}</P>
      <UL>
        <LI>{t("legal_privacy_3_li1")}</LI>
        <LI>{t("legal_privacy_3_li2")}</LI>
        <LI>{t("legal_privacy_3_li3")}</LI>
      </UL>

      <H2>{t("legal_privacy_4_header")}</H2>
      <P>{t("legal_privacy_4_p1")}</P>
      <UL>
        <LI>{t("legal_privacy_4_li1")}</LI>
        <LI>{t("legal_privacy_4_li2")}</LI>
        <LI>{t("legal_privacy_4_li3")}</LI>
      </UL>

      <H2>{t("legal_privacy_5_header")}</H2>
      <UL>
        <LI>{t("legal_privacy_5_li1")}</LI>
        <LI>{t("legal_privacy_5_li2")}</LI>
        <LI>{t("legal_privacy_5_li3")}</LI>
      </UL>

      <H2>{t("legal_privacy_6_header")}</H2>
      <P>{t("legal_privacy_6_p1")}</P>

      <H2>{t("legal_privacy_7_header")}</H2>
      <P>{t("legal_privacy_7_p1")}</P>

      <H2>{t("legal_privacy_8_header")}</H2>
      <P>{t("legal_privacy_8_p1")}</P>
    </Container>
  );
}
