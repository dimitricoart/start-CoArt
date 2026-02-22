import { FC, Fragment, ReactNode } from "react";
import { Typography } from "@mui/material";
import { FormattedMessage } from "react-intl";

import { ProgressOverlay } from "../../../components/page-layout";
import { IMerchant } from "@framework/types";
import { useFetchQuery } from "@framework/mui-form";

import { MerchantGrid } from "./grid";
import { StyledPagination } from "../../../components/pagination";
import { Carousel } from "../../landing/carousel";
import { StyledPageRoot } from "../../../components/styled";
import { PageHeader } from "../../../components/page-header";

export const MerchantList: FC = () => {
  const { data: merchants, isLoading, skip, take, onChangePage } = useFetchQuery<IMerchant>("merchants");

  return (
    <Fragment>
      <Carousel />
      <StyledPageRoot
        sx={theme => ({
          paddingInline: theme.spacing(8.5),
          [theme.breakpoints.down("lg")]: {
            width: "100%",
            paddingInline: theme.spacing(4),
          },

          [theme.breakpoints.down("md")]: {
            paddingInline: theme.spacing(2),
          },
        })}
      >
        <PageHeader
          sx={theme => ({
            justifyContent: "center",
            marginBottom: theme.spacing(7),
            [theme.breakpoints.down("lg")]: {
              marginBottom: theme.spacing(4),
            },
            [theme.breakpoints.down("md")]: {
              marginBottom: theme.spacing(2),
            },
          })}
          message="pages.landing.merchants.top"
          data={{
            i: (value: ReactNode) => <i className="Banner-ItalicBoldText">{value}</i>,
            br: () => <br />,
          }}
        />

        <ProgressOverlay isLoading={isLoading}>
          {merchants?.rows.length ? (
            <MerchantGrid merchants={merchants?.rows} />
          ) : (
            <Typography>
              <FormattedMessage id="pages.landing.merchants.empty" />
            </Typography>
          )}

          {!!merchants?.count && (
            <StyledPagination
              shape="rounded"
              page={skip / take + 1}
              count={Math.ceil(merchants.count / take)}
              onChange={onChangePage}
            />
          )}
        </ProgressOverlay>
      </StyledPageRoot>
    </Fragment>
  );
};
