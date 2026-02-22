import { FC } from "react";
import { Link as RouterLink } from "react-router";
import { CardActionArea, CardContent, CardMedia, Typography } from "@mui/material";

import { IShowroom } from "@framework/types";

import { ROUTES } from "../../../../routes/routes";
import { StyledCardRoot } from "../../../../components/styled";

interface IShowroomCardProps {
  showroom: IShowroom;
  showDescription?: boolean;
}

export const ShowroomCard: FC<IShowroomCardProps> = props => {
  const { showroom } = props;

  return (
    <StyledCardRoot elevation={0}>
      <CardActionArea
        component={RouterLink}
        to={ROUTES.DASHBOARD_SHOWROOM_UPDATE.replace(":showroomId", showroom.id.toString())}
      >
        <CardMedia sx={{ height: 250 }} image={showroom.imageUrl} title={showroom.title} />
        <CardContent>
          <Typography variant="ralewayMedium" fontSize={24} component="h4" mb={0.75}>
            {showroom.title}
          </Typography>
        </CardContent>
      </CardActionArea>
    </StyledCardRoot>
  );
};
