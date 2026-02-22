import { FC, useEffect } from "react";
import { FormattedMessage } from "react-intl";
import { Grid, Typography } from "@mui/material";
import { useLocation, useNavigate, useParams } from "react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import { useUser } from "../../libs/providers/user-provider";
import { useApi } from "@framework/mui-form";
import { useDidMountEffect } from "../../libs/use-did-mount-effect";

import { ROUTES } from "../../routes/routes";
import { StyledAuthRoot } from "../auth/styled";
import { PageHeader } from "../../components/page-header";
import { PaywallForm } from "./form";

export const Paywall: FC = () => {
  const { offerId } = useParams<{ offerId: string }>();
  const api = useApi();
  const user = useUser();
  const navigate = useNavigate();
  const location = useLocation();
  const queryClient = useQueryClient();

  const { data: wallet } = useQuery({
    queryKey: ["wallet"],
    queryFn: async () => {
      return api.fetchJson({
        url: "/wallet",
      });
    },
    retry: false,
  });

  useDidMountEffect(() => {
    // TODO need to return user back to this page after login
    if (!user.profile) {
      void navigate(ROUTES.LOGIN);
    }

    if (!wallet) {
      void navigate(ROUTES.DASHBOARD_WALLET, {
        state: {
          redirectUrl: location.pathname,
        },
      });
    }
  }, [wallet]);

  useEffect(() => {
    return () => {
      void queryClient.removeQueries({ queryKey: ["wallet"] });
    };
  }, []);

  return (
    <StyledAuthRoot container size={12} spacing={4.5} flexDirection="column">
      <Grid size={{ sm: 12 }}>
        <PageHeader message="pages.paywall.title" />
        <Typography
          component="h6"
          variant="ralewayRegular"
          lineHeight="24px"
          color="custom.typography.semiBlack"
          mt={3}
          mb={3}
          textAlign="center"
        >
          <FormattedMessage id="pages.paywall.subtitle" />
        </Typography>

        <PaywallForm offerId={offerId} />
      </Grid>
    </StyledAuthRoot>
  );
};
