import { Alert, alpha, styled } from "@mui/material";

export const StyledAlert = styled(Alert)(({ theme }) => ({
  padding: theme.spacing(1.25, 2.5),
  borderRadius: theme.spacing(2.5),

  "& .MuiAlertTitle-root": {
    display: "flex",
    alignItems: "center",
    gap: theme.spacing(1.25),
    ...theme.typography.ralewayMedium,
    fontSize: 22,
  },

  "& .MuiAlertDescription-root": {
    ...theme.typography.ralewayRegular,
    fontSize: 17,
    lineHeight: "27px",
  },

  "&.MuiAlert-colorError": {
    background: alpha(theme.palette.custom.alert.error, 0.05),
    border: `1px solid ${theme.palette.custom.alert.error}`,

    path: {
      fill: theme.palette.custom.alert.error,
    },
  },

  "&.MuiAlert-colorWarning": {
    background: alpha(theme.palette.custom.alert.warning, 0.05),
    border: `1px solid ${theme.palette.custom.alert.warning}`,

    path: {
      fill: theme.palette.custom.alert.warning,
    },
  },
}));
