import { theme as mobileTheme } from "./mobileTheme";

const { textVariants: _mobileTextVariants, ...restOfMobileTheme } = mobileTheme;

const webTextVariants = {
  defaults: {
    fontFamily: "'Inter', sans-serif",
    fontSize: "16px",
    color: "mainForeground",
    lineHeight: "24px",
    fontWeight: 400,
  },
  header: {
    fontFamily: "'Inter', sans-serif",
    fontSize: "32px",
    color: "headerForeground",
    lineHeight: "40px",
    letterSpacing: "-0.5px",
    fontWeight: 700,
  },
  subHeader: {
    fontFamily: "'Inter', sans-serif",
    fontSize: "22px",
    color: "primaryBackground",
    lineHeight: "30px",
    letterSpacing: "-0.25px",
    fontWeight: 700,
  },
  body: {
    fontFamily: "'Inter', sans-serif",
    fontSize: "16px",
    color: "mainForeground",
    lineHeight: "26px",
    fontWeight: 400,
  },
  bodyMedium: {
    fontFamily: "'Inter', sans-serif",
    fontSize: "16px",
    color: "mainForeground",
    lineHeight: "26px",
    fontWeight: 500,
  },
  caption: {
    fontFamily: "'Inter', sans-serif",
    fontSize: "13px",
    color: "mutedForeground",
    lineHeight: "18px",
    letterSpacing: "0.2px",
    fontWeight: 500,
  },
  buttonLabel: {
    fontFamily: "'Inter', sans-serif",
    fontSize: "16px",
    color: "buttonPrimaryForeground",
    textAlign: "center",
    letterSpacing: "0.5px",
    fontWeight: 700,
  },
  error: {
    fontFamily: "'Inter', sans-serif",
    fontSize: "14px",
    color: "destructiveBackground",
    fontWeight: 500,
  },
  sectionHeader: {
    fontFamily: "'Inter', sans-serif",
    fontSize: "13px",
    color: "mutedForeground",
    letterSpacing: "1.5px",
    textTransform: "uppercase",
    fontWeight: 700,
  },
};

export const theme = {
  ...restOfMobileTheme,
  textVariants: webTextVariants,
};

export type Theme = typeof theme;
