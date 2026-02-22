import { FC } from "react";

import { PageHeader, ProgressOverlay } from "../../../components/page-layout";
import { useFetchQuery } from "@framework/mui-form";
import type { IFavorite } from "@framework/types";
import { defaultItemsPerPage } from "@framework/constants";

import { AssetGrid } from "../assets/list/grid";
import { StyledPagination } from "../../../components/pagination";
import { StyledPageRoot } from "../../../components/styled";
import { EmptyList } from "../../../components/empty";

export const Favorites: FC = () => {
  const { data: favorites, isLoading, skip, take, onChangePage } = useFetchQuery<IFavorite>("favorites");

  return (
    <StyledPageRoot>
      <PageHeader sx={{ margin: 0, mb: 4 }} message="pages.dashboard.favorites.title" />

      <ProgressOverlay isLoading={isLoading}>
        {favorites?.rows.length ? (
          <AssetGrid assets={favorites.rows.map(favorite => favorite.asset!)} isDashBoard />
        ) : (
          <EmptyList />
        )}

        {!!favorites?.count && favorites?.count > defaultItemsPerPage && (
          <StyledPagination
            shape="rounded"
            page={skip / take + 1}
            count={Math.ceil(favorites.count / take)}
            onChange={onChangePage}
          />
        )}
      </ProgressOverlay>
    </StyledPageRoot>
  );
};
