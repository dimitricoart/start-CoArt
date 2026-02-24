import { FC } from "react";

import { PageHeader, ProgressOverlay } from "../../../../components/page-layout";
import { useFetchQuery } from "@framework/mui-form";
import { IMerchant } from "@framework/types";
import { defaultItemsPerPage } from "@framework/constants";
import type { IPaginationDto } from "@framework/types";

import { MerchantGrid } from "./grid";
import { StyledPagination } from "../../../../components/pagination";
import { StyledPageRoot } from "../../../../components/styled";
import { EmptyList } from "../../../../components/empty";

export const MerchantList: FC = () => {
  const {
    data: merchants,
    isLoading,
    skip,
    take,
    onChangePage,
  } = useFetchQuery<IMerchant, Partial<IPaginationDto>>("merchants");

  return (
    <StyledPageRoot component="section">
      <PageHeader sx={{ margin: 0, mb: 4 }} message="pages.dashboard.merchants.list.title" />

      <ProgressOverlay isLoading={isLoading}>
        {merchants?.data?.length ? <MerchantGrid merchants={merchants.data} isDashBoard /> : <EmptyList />}
        {!!merchants?.total && merchants?.total > defaultItemsPerPage && (
          <StyledPagination
            shape="rounded"
            page={skip / take + 1}
            count={Math.ceil(merchants.total / take)}
            onChange={onChangePage}
          />
        )}
      </ProgressOverlay>
    </StyledPageRoot>
  );
};
