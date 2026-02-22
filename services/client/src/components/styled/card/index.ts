import { Card, styled } from "@mui/material";

export const StyledCardRoot = styled(Card)(({ theme }) => ({
  borderRadius: theme.spacing(3.5),
  position: "relative",
  flex: 1,
  width: "100%",

  "& .MuiCardActionArea-root": {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    height: "100%",
    padding: theme.spacing(2, 2, 3, 2),

    "& .MuiCardMedia-root": {
      width: "100%",
      borderRadius: theme.spacing(3),
      backgroundPosition: "left",
    },

    "& .MuiCardContent-root": {
      width: "100%",
      display: "flex",
      flexDirection: "column",
      gap: theme.spacing(1.5),
      padding: theme.spacing(2, 0, 2, 2),

      "& h5.MuiTypography-ralewayMedium": {
        display: "-webkit-box",
        WebkitLineClamp: 2,
        WebkitBoxOrient: "vertical",
        overflow: "hidden",
        textOverflow: "ellipsis",
      },

      "& .MuiBox-root": {
        justifyContent: "flex-end",
      },
    },

    "& .editor-input": {
      ...theme.typography.ralewayMedium,
      fontSize: theme.spacing(2.25),
      lineHeight: "26px",
      color: theme.palette.custom.typography.semiGrey,
    },
  },

  "& .AssetCard-chip": {
    position: "absolute",
    top: 16,
    left: 16,
  },
}));
