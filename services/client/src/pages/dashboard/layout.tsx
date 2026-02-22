import { FC } from "react";
import { Navigate, Outlet, useLocation } from "react-router";
import { Grid } from "@mui/material";

import { Protected } from "../../components/protected";

import { DashboardTabs } from "./menu";
import { StyledRoot } from "./styled";
import { ROUTES } from "../../routes/routes";

export const DashboardLayout: FC = () => {
  const location = useLocation();

  if (location.pathname === ROUTES.DASHBOARD) {
    return <Navigate to={ROUTES.DASHBOARD_MERCHANT_UPDATE} replace />;
  }

  return (
    <Protected>
      <StyledRoot>
        <Grid container size={12} spacing={3}>
          <Grid size={{ md: 3 }}>
            <DashboardTabs />
          </Grid>
          <Grid size={{ md: 9 }}>
            <Outlet />
          </Grid>
        </Grid>
      </StyledRoot>
    </Protected>
  );
};
