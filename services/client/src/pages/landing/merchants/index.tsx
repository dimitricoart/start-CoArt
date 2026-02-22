import { FC, ReactNode } from "react";
import { Link as RouterLink } from "react-router";
import { useMediaQuery } from "@mui/material";

import { ProgressOverlay } from "../../../components/page-layout";
import type { IMerchant } from "@framework/types";
import { useFetchQuery } from "@framework/mui-form";

import { ROUTES } from "../../../routes/routes";
import { ShowMoreButton } from "../../../components/buttons";
import { ButtonArrowIcon } from "../../../shared";
import { StyledCardsBlockRoot } from "../styled";
import { PageHeader } from "../../../components/page-header";
import { EmptyList } from "../../../components/empty";
import { MerchantGrid } from "../../merchant/list/grid";

export const Merchants: FC = () => {
  const isLg = useMediaQuery(theme => theme.breakpoints.down("lg"));

  const { data: merchants, isLoading } = useFetchQuery<IMerchant>(
    "merchants",
    { skip: 0, take: 6 },
    { syncInitialToSearch: false },
  );

  return (
    <StyledCardsBlockRoot>
      <PageHeader
        sx={theme => ({
          width: "100%",
          margin: 0,
          marginBottom: theme.spacing(7),
        })}
        message="pages.landing.merchants.top"
        data={{ i: (value: ReactNode[]) => <i className="ShowroomTop-ItalicBoldText">{value}</i> }}
      >
        {!isLg && (
          <ShowMoreButton
            text="form.buttons.showMore"
            variant="contained"
            component={RouterLink}
            to={ROUTES.MERCHANT_LIST}
          >
            <ButtonArrowIcon />
          </ShowMoreButton>
        )}
      </PageHeader>

      <ProgressOverlay isLoading={isLoading}>
        {merchants?.data?.length ? <MerchantGrid merchants={merchants.data} /> : <EmptyList />}
      </ProgressOverlay>
      {isLg && (
        <ShowMoreButton
          text="form.buttons.showMore"
          variant="contained"
          component={RouterLink}
          to={ROUTES.MERCHANT_LIST}
        >
          <ButtonArrowIcon />
        </ShowMoreButton>
      )}
    </StyledCardsBlockRoot>
  );
};
