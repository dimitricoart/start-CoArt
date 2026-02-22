import { Box, keyframes, styled } from "@mui/material";

const jump = keyframes`
  0%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-8px);
  }
`;

export const LoadingDotsContainer = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: "24px",
}) as typeof Box;

export const LoadingDot = styled("div")(({ theme }) => ({
  width: "8px",
  height: "8px",
  margin: "0 2px",
  backgroundColor: theme.palette.common.white,
  borderRadius: "50%",
  animation: `${jump} 1.4s infinite ease-in-out both`,
  "&:nth-of-type(1)": {
    animationDelay: "-0.32s",
  },
  "&:nth-of-type(2)": {
    animationDelay: "-0.16s",
  },
  "&:nth-of-type(3)": {
    animationDelay: "0s",
  },
  "&:nth-of-type(4)": {
    animationDelay: "0.16s",
  },
}));
