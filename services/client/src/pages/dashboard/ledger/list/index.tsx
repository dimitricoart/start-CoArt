import { FC } from "react";

import { PageHeader, ProgressOverlay } from "../../../../components/page-layout";
import { useFetchQuery } from "@framework/mui-form";
import { ILedger, ILedgerSearchDto, IUser } from "@framework/types";
import { defaultItemsPerPage } from "@framework/constants";
import { useUser } from "../../../../libs/providers/user-provider";

import { LedgerGrid } from "./grid";
import { StyledPagination } from "../../../../components/pagination";
import { StyledPageRoot } from "../../../../components/styled";
import { EmptyList } from "../../../../components/empty";

export const LedgerList: FC = () => {
  const user = useUser<IUser>();
  const {
    data: ledgers,
    isLoading,
    skip,
    take,
    onChangePage,
  } = useFetchQuery<ILedger, Partial<ILedgerSearchDto>>("ledger", { merchantId: user.profile.merchant?.id });

  return (
    <StyledPageRoot component="section">
      <PageHeader sx={{ margin: 0, mb: 4 }} message="pages.dashboard.ledger.list.title" />

      <ProgressOverlay isLoading={isLoading}>
        {ledgers?.data?.length ? <LedgerGrid ledgers={ledgers.data} isDashBoard /> : <EmptyList />}
        {!!ledgers?.total && ledgers?.total > defaultItemsPerPage && (
          <StyledPagination
            shape="rounded"
            page={skip / take + 1}
            count={Math.ceil(ledgers.total / take)}
            onChange={onChangePage}
          />
        )}
      </ProgressOverlay>
    </StyledPageRoot>
  );
};
