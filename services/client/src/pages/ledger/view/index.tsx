import { FC } from "react";
import { Grid } from "@mui/material";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";

import { ProgressOverlay } from "../../../components/page-layout";
import { useApi } from "@framework/mui-form";
import { ILedger } from "@framework/types";

import { StyledPageRoot } from "../../../components/styled";
import { CONTENT_WIDTH } from "../../../shared";
import { AboutTabContent, ButtonTabs, DocumentsTabContent, ShippingTabContent } from "../../../components/tabs";
import { ProvenanceTabContent } from "../../asset/components";
import { AssetViewHeader } from "../../asset/view/header";
import { BackButton } from "../../../components/buttons";

export const LedgerView: FC = () => {
  const { ledgerId } = useParams<{ ledgerId: string }>();

  const api = useApi();

  const {
    data: ledger,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["ledger"],
    queryFn: (): Promise<ILedger> => {
      return api.fetchJson({
        url: `/ledger/${ledgerId}`,
      });
    },
  });

  if (!ledger) {
    return null;
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

      <ProgressOverlay isLoading={isLoading}>
        <AssetViewHeader asset={ledger.asset!} refetch={refetch} />

        <ButtonTabs
          sx={{ mt: 10 }}
          defaultValue="asset.about"
          options={["asset.about", "asset.provenance", "asset.shipping", "asset.download"]}
          content={{
            "asset.about": <AboutTabContent description={ledger.asset!.description} />,
            "asset.provenance": (
              <ProvenanceTabContent merchantId={ledger.asset!.merchant!.id} assetId={ledger.asset!.id} />
            ),
            "asset.shipping": <ShippingTabContent />,
            "asset.download": <DocumentsTabContent documents={ledger.asset!.documents || []} />,
          }}
        />
      </ProgressOverlay>
    </StyledPageRoot>
  );
};
