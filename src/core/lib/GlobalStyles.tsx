import { Global, css, useTheme } from "@emotion/react";
import type { Theme } from "./theme";

export function GlobalStyles() {
  const theme = useTheme() as Theme;

  return (
    <Global
      styles={css`
        *,
        *::before,
        *::after {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        html,
        body,
        #root {
          height: 100%;
          width: 100%;
        }

        body {
          font-family: ${theme.textVariants.defaults.fontFamily};
          font-size: ${theme.textVariants.defaults.fontSize};
          line-height: ${theme.textVariants.defaults.lineHeight};
          font-weight: ${theme.textVariants.defaults.fontWeight};
          color: ${theme.colors.mainForeground};
          background-color: ${theme.colors.mainBackground};
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }

        h1,
        h2,
        h3,
        h4,
        h5,
        h6 {
          font-family: ${theme.textVariants.header.fontFamily};
          font-weight: ${theme.textVariants.header.fontWeight};
          color: ${theme.colors.headerForeground};
          letter-spacing: ${theme.textVariants.header.letterSpacing};
        }

        button,
        input,
        select,
        textarea {
          font-family: inherit;
        }

        a {
          color: inherit;
          text-decoration: none;
        }

        input:-webkit-autofill,
        input:-webkit-autofill:hover,
        input:-webkit-autofill:focus,
        input:-webkit-autofill:active {
          -webkit-text-fill-color: ${theme.colors.inputForeground} !important;
          -webkit-box-shadow: 0 0 0 1000px ${theme.colors.inputBackground} inset !important;
          transition: background-color 5000s ease-in-out 0s;
        }

        input:-webkit-autofill:disabled {
          -webkit-text-fill-color: ${theme.colors.mutedForeground} !important;
          -webkit-box-shadow: 0 0 0 1000px ${theme.colors.mutedBackground} inset !important;
        }
      `}
    />
  );
}
