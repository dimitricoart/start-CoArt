import { FC } from "react";
import { Link as RouterLink } from "react-router";
import { Box, CardActionArea, CardContent, CardMedia, Typography } from "@mui/material";

import type { IShowroom } from "@framework/types";
import { Display } from "../../../components/lexical-display";

import { ROUTES } from "../../../routes/routes";
import { StyledCardRoot } from "../../../components/styled";

interface IShowroomCardProps {
  showroom: IShowroom;
}

export const ShowroomCard: FC<IShowroomCardProps> = props => {
  const { showroom } = props;

  return (
    <StyledCardRoot elevation={0}>
      <CardActionArea component={RouterLink} to={ROUTES.SHOWROOM_VIEW.replace(":showroomId", showroom.id.toString())}>
        <CardMedia sx={{ height: 250 }} image={showroom.imageUrl} title={showroom.title} />
        <CardContent sx={{ height: "calc(100% - 250px)" }}>
          <Typography variant="ralewayMedium" color="custom.typography.black" component="h5" pr={2}>
            {showroom.title}
          </Typography>
          <Box
            sx={{
              fontSize: "0.875rem",
              lineHeight: 1.4,
              textAlign: "left",
              "& .MuiTypography-root": { fontSize: "inherit", fontWeight: 400 },
            }}
          >
            <Display data={showroom?.subtitle} />
          </Box>
        </CardContent>
      </CardActionArea>
    </StyledCardRoot>
  );
};
