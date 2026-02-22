import { FC } from "react";

import { PageHeader, ProgressOverlay } from "../../../../components/page-layout";
import { IAsset, IAssetSearchDto } from "@framework/types";
import { useFetchQuery } from "@framework/mui-form";
import { defaultItemsPerPage } from "@framework/constants";

import { AssetGrid } from "../list/grid";
import { StyledPagination } from "../../../../components/pagination";
import { StyledPageRoot } from "../../../../components/styled";
import { EmptyList } from "../../../../components/empty";

export const AssetValidation: FC = () => {
  const {
    data: assets,
    isLoading,
    skip,
    take,
    onChangePage,
  } = useFetchQuery<IAsset, Partial<IAssetSearchDto>>("assets/new");

  return (
    <StyledPageRoot>
      <PageHeader message="pages.asset.validate.title" />

      <ProgressOverlay isLoading={isLoading}>
        {assets?.rows.length ? <AssetGrid assets={assets.rows} isDashBoard /> : <EmptyList />}

        {!!assets?.count && assets?.count > defaultItemsPerPage && (
          <StyledPagination
            shape="rounded"
            page={skip / take + 1}
            count={Math.ceil(assets.count / take)}
            onChange={onChangePage}
          />
        )}
      </ProgressOverlay>
    </StyledPageRoot>
  );
};
