import { FC, ReactNode, useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Navigate, useNavigate, useParams } from "react-router";

import { useApi } from "@framework/mui-form";
import { PageHeader, ProgressOverlay } from "../../../../components/page-layout";
import { AssetStatus, IAsset, IOfferCreateDto } from "@framework/types";

import { OfferCreateForm } from "./form";
import { ROUTES } from "../../../../routes/routes";
import { StyledPageRoot } from "../../../../components/styled";

export const OfferCreate: FC = () => {
  const { assetId } = useParams<{ assetId: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const api = useApi();

  const { data: asset, isLoading } = useQuery({
    queryKey: ["assets", assetId],
    queryFn: (): Promise<IAsset> => {
      return api.fetchJson({
        url: `/assets/${assetId}`,
      });
    },
    enabled: true,
    refetchOnMount: "always",
  });

  const { mutateAsync: handleSubmit } = useMutation({
    mutationFn: async (values: IOfferCreateDto) => {
      return api.fetchJson({
        url: "/offers",
        method: "POST",
        data: values,
      });
    },
    onSuccess: () => {
      void navigate(ROUTES.DASHBOARD);
    },
  });

  useEffect(() => {
    return () => {
      queryClient.removeQueries({ queryKey: ["assets", assetId] });
    };
  }, [assetId]);

  if (!assetId) {
    return <Navigate to={ROUTES.DASHBOARD_LEDGER_LIST} replace />;
  }

  if (asset?.assetStatus === AssetStatus.REJECTED) {
    return <Navigate to={ROUTES.MESSAGE.replace(":message", asset?.assetStatus.toLowerCase())} replace />;
  }

  if (
    asset?.assetStatus === AssetStatus.NEW ||
    asset?.assetStatus === AssetStatus.APPROVED ||
    asset?.assetStatus === AssetStatus.DECLINED
  ) {
    return <Navigate to={ROUTES.DASHBOARD_ASSET_UPDATE.replace(":assetId", asset.id)} replace />;
  }

  return (
    <StyledPageRoot component="section">
      <PageHeader
        message="pages.dashboard.offer.create.title"
        data={{ i: (value: ReactNode[]) => <i className="Page-HeaderTitle">{value}</i> }}
      />

      <ProgressOverlay isLoading={isLoading}>
        {asset ? (
          <OfferCreateForm
            initialValues={{ price: 0, fractions: asset?.fractions, assetId: asset?.id }}
            onSubmit={handleSubmit}
            redirect={ROUTES.ASSET_VIEW.replace(":assetId", asset.id.toString())}
          />
        ) : null}
      </ProgressOverlay>
    </StyledPageRoot>
  );
};
