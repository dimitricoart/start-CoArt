import { createTheme, ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import { FC, PropsWithChildren } from "react";

import { themeProps } from "./theme";

export const ThemeProvider: FC<PropsWithChildren<unknown>> = ({ children }) => {
  const theme = createTheme({
    palette: themeProps.lightPalette as Record<string, unknown>,
    typography: (themeProps.options as { typography?: object }).typography as object,
    components: (themeProps.options as { components?: object }).components as object,
  });
  return <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>;
};
