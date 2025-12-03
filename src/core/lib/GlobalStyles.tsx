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
        }

        body {
          font-family: ${theme.textVariants.defaults.fontFamily};
          font-size: ${theme.textVariants.defaults.fontSize}px;
          line-height: ${theme.textVariants.defaults.lineHeight};
          color: ${theme.colors.mainForeground};
          background-color: ${theme.colors.mainBackground};
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }

        button,
        input,
        select,
        textarea {
          font-family: inherit;
          font-size: inherit;
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
      `}
    />
  );
}
