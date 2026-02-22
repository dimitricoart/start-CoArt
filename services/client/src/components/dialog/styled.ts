import { Dialog, styled } from "@mui/material";

export const StyledDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiPaper-root": {
    minWidth: "70%",
    background: theme.palette.custom.white["100"],
    padding: theme.spacing(3, 5),
    borderRadius: theme.spacing(3.75),

    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(1, 2),
    },

    "& .MuiDialogTitle-root": {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      ...theme.typography.ralewayRegular,
      fontSize: 45,
      lineHeight: "normal",
      paddingBottom: theme.spacing(4),

      "& .CloseIcon > svg": {
        width: 33,
        height: 33,
      },
    },

    "& .MuiDialogContent-root": {
      "& .MuiButton-root": {
        marginTop: theme.spacing(2),
        alignSelf: "flex-end",
      },
    },

    "& .FormWrapper-root": {
      display: "flex",
      flexDirection: "column",
      gap: theme.spacing(3),

      "& .MuiOutlinedInput-root": {
        ...theme.typography.ralewayRegular,
        lineHeight: "24px",
        borderRadius: theme.spacing(1),
        background: theme.palette.custom.white["200"],
        border: `1px solid ${theme.palette.custom.white["500"]}`,

        "&.Mui-error": {
          border: `1px solid ${theme.palette.error.main}`,
        },
      },
      "& .MuiOutlinedInput-notchedOutline": {
        border: "none",
      },
      "&:hover .MuiOutlinedInput-notchedOutline": {
        border: "none",
      },
      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
        border: "none",
      },

      "& .MuiFormLabel-root": {
        ...theme.typography.ralewayRegular,
        color: theme.palette.custom.typography.black,
        fontSize: 18,
        margin: theme.spacing(0, 0, 1, 0),
      },

      "& .MuiFormHelperText-root": {
        ...theme.typography.ralewayRegular,
        margin: 0,
      },
    },
  },
}));
