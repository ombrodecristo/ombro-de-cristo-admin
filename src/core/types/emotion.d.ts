import "@emotion/react";
import { Theme as AppTheme } from "../lib/theme";

declare module "@emotion/react" {
  export interface Theme extends AppTheme {}
}
