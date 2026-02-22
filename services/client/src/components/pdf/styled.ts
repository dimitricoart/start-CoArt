import { Box, keyframes, Stack, styled } from "@mui/material";

const pulse = keyframes`
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
`;

export const StyledPdfPlaceholderRoot = styled(Box)(({ theme }) => ({
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",

  overflowY: "auto",
  border: `1px solid ${theme.palette.common.black}`,
  borderRadius: theme.spacing(3.75),

  padding: theme.spacing(2),

  [theme.breakpoints.up("md")]: {
    height: 500,
  },

  "& .PdfPlaceholder-link": {
    textDecoration: "none",
    color: theme.palette.custom.info,
  },
}));

export const StyledDocumentPrepareRoot = styled(Stack)(() => ({
  animation: `${pulse} 2s ease-in-out infinite`,
}));

export const StyledDocumentConditionsRoot = styled(Stack)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: theme.spacing(0.5),
  minHeight: 460,

  "& .MuiCircularProgress-colorPrimary": {
    color: theme.palette.custom.orange["500"],
  },

  "& .ErrorIcon-box": {
    width: 28,
    height: 28,
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",

    path: {
      fill: theme.palette.custom.error,
    },
  },
}));

export const StyledRoot = styled(Stack)(({ theme }) => ({
  position: "relative",
  border: `1px solid ${theme.palette.common.black}`,
  borderRadius: theme.spacing(3.75),
  overflow: "hidden",
}));

export const StyledDocumentContainer = styled(Box)(({ theme }) => ({
  height: 600,
  overflowY: "auto",
  overflowX: "hidden",
  scrollBehavior: "smooth",
  display: "flex",
  justifyContent: "center",

  "&::-webkit-scrollbar": {
    width: 8,
  },
  "&::-webkit-scrollbar-track": {
    borderRadius: 4,
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: theme.palette.custom.orange["500"],
    width: 16,
    borderRadius: 4,
  },
  "&::-webkit-scrollbar-thumb:hover": {
    backgroundColor: theme.palette.custom.orange["600"],
  },

  scrollbarWidth: "auto",
  scrollbarGutter: "10px",
  scrollbarColor: `${theme.palette.custom.orange["500"]} transparent`,
}));

export const StyledPageIndicator = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: 5,
  right: 20,
  zIndex: 10,
  padding: theme.spacing(0.25, 0.5),
  background: theme.palette.custom.white["300"],
  borderRadius: 10,
}));

export const StyledScrollToEndIndicator = styled(Box)(({ theme }) => ({
  position: "absolute",
  bottom: 10,
  left: "50%",
  transform: "translateX(-50%)",
  zIndex: 10,
  padding: theme.spacing(1, 2),
  borderRadius: theme.spacing(2.5),
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(1),
  background: theme.palette.custom.orange["500"],
  cursor: "pointer",

  ...theme.typography.ralewayRegular,
  color: theme.palette.custom.white["100"],

  animation: `${pulse} 2s ease-in-out infinite`,
}));
