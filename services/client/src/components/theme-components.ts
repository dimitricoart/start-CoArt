import type { ThemeOptions } from "@mui/material";

export const MuiAutocomplete: NonNullable<ThemeOptions["components"]>["MuiAutocomplete"] = {
  styleOverrides: {
    root: () => ({
      marginTop: "0 !important",
      marginBottom: "0 !important",
    }),
  },
};
