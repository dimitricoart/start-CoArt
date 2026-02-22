import { FC } from "react";

import { IShowroom, IShowroomSearchDto } from "@framework/types";
import { useFetchQuery } from "@framework/mui-form";
import { ProgressOverlay } from "../../page-layout";

import { ShowroomGrid } from "../../../pages/showroom/list/grid";
import { StyledPagination } from "../../pagination";

interface IShowroomTabComponentProps {
  merchantId?: string;
}

export const ShowroomTabComponent: FC<IShowroomTabComponentProps> = ({ merchantId }) => {
  const {
    data: showrooms,
    isLoading,
    skip,
    take,
    onChangePage,
  } = useFetchQuery<IShowroom, Partial<IShowroomSearchDto>>("showrooms", { merchantId });

  return (
    <ProgressOverlay isLoading={isLoading}>
      <ShowroomGrid showrooms={showrooms?.rows || []} />

      {!!showrooms?.count && (
        <StyledPagination
          shape="rounded"
          page={skip / take + 1}
          count={Math.ceil(showrooms.count / take)}
          onChange={onChangePage}
        />
      )}
    </ProgressOverlay>
  );
};
