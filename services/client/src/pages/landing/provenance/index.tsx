import { FC, ReactNode } from "react";
import { Link as RouterLink } from "react-router";
import { useMediaQuery } from "@mui/material";

import { ProgressOverlay } from "../../../components/page-layout";
import type { IProvenance } from "@framework/types";
import { useFetchQuery } from "@framework/mui-form";

import { ProvenanceGrid } from "../../provenance/list/grid";
import { ROUTES } from "../../../routes/routes";
import { ShowMoreButton } from "../../../components/buttons";
import { ButtonArrowIcon } from "../../../shared";
import { PageHeader } from "../../../components/page-header";
import { StyledCardsBlockRoot } from "../styled";
import { EmptyList } from "../../../components/empty";

export const Provenance: FC = () => {
  const isLg = useMediaQuery(theme => theme.breakpoints.down("lg"));

  const { data: provenance, isLoading } = useFetchQuery<IProvenance>(
    "provenance/recent",
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
        message="pages.landing.provenance.top"
        data={{ i: (value: ReactNode[]) => <i className="ShowroomTop-ItalicBoldText">{value}</i> }}
      >
        {!isLg && !!provenance?.data?.length && (
          <ShowMoreButton
            text="pages.landing.provenance.all"
            variant="contained"
            component={RouterLink}
            to={ROUTES.PROVENANCE_LIST}
          >
            <ButtonArrowIcon />
          </ShowMoreButton>
        )}
      </PageHeader>

      <ProgressOverlay isLoading={isLoading}>
        {provenance?.data?.length ? <ProvenanceGrid provenance={provenance.data} /> : <EmptyList />}
      </ProgressOverlay>

      {isLg && !!provenance?.data?.length && (
        <ShowMoreButton
          text="pages.landing.provenance.all"
          variant="contained"
          component={RouterLink}
          to={ROUTES.PROVENANCE_LIST}
        >
          <ButtonArrowIcon />
        </ShowMoreButton>
      )}
    </StyledCardsBlockRoot>
  );
};
