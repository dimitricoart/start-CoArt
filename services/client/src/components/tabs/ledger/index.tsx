import { FC } from "react";

import { ILedger, ILedgerSearchDto } from "@framework/types";
import { useFetchQuery } from "@framework/mui-form";
import { ProgressOverlay } from "../../page-layout";

import { LedgerGrid } from "../../../pages/dashboard/ledger/list/grid";
import { StyledPagination } from "../../pagination";

interface ILedgerTabComponentProps {
  showroomId?: string;
}

export const LedgerTabComponent: FC<ILedgerTabComponentProps> = ({ showroomId }) => {
  const {
    data: ledgers,
    isLoading,
    skip,
    take,
    onChangePage,
  } = useFetchQuery<ILedger, Partial<ILedgerSearchDto>>("ledger", { showroomId });

  return (
    <ProgressOverlay isLoading={isLoading}>
      <LedgerGrid ledgers={ledgers?.rows || []} />

      {!!ledgers?.count && (
        <StyledPagination
          shape="rounded"
          page={skip / take + 1}
          count={Math.ceil(ledgers.count / take)}
          onChange={onChangePage}
        />
      )}
    </ProgressOverlay>
  );
};
