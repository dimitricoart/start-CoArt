import { CSSObject, Theme } from "@mui/material";

export const formStyles = (theme: Theme): CSSObject => ({
  "& .FormWrapper-root": {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: theme.spacing(4),
    paddingTop: theme.spacing(4.5),

    "& .InputBox-root": {
      width: "100%",
      "& .MuiTypography-ralewayRegular": {
        fontSize: 18,
      },
      "& .MuiFormHelperText-root": {
        marginLeft: 0,
      },
      "& .MuiFormLabel-root": {
        position: "static",
        transform: "none",
        ...theme.typography.ralewayRegular,
        color: theme.palette.custom.typography.black,
        fontSize: 18,
        margin: theme.spacing(0, 0, 1, 0),
        display: "block",

        "& .MuiFormLabel-asterisk": {
          color: theme.palette.custom.error,
        },
      },
    },

    "& .MuiFormControl-root": {
      margin: 0,
      width: "100%",
      "& .MuiOutlinedInput-notchedOutline": {
        border: "none",
      },
      "&:hover .MuiOutlinedInput-notchedOutline": {
        border: "none",
      },
      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
        border: "none",
      },

      "& .MuiOutlinedInput-root": {
        ...theme.typography.ralewayRegular,
        lineHeight: "24px",
        borderRadius: theme.spacing(1),
        background: theme.palette.custom.white["100"],
        border: `1px solid ${theme.palette.custom.white["600"]}`,

        "&:hover": {
          borderColor: theme.palette.custom.grey["300"],
        },
        "&.Mui-focused": {
          borderColor: theme.palette.custom.orange["500"],
        },
        "&.Mui-error": {
          borderColor: theme.palette.error.main,
        },
        "& .MuiInputBase-input::placeholder": {
          color: theme.palette.custom.grey["300"],
          opacity: 1,
        },
      },

      "& .MuiFormLabel-root": {
        position: "static",
        transform: "none",
        ...theme.typography.ralewayRegular,
        color: theme.palette.custom.typography.black,
        fontSize: 18,
        margin: theme.spacing(0, 0, 1, 0),

        "& .MuiFormLabel-asterisk": {
          color: theme.palette.custom.error,
        },
      },

      "& .MuiFormHelperText-root": {
        ...theme.typography.ralewayRegular,
        marginLeft: 0,
        fontSize: 14,
      },
    },

    "& .MuiCheckbox-root": {
      width: 24,
      height: 24,
      border: `1px solid ${theme.palette.custom.white["600"]}`,
      borderRadius: theme.spacing(0.5),
      background: theme.palette.custom.white["100"],

      "&.Mui-checked svg": {
        color: theme.palette.custom.info,
      },
    },

    "& .MuiFormControlLabel-root": {
      display: "flex",
      alignItems: "center",
      gap: theme.spacing(2.25),
      margin: 0,

      "& .MuiCheckbox-root": {
        padding: 0,
      },

      "& .MuiTypography-body1": {
        ...theme.typography.ralewayRegular,
        fontSize: 18,
        fontStyle: "normal",
      },
    },

    "& .Registration-TermsLink": {
      textDecoration: "none",
      "& .MuiTypography-root": {
        color: theme.palette.custom.info,
      },
    },
  },
});
