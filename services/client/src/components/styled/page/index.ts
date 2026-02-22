import { Box, styled } from "@mui/material";

import { formStyles } from "../form";
import { sizeDecreaseCalc } from "../../../utils/sizeDecrease";

export const StyledPageRoot = styled(Box)(({ theme }) => ({
  paddingBottom: theme.spacing(9),

  // Page header styles
  "& .MuiTypography-body1": {
    ...theme.typography.ralewayRegular,
    fontSize: sizeDecreaseCalc(45, 27, "px"),
    fontWeight: 400,
    lineHeight: "normal",

    "& .Page-HeaderTitle": {
      ...theme.typography.playfairBoldItalic,
      fontSize: sizeDecreaseCalc(45, 27, "px"),
      lineHeight: "normal",
    },

    "& .Banner-ItalicBoldText": {
      ...theme.typography.playfairBoldItalic,
      fontSize: sizeDecreaseCalc(45, 27, "px"),
    },
  },

  // Form styles
  ...formStyles(theme),

  // Asset list create button styles
  "& .AssetList-CreateButton, & .ShowroomList-CreateButton": { display: "inline-block", minWidth: 200 },

  // Pagination styles
  "& .MuiPagination-ul": {
    marginTop: theme.spacing(6),

    "& .MuiPaginationItem-root": {
      width: 39,
      height: 39,
      background: theme.palette.custom.white["100"],
      borderRadius: theme.spacing(0.75),
      ...theme.typography.ralewayRegular,
      lineHeight: "34px",
      color: theme.palette.custom.grey["100"],

      "&.Mui-selected": {
        border: `1px solid ${theme.palette.custom.info}`,
        color: theme.palette.custom.info,
      },
    },
  },

  // Description styles
  "& .editor-input": {
    ...theme.typography.ralewayRegular,
    fontSize: sizeDecreaseCalc(18, 16),
    lineHeight: "27px",
  },
})) as typeof Box;
