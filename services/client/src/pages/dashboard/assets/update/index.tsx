import { FC, ReactNode } from "react";
import { Navigate, useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";

import { PageHeader, ProgressOverlay } from "../../../../components/page-layout";
import { useApi } from "@framework/mui-form";
import { AssetStatus, IAsset, IAssetUpdateDto } from "@framework/types";

import { ROUTES } from "../../../../routes/routes";
import { StyledPageRoot } from "../../../../components/styled";
import { AssetFields } from "../create/fields";

export const AssetUpdate: FC = () => {
  const { assetId: assetId } = useParams<{ assetId: string }>();

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

  const onSubmit = async (values: IAssetUpdateDto) => {
    return api.fetchJson({
      url: `/assets/${assetId}`,
      method: "PUT",
      data: {
        ...values,
        artworkCreatedAt: values.artworkCreatedAt || null,
        artistName: values.artistName || null,
        photos: values.photos.map(p => ({ id: p.id, caption: p.caption, imageUrl: p.imageUrl })),
        documents: values.documents.map(d => ({ id: d.id, caption: d.caption, fileUrl: d.fileUrl })),
      },
    });
  };

  if (asset?.assetStatus === AssetStatus.FINALIZED || asset?.assetStatus === AssetStatus.REJECTED) {
    return <Navigate to={ROUTES.MESSAGE.replace(":message", asset?.assetStatus.toLowerCase())} replace />;
  }

  const initialValues: IAssetUpdateDto = {
    ...(asset as Required<IAsset>),
    isConfirmed: false,
  };

  if (!asset) {
    return null;
  }

  return (
    <StyledPageRoot component="section">
      <PageHeader
        message={`pages.dashboard.assets.${assetId ? "update" : "create"}.title`}
        data={{ i: (value: ReactNode[]) => <i className="Page-HeaderTitle">{value}</i> }}
      />
      <ProgressOverlay isLoading={isLoading}>
        <AssetFields initialValues={initialValues} onSubmit={onSubmit} redirect={ROUTES.DASHBOARD} />
      </ProgressOverlay>
    </StyledPageRoot>
  );
};
