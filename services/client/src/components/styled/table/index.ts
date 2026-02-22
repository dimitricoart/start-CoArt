import { alpha, Grid, styled, TableBody, TableContainer, TableHead, Theme } from "@mui/material";
import { CSSProperties } from "react";

type TBodyStyles =
  | CSSProperties
  | {
      [key: string]: TBodyStyles;
    };

const cellHeadStyles = (theme: Theme): CSSProperties => ({
  ...theme.typography.playfairSemibold,
  fontSize: 16,
  letterSpacing: "20%",
  color: theme.palette.custom.typography.semiGrey,
  textTransform: "uppercase",
  padding: 0,
  paddingBottom: theme.spacing(5),
  borderBottom: `1px solid ${theme.palette.custom.white["600"]}`,
});

const cellBodyStyles = (theme: Theme): TBodyStyles => ({
  padding: 0,
  paddingTop: theme.spacing(5),
  paddingBottom: theme.spacing(5),
  borderBottom: `1px solid ${theme.palette.custom.white["600"]}`,

  ...theme.typography.ralewayRegular,
  fontSize: 16,

  "& .Link": {
    textDecoration: "none",
    color: theme.palette.custom.info,
    display: "inline-block",
    borderBottom: `1px dashed ${theme.palette.custom.info}`,

    "&:hover": {
      color: alpha(theme.palette.custom.info, 0.8),
      borderBottom: `1px dashed ${alpha(theme.palette.custom.info, 0.8)}`,
    },
  },
});

export const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  background: theme.palette.custom.white["100"],
  padding: theme.spacing(5, 6),
  borderRadius: 30,
})) as typeof TableContainer;

export const StyledTableCard = styled(Grid)(({ theme }) => ({
  background: theme.palette.custom.white["100"],
  padding: theme.spacing(3, 3, 2, 3),
  borderRadius: theme.spacing(3),

  "& .TableCard-row": {
    "&:not(:first-of-type)": {
      paddingTop: theme.spacing(2),
    },

    "&:not(:last-child)": {
      paddingBottom: theme.spacing(2),
      borderBottom: `1px solid ${theme.palette.custom.white["600"]}`,
    },

    "& .MuiTableCell-head": {
      ...cellHeadStyles(theme),
      padding: 0,
      paddingTop: 0,
      paddingBottom: 0,
      borderBottom: "none",
    },

    "& .MuiTableCell-body": {
      ...cellBodyStyles(theme),
      padding: 0,
      paddingTop: 0,
      paddingBottom: 0,
      borderBottom: "none",
    },
  },
})) as typeof Grid;

export const StyledTableHead = styled(TableHead)(({ theme }) => ({
  "& .MuiTableCell-head": cellHeadStyles(theme),
})) as typeof TableHead;

export const StyledTableBody = styled(TableBody)(({ theme }) => ({
  "& .MuiTableCell-body": cellBodyStyles(theme),
})) as typeof TableBody;
