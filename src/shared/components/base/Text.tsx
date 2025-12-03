import styled from "@emotion/styled";
import {
  typography,
  space,
  color,
  layout,
  variant,
  compose,
} from "styled-system";
import type {
  TypographyProps,
  SpaceProps,
  ColorProps,
  LayoutProps,
} from "styled-system";
import type { Theme as AppTheme } from "@/core/lib/theme";
import type { AllHTMLAttributes, ElementType } from "react";

const textSystemProps = new Set([
  ...(typography.propNames || []),
  ...(space.propNames || []),
  ...(color.propNames || []),
  ...(layout.propNames || []),
  "variant",
]);

const shouldForwardProp = (prop: string) => !textSystemProps.has(prop);

type TextVariantProp = {
  variant?: keyof AppTheme["textVariants"];
};

type TextStyleSystemProps = TypographyProps &
  SpaceProps &
  ColorProps &
  LayoutProps &
  TextVariantProp;

export type TextProps = TextStyleSystemProps &
  AllHTMLAttributes<HTMLParagraphElement> & {
    as?: ElementType;
  };

const textSystem = compose(typography, space, color, layout);

const textVariant = variant({
  prop: "variant",
  variants: {
    defaults: {
      fontFamily: "defaults.fontFamily",
      fontSize: "defaults.fontSize",
      fontWeight: "defaults.fontWeight",
      lineHeight: "defaults.lineHeight",
      color: "defaults.color",
    },
    header: {
      fontFamily: "header.fontFamily",
      fontSize: "header.fontSize",
      fontWeight: "header.fontWeight",
      lineHeight: "header.lineHeight",
      color: "header.color",
      letterSpacing: "header.letterSpacing",
    },
    subHeader: {
      fontFamily: "subHeader.fontFamily",
      fontSize: "subHeader.fontSize",
      fontWeight: "subHeader.fontWeight",
      lineHeight: "subHeader.lineHeight",
      color: "subHeader.color",
      letterSpacing: "subHeader.letterSpacing",
    },
    body: {
      fontFamily: "body.fontFamily",
      fontSize: "body.fontSize",
      fontWeight: "body.fontWeight",
      lineHeight: "body.lineHeight",
      color: "body.color",
    },
    bodyMedium: {
      fontFamily: "bodyMedium.fontFamily",
      fontSize: "bodyMedium.fontSize",
      fontWeight: "bodyMedium.fontWeight",
      lineHeight: "bodyMedium.lineHeight",
      color: "bodyMedium.color",
    },
    caption: {
      fontFamily: "caption.fontFamily",
      fontSize: "caption.fontSize",
      fontWeight: "caption.fontWeight",
      lineHeight: "caption.lineHeight",
      color: "caption.color",
      letterSpacing: "caption.letterSpacing",
    },
    buttonLabel: {
      fontFamily: "buttonLabel.fontFamily",
      fontSize: "buttonLabel.fontSize",
      fontWeight: "buttonLabel.fontWeight",
      textAlign: "buttonLabel.textAlign",
      color: "buttonLabel.color",
      letterSpacing: "buttonLabel.letterSpacing",
    },
    error: {
      fontFamily: "error.fontFamily",
      fontSize: "error.fontSize",
      fontWeight: "error.fontWeight",
      color: "error.color",
    },
    sectionHeader: {
      fontFamily: "sectionHeader.fontFamily",
      fontSize: "sectionHeader.fontSize",
      fontWeight: "sectionHeader.fontWeight",
      color: "sectionHeader.color",
      letterSpacing: "sectionHeader.letterSpacing",
      textTransform: "sectionHeader.textTransform",
    },
  },
});

export const Text = styled("p", { shouldForwardProp })<TextProps>(
  props => ({
    ...(props.theme as AppTheme).textVariants.defaults,
    margin: 0,
    padding: 0,
  }),
  textSystem,
  textVariant
);
