import { FC, Fragment } from "react";
import { Card, CardContent, Skeleton } from "@mui/material";

export const SkeletonCard: FC = () => {
  return (
    <Card>
      <Skeleton sx={{ height: 250 }} animation="wave" variant="rectangular" />
      <CardContent>
        <Fragment>
          <Skeleton animation="wave" height={10} />
          <Skeleton animation="wave" height={10} />
        </Fragment>
      </CardContent>
    </Card>
  );
};
