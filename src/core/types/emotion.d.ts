import "@emotion/react";
import { type Theme as AppTheme } from "../lib/theme";

declare module "@emotion/react" {
  export interface Theme extends AppTheme {}
}
