import { styled, Tabs } from "@mui/material";

import { CONTENT_WIDTH } from "../../shared";

export const StyledRoot = styled("main")(() => ({
  width: CONTENT_WIDTH,
  margin: "0 auto",
}));

export const StyledDashboardTabs = styled(Tabs)(({ theme }) => ({
  background: theme.palette.custom.white["100"],
  border: `1px solid ${theme.palette.custom.white["600"]}`,
  borderRadius: theme.spacing(3),
  padding: theme.spacing(2.5, 0),

  "& .MuiTabs-indicator": { display: "none" },

  "& .MuiTab-root": {
    ...theme.typography.ralewayMedium,
    display: "inline-block",
    fontSize: 22,
    cursor: "pointer",
    textTransform: "none",
    textAlign: "left",
    paddingInline: theme.spacing(6),
    "&.Mui-selected": {
      color: theme.palette.custom.info,
    },
  },

  "& .MuiTab-root:not(:last-of-type)": {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
})) as typeof Tabs;
