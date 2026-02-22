import { FC, Fragment } from "react";
import { Stack, Typography } from "@mui/material";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { FormattedMessage } from "react-intl";

import { useApi } from "@framework/mui-form";
import { ProgressOverlay } from "../../../components/page-layout";
import { IMerchant } from "@framework/types";
import { Display } from "../../../components/lexical-display";

import { StyledImage, StyledLogoImage, StyledMainRoot, StyledShowroomBlock, StyledShowroomContent } from "./styled";
import { AboutTabContent, ButtonTabs, ShowroomTabComponent } from "../../../components/tabs";
import { sizeDecreaseCalc } from "../../../utils/sizeDecrease";
import { ProvenanceTabContent } from "../../asset/components";

export const MerchantView: FC = () => {
  const api = useApi();
  const { merchantId } = useParams<{ merchantId: string }>();

  const { data: merchant, isLoading } = useQuery({
    queryKey: ["merchant", merchantId],
    queryFn: (): Promise<IMerchant> => {
      return api.fetchJson({
        url: `/merchants/${merchantId}`,
      });
    },
  });

  return (
    <StyledMainRoot>
      <ProgressOverlay isLoading={isLoading}>
        {merchant ? (
          <Fragment>
            <StyledShowroomBlock>
              <StyledImage component="img" src={merchant?.backgroundImageUrl} alt={merchant?.title} />
              <StyledShowroomContent>
                <Typography variant="ralewayRegular" fontSize={sizeDecreaseCalc(58, 35)} lineHeight={"normal"}>
                  {merchant.title}
                </Typography>
                <Display data={merchant.subtitle} />
                <StyledLogoImage component="img" src={merchant?.imageUrl} alt={`${merchant?.title}-logo`} />
              </StyledShowroomContent>
            </StyledShowroomBlock>

            <Stack paddingInline={2} width="100%">
              <ButtonTabs
                sx={{ mt: 6 }}
                defaultValue="merchant.showrooms"
                options={["merchant.showrooms", "merchant.about", "merchant.provenance"]}
                content={{
                  "merchant.showrooms": <ShowroomTabComponent merchantId={merchant.id} />,
                  "merchant.about": <AboutTabContent description={merchant.description} />,
                  "merchant.provenance": <ProvenanceTabContent merchantId={merchant.id} />,
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
