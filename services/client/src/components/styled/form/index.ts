import { Theme } from "@mui/material";
import { CSSProperties } from "react";

export interface IFormStyles {
  [key: string]: CSSProperties | IFormStyles;
}

export const formStyles = (theme: Theme): IFormStyles => ({
  "& .FormWrapper-root": {
    "& .InputBox-root": {
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

        "& .MuiFormLabel-asterisk": {
          color: theme.palette.custom.error,
        },
      },
    },

    "& .MuiFormControl-root": {
      margin: 0,
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
      },

      "& .editor-container": {
        "& .editor-toolbar": {
          background: theme.palette.custom.white["100"],
        },

        "& .editor-scroller": {
          background: theme.palette.custom.white["100"],
          borderRadius: theme.spacing(0, 0, 1.25, 1.25),

          "& .ContentEditable__root": {
            padding: theme.spacing(1, 2),
            ...theme.typography.ralewayRegular,
            lineHeight: "24px",
          },

          "& .ContentEditable__placeholder": {
            ...theme.typography.ralewayRegular,
            lineHeight: "24px",
            color: theme.palette.custom.grey["300"],
            overflow: "hidden",
            position: "absolute",
            textOverflow: "ellipsis",
            top: "8px",
            left: "16px",
            right: "28px",
            userSelect: "none",
            whiteSpace: "nowrap",
            display: "inline-block",
            pointerEvents: "none",
          },
        },
      },
    },

    "& .GalleryInput": {
      "& .MuiFormLabel-root": {
        ...theme.typography.ralewayRegular,
        color: theme.palette.custom.typography.black,
        fontSize: 18,

        "& .MuiFormLabel-asterisk": {
          color: theme.palette.custom.error,
        },
      },

      "& .MuiFormHelperText-root": {
        ...theme.typography.ralewayRegular,
      },
    },

    "& .MuiError": {
      "& .editor-container": {
        border: "1px solid red",
        borderRadius: 10,
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

    "& .MuiPickersTextField-root": {
      margin: 0,

      "& .MuiPickersOutlinedInput-root": {
        ...theme.typography.ralewayRegular,
        lineHeight: "24px",
        borderRadius: theme.spacing(1),
        background: theme.palette.custom.white["100"],
        paddingRight: theme.spacing(2),

        "& .MuiPickersOutlinedInput-notchedOutline": {
          border: "none",
        },

        "& :hover .MuiPickersOutlinedInput-notchedOutline": {
          border: "none",
        },

        "&.Mui-error": {
          border: `1px solid ${theme.palette.error.main}`,
        },
      },
      "& .MuiFormLabel-root": {
        ...theme.typography.ralewayRegular,
        color: theme.palette.custom.typography.black,
        fontSize: 18,
        position: "static",
        transform: "none",
      },
    },

    "& .AssetForm-ImageInput": {
      marginTop: theme.spacing(4),
    },

    "& .ShowroomUpdate-SubmitButton, .AssetCreate-SubmitButton, .OfferCreate-SubmitButton, .Profile-SubmitButton, .MerchantUpdate-SubmitButton,":
      {
        marginTop: theme.spacing(4.5),
      },

    "& .Profile-SubmitButton": {
      [theme.breakpoints.down("sm")]: {
        minWidth: "100%",
      },
    },
  },
});
