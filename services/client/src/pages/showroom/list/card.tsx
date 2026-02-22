import { FC } from "react";
import { Link as RouterLink } from "react-router";
import { CardActionArea, CardContent, CardMedia, Typography } from "@mui/material";

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
          <Display data={showroom?.subtitle} />
        </CardContent>
      </CardActionArea>
    </StyledCardRoot>
  );
};
