import { FC, ReactNode } from "react";

import { emptyStateString } from "../../../../libs/lexical-utils";
import { PageHeader } from "../../../../components/page-layout";
import { useApi } from "@framework/mui-form";
import {
  AssetOrientation,
  AssetType,
  CategoryType,
  IAssetCreateDto,
  MaterialType,
  StyleType,
  SubjectType,
  UnitType,
} from "@framework/types";

import { ROUTES } from "../../../../routes/routes";
import { StyledPageRoot } from "../../../../components/styled";
import { AssetFields } from "./fields";

export const AssetCreate: FC = () => {
  const api = useApi();

  const onSubmit = async (values: IAssetCreateDto) => {
    return api.fetchJson({
      url: "/assets",
      method: "POST",
      data: {
        ...values,
        artworkCreatedAt: values.artworkCreatedAt || null,
        artistName: values.artistName || null,
        photos: values.photos.map(p => ({ id: p.id, caption: p.caption, imageUrl: p.imageUrl })),
        documents: values.documents.map(d => ({ id: d.id, caption: d.caption, fileUrl: d.fileUrl })),
      },
    });
  };

  const initialValues: IAssetCreateDto = {
    title: "",
    description: emptyStateString,
    imageUrl: "",
    isCopyright: true,
    isConfirmed: false,
    artworkCreatedAt: new Date().toISOString(),
    artistName: "ME",
    assetType: AssetType.PHYSICAL,
    category: CategoryType.OTHER,
    subject: SubjectType.OTHER,
    style: StyleType.OTHER,
    material: MaterialType.OTHER,
    dimensions: {
      orientation: AssetOrientation.SQUARE,
      height: 40,
      width: 40,
      depth: 10,
      units: UnitType.CM,
    },
    photos: [],
    documents: [],
  };

  return (
    <StyledPageRoot component="section">
      <PageHeader
        message={`pages.dashboard.assets.create.title`}
        data={{ i: (value: ReactNode[]) => <i className="Page-HeaderTitle">{value}</i> }}
      />
      <AssetFields initialValues={initialValues} onSubmit={onSubmit} redirect={ROUTES.DASHBOARD} />
    </StyledPageRoot>
  );
};
