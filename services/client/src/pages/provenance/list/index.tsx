import { FC, Fragment, ReactNode } from "react";
import { useMediaQuery } from "@mui/material";

import { ProgressOverlay } from "../../../components/page-layout";
import { useFetchQuery } from "@framework/mui-form";
import type { IProvenance } from "@framework/types";
import { defaultItemsPerPage } from "@framework/constants";

import { ProvenanceGrid } from "./grid";
import { StyledPagination } from "../../../components/pagination";
import { Carousel } from "../../landing/carousel";
import { StyledPageRoot } from "../../../components/styled";
import { PageHeader } from "../../../components/page-header";

export const ProvenanceList: FC = () => {
  const isMd = useMediaQuery(theme => theme.breakpoints.down("md"));
  const { data: provenance, isLoading, skip, take, onChangePage } = useFetchQuery<IProvenance>("provenance");

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
          message="pages.provenance.recent.title"
          data={{
            i: (value: ReactNode) => <i className="Banner-ItalicBoldText">{value}</i>,
            br: () => <br />,
          }}
        />

        <ProgressOverlay isLoading={isLoading}>
          {provenance?.data?.length ? <ProvenanceGrid provenance={provenance.data} /> : null}

          {!isMd && !!provenance?.total && provenance?.total > defaultItemsPerPage && (
            <StyledPagination
              shape="rounded"
              page={skip / take + 1}
              count={Math.ceil(provenance.total / take)}
              onChange={onChangePage}
            />
          )}
        </ProgressOverlay>
      </StyledPageRoot>
    </Fragment>
  );
};
