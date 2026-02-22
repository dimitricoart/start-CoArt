import { InputLabelProps } from "@mui/material";

export const selectInputLabelProps: Partial<InputLabelProps> = {
  sx: theme => ({
    position: "static",
    transform: "none",
    marginBottom: theme.spacing(2),
    ...theme.typography.ralewayRegular,
    color: theme.palette.custom.typography.black,
    fontSize: 18,
  }),
};
