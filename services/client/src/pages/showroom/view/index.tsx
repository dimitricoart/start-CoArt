import { FC, Fragment } from "react";
import { Box, Grid, Stack, Typography } from "@mui/material";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { FormattedMessage } from "react-intl";

import { useApi } from "@framework/mui-form";
import { ProgressOverlay } from "../../../components/page-layout";
import { IShowroom } from "@framework/types";
import { Display } from "../../../components/lexical-display";

import { StyledMainRoot, StyledShowroomContent } from "./styled";
import { AboutTabContent, ButtonTabs, LedgerTabComponent } from "../../../components/tabs";
import { BackButton } from "../../../components/buttons";
import { sizeDecreaseCalc } from "../../../utils/sizeDecrease";

export const ShowroomView: FC = () => {
  const api = useApi();
  const { showroomId } = useParams<{ showroomId: string }>();

  const { data: showroom, isLoading } = useQuery({
    queryKey: ["showroom", showroomId],
    queryFn: (): Promise<IShowroom> => {
      return api.fetchJson({
        url: `/showrooms/${showroomId}`,
      });
    },
  });

  return (
    <StyledMainRoot>
      <Grid container size={12} mb={5} paddingInline={2}>
        <BackButton />
      </Grid>
      <ProgressOverlay isLoading={isLoading}>
        {showroom ? (
          <Fragment>
            <StyledShowroomContent>
              <Typography variant="ralewayRegular" fontSize={sizeDecreaseCalc(58, 35)} lineHeight={"normal"}>
                {showroom.title}
              </Typography>
              <Box
                sx={{
                  fontSize: "0.875rem",
                  lineHeight: 1.4,
                  "& .MuiTypography-root": { fontSize: "inherit", fontWeight: 400 },
                }}
              >
                <Display data={showroom.subtitle} />
              </Box>
            </StyledShowroomContent>

            <Stack paddingInline={2} width="100%">
              <ButtonTabs
                sx={{ mt: 6 }}
                defaultValue="showroom.ledger"
                options={["showroom.ledger", "showroom.about"]}
                content={{
                  "showroom.ledger": <LedgerTabComponent showroomId={showroom.id} />,
                  "showroom.about": <AboutTabContent description={showroom.description} />,
                }}
              />
            </Stack>
          </Fragment>
        ) : (
          <Typography variant="ralewayRegular" fontSize={sizeDecreaseCalc(58, 35)} lineHeight={"normal"}>
            <FormattedMessage id="snackbar.pageNotFound" />
          </Typography>
        )}
      </ProgressOverlay>
    </StyledMainRoot>
  );
};
