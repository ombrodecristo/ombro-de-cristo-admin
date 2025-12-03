import { Global, css, useTheme } from "@emotion/react";
import type { Theme } from "./theme";

export function GlobalStyles() {
  const theme = useTheme() as Theme;

  return (
    <Global
      styles={css`
        @font-face {
          font-family: "Inter";
          font-style: normal;
          font-weight: 400;
          font-display: swap;
          src: url("/fonts/inter-v20-latin-regular.woff2") format("woff2");
        }

        @font-face {
          font-family: "Inter";
          font-style: normal;
          font-weight: 500;
          font-display: swap;
          src: url("/fonts/inter-v20-latin-500.woff2") format("woff2");
        }

        @font-face {
          font-family: "Inter";
          font-style: normal;
          font-weight: 700;
          font-display: swap;
          src: url("/fonts/inter-v20-latin-700.woff2") format("woff2");
        }

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
          line-height: ${theme.textVariants.defaults.lineHeight}px;
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
      `}
    />
  );
}
