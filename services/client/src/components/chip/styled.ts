import { Chip as MuiChip, ChipProps as MuiChipProps, styled } from "@mui/material";

export type ChipStatus = "pending" | "declined" | "approved" | "rejected" | "finalized";

export const StyledChip = styled(MuiChip, { shouldForwardProp: prop => prop !== "$status" })<
  MuiChipProps & { $status: ChipStatus }
>(({ theme, $status }) => ({
  ...theme.typography.ralewayMedium,
  fontSize: 18,
  maxWidth: 175,
  minHeight: 46,
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-start",
  color: theme.palette.custom.white["100"],
  gap: theme.spacing(1),
  padding: theme.spacing(2, 3.5),
  background: theme.palette.custom.chip[$status],
  borderRadius: theme.spacing(2.5),

  "& .MuiChip-label": {
    padding: 0,
  },
}));
