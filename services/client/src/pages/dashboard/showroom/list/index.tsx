import { FC } from "react";
import { FormattedMessage } from "react-intl";
import { Link as RouterLink } from "react-router";

import { PageHeader, ProgressOverlay } from "../../../../components/page-layout";
import { useFetchQuery } from "@framework/mui-form";
import { type IShowroom, type IShowroomSearchDto, type IUser, UserRole } from "@framework/types";
import { defaultItemsPerPage } from "@framework/constants";
import { useUser } from "../../../../libs/providers/user-provider";

import { MerchantGrid } from "./grid";
import { StyledPagination } from "../../../../components/pagination";
import { StyledPageRoot } from "../../../../components/styled";
import { EmptyList } from "../../../../components/empty";
import { Button } from "../../../../components/buttons";
import { ROUTES } from "../../../../routes/routes";

export const ShowroomList: FC = () => {
  const user = useUser<IUser>();

  const {
    data: showrooms,
    isLoading,
    skip,
    take,
    onChangePage,
  } = useFetchQuery<IShowroom, Partial<IShowroomSearchDto>>("showrooms", {
    displayEmpty: true,
    merchantId: user.profile.merchant?.id,
  });

  return (
    <StyledPageRoot component="section">
      <PageHeader sx={{ margin: 0, mb: 4 }} message="pages.dashboard.showrooms.list.title">
        {user.profile.userRoles.includes(UserRole.SUPER) ? (
          <Button
            className="ShowroomList-CreateButton"
            component={RouterLink}
            variant="contained"
            to={ROUTES.DASHBOARD_SHOWROOM_CREATE}
          >
            <FormattedMessage id="form.buttons.create" />
          </Button>
        ) : null}
      </PageHeader>

      <ProgressOverlay isLoading={isLoading}>
        {showrooms?.data?.length ? <MerchantGrid showrooms={showrooms.data} isDashBoard /> : <EmptyList />}
        {!!showrooms?.total && showrooms?.total > defaultItemsPerPage && (
          <StyledPagination
            shape="rounded"
            page={skip / take + 1}
            count={Math.ceil(showrooms.total / take)}
            onChange={onChangePage}
          />
        )}
      </ProgressOverlay>
    </StyledPageRoot>
  );
};
