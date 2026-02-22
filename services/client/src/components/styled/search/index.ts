import { FormControl, FormControlProps, styled } from "@mui/material";

export const StyledSearchRoot = styled(FormControl, {
  shouldForwardProp: prop => prop !== "$isHeader",
})<FormControlProps & { $isHeader?: boolean }>(({ theme, $isHeader = true }) => ({
  width: $isHeader ? "85%" : "100%",
  background: theme.palette.custom.white["100"],
  padding: theme.spacing(1.75, 3),
  borderRadius: "100px",

  "& .MuiIconButton-root": {
    padding: 0,
    width: 20,
    height: 20,
  },

  "& .Search-StartAdornment": {
    marginRight: theme.spacing(1),
  },

  "& .Search-EndAdornment": {
    color: theme.palette.custom.info,
    marginLeft: theme.spacing(1),
  },

  "& .MuiInputBase-root": {
    overflow: "hidden",
    flex: 1,
    minWidth: 0,

    "& .MuiInputBase-input": {
      ...theme.typography.ralewayRegular,
      width: "100%",
      whiteSpace: "nowrap",
      textOverflow: "ellipsis",
      padding: 0,
    },
  },
}));
