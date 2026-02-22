import { useCallback, useState } from "react";
import { Grid, Stack, Typography } from "@mui/material";
import { FormattedMessage, useIntl } from "react-intl";
import { Check } from "@mui/icons-material";
import { useQuery } from "@tanstack/react-query";
import { Navigate, useNavigate, useParams } from "react-router";

import { ProgressOverlay } from "../../components/page-layout";
import { CheckboxInput, TextInput } from "../../components/inputs";
import { useApi } from "@framework/mui-form";
import { FormWrapper } from "@framework/mui-form";
import { AssetStatus, IAsset, IAssetTokenizeDto } from "@framework/types";
import { useUser } from "../../libs/providers/user-provider";

import { StyledAuthRoot } from "../auth/styled";
import { PageHeader } from "../../components/page-header";
import { PdfPreview } from "../../components/pdf/PdfPreview";
import { InputBox } from "../../components/input-box";
import { FccSubmit } from "./submit-button";
import { StyledFieldsBox } from "./styled";
import { validationSchema } from "./validation";
import { ROUTES } from "../../routes/routes";

export const CreateFcc = () => {
  const [hasScrolledToEnd, setHasScrolledToEnd] = useState<boolean>(false);
  const [isPdfNotSupported, setIsPdfNotSupported] = useState<boolean>(false);

  const { assetId } = useParams<{ assetId: string }>();
  const user = useUser<IUser>();
  const navigate = useNavigate();
  const api = useApi();
  const { formatMessage } = useIntl();

  const { displayName } = user.profile;

  const { data: asset, isLoading } = useQuery({
    queryKey: ["assets", assetId],
    queryFn: (): Promise<IAsset> => {
      return api.fetchJson({
        url: `/assets/${assetId}`,
      });
    },
    enabled: !!assetId,
  });

  const handlePdfNotSupported = useCallback(() => {
    setIsPdfNotSupported(true);
  }, []);

  const handleScrollToEnd = () => {
    setHasScrolledToEnd(true);
  };

  const onSubmit = async (values: IAssetTokenizeDto) => {
    return api.fetchJson({
      url: `/assets/${assetId}/tokenize`,
      method: "POST",
      data: {
        name: values.name,
        isConfirmed: values.isConfirmed,
      },
    });
  };

  if (asset && asset?.assetStatus !== AssetStatus.APPROVED) {
    return <Navigate to={ROUTES.ASSET_VIEW.replace(":assetId", asset.id)} replace />;
  }

  return (
    <StyledAuthRoot>
      <ProgressOverlay isLoading={isLoading}>
        <Grid size={{ sm: 12 }}>
          <PageHeader message="pages.fcc.title" />
          <Typography
            component="h6"
            variant="ralewayRegular"
            lineHeight="24px"
            color="custom.typography.semiBlack"
            mt={3}
            mb={3}
          >
            <FormattedMessage id="pages.fcc.subtitle" />
          </Typography>
          <FormWrapper
            name="fcc"
            showButtons={false}
            showPrompt={false}
            initialValues={{
              name: displayName,
              isConfirmed: false,
            }}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
            renderButtons={props => (
              <FccSubmit hasScrolledToEnd={hasScrolledToEnd} isPdfNotSupported={isPdfNotSupported} {...props} />
            )}
            onSuccess={() => {
              void navigate(ROUTES.DASHBOARD_OFFER_CREATE.replace(":assetId", assetId!));
            }}
          >
            <Stack width="100%">
              <PdfPreview
                document={{ url: "/pdf/listing_agreement_template.pdf", type: "seller" }}
                asset={asset}
                onScrollToEnd={handleScrollToEnd}
                onPdfNotSupported={handlePdfNotSupported}
              />
              <StyledFieldsBox mt={5}>
                <InputBox sx={{ marginBottom: 2.5 }} label={formatMessage({ id: "form.labels.sellerName" })}>
                  <TextInput showLabel={false} name="name" variant="outlined" />
                </InputBox>
                <CheckboxInput
                  disableRipple
                  icon={<span />}
                  checkedIcon={<Check />}
                  name="isConfirmed"
                  label={formatMessage({ id: "form.labels.confirmListing" })}
                />
              </StyledFieldsBox>
            </Stack>
          </FormWrapper>
        </Grid>
      </ProgressOverlay>
    </StyledAuthRoot>
  );
};
