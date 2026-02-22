import { FC } from "react";
import { FormattedMessage } from "react-intl";
import { Link as RouterLink } from "react-router";

import { PageHeader, ProgressOverlay } from "../../../../components/page-layout";
import { IAsset, IAssetSearchDto, UserRole } from "@framework/types";
import { useFetchQuery } from "@framework/mui-form";
import { defaultItemsPerPage } from "@framework/constants";
import { useUser } from "../../../../libs/providers/user-provider";

import { AssetGrid } from "./grid";
import { StyledPagination } from "../../../../components/pagination";
import { StyledPageRoot } from "../../../../components/styled";
import { Button } from "../../../../components/buttons";
import { ROUTES } from "../../../../routes/routes";
import { EmptyList } from "../../../../components/empty";

export const AssetList: FC = () => {
  const user = useUser();

  const {
    data: assets,
    isLoading,
    skip,
    take,
    onChangePage,
  } = useFetchQuery<IAsset, Partial<IAssetSearchDto>>("assets");

  return (
    <StyledPageRoot>
      <PageHeader message="pages.dashboard.assets.uploads.title">
        {user.profile.userRoles.includes(UserRole.SUPER) ? (
          <Button
            className="AssetList-CreateButton"
            component={RouterLink}
            variant="contained"
            to={ROUTES.DASHBOARD_ASSET_CREATE}
          >
            <FormattedMessage id="form.buttons.create" />
          </Button>
        ) : null}
      </PageHeader>

      <ProgressOverlay isLoading={isLoading}>
        {assets?.data?.length ? <AssetGrid assets={assets.data} isDashBoard /> : <EmptyList />}
        {!!assets?.total && assets.total > defaultItemsPerPage && (
          <StyledPagination
            shape="rounded"
            page={skip / take + 1}
            count={Math.ceil(assets.total / take)}
            onChange={onChangePage}
          />
        )}
      </ProgressOverlay>
    </StyledPageRoot>
  );
};
