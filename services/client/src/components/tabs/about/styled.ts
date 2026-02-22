import { Box, styled } from "@mui/material";

import { sizeDecreaseCalc } from "../../../utils/sizeDecrease";

export const StyledAboutRoot = styled(Box)(({ theme }) => ({
  "& .editor-input": {
    ...theme.typography.ralewayRegular,
    fontSize: sizeDecreaseCalc(22, 15),
    lineHeight: sizeDecreaseCalc(34, 25, "px"),
  },
})) as typeof Box;
