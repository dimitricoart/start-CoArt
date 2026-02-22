import { FC } from "react";
import { Grid } from "@mui/material";
import { Navigate, useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";

import { ProgressOverlay } from "../../../components/page-layout";
import { useApi } from "@framework/mui-form";
import { AssetStatus, IAsset, UserRole } from "@framework/types";
import { useUser } from "../../../libs/providers/user-provider";

import { StyledPageRoot } from "../../../components/styled";
import { CONTENT_WIDTH } from "../../../shared";
import { AboutTabContent, ButtonTabs, DocumentsTabContent, ShippingTabContent } from "../../../components/tabs";
import { ProvenanceTabContent } from "../components";
import { AssetViewHeader } from "./header";
import { BackButton } from "../../../components/buttons";
import { AssetAlert } from "./alert";

export const AssetView: FC = () => {
  const { assetId } = useParams<{ assetId: string }>();
  const user = useUser<IUser>();

  const api = useApi();

  const {
    data: asset,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["asset"],
    queryFn: (): Promise<IAsset> => {
      return api.fetchJson({
        url: `/assets/${assetId}`,
      });
    },
  });

  if (!asset) {
    return null;
  }

  // only owner or super admin can see unfinalized assets
  if (asset.assetStatus !== AssetStatus.FINALIZED) {
    if (!(user.profile.merchant?.id === asset.merchant?.id || user.profile.userRoles.includes(UserRole.SUPER))) {
      return <Navigate to="/message/page-not-found" />;
    }
  }

  return (
    <StyledPageRoot
      sx={theme => ({
        width: CONTENT_WIDTH,
        margin: "0 auto",
        [theme.breakpoints.down("md")]: {
          width: "100%",
          margin: 0,
        },
      })}
      component="main"
    >
      <Grid size={12} mb={5}>
        <BackButton />
      </Grid>

      <AssetAlert asset={asset} />

      <ProgressOverlay isLoading={isLoading}>
        <AssetViewHeader asset={asset} refetch={refetch} />

        <ButtonTabs
          sx={{ mt: 10 }}
          defaultValue="asset.about"
          options={["asset.about", "asset.provenance", "asset.shipping", "asset.download"]}
          content={{
            "asset.about": <AboutTabContent description={asset.description} />,
            "asset.provenance": <ProvenanceTabContent merchantId={asset.merchant!.id} assetId={asset.id} />,
            "asset.shipping": <ShippingTabContent />,
            "asset.download": <DocumentsTabContent documents={asset.documents || []} />,
          }}
        />
      </ProgressOverlay>
    </StyledPageRoot>
  );
};
