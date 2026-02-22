import { FC, useState } from "react";
import { Stack } from "@mui/material";
import { Check } from "@mui/icons-material";
import { useQuery } from "@tanstack/react-query";
import { useIntl } from "react-intl";

import { useUser } from "../../libs/providers/user-provider";
import { CheckboxInput, TextInput } from "../../components/inputs";
import { useApi } from "@framework/mui-form";
import { ProgressOverlay } from "../../components/page-layout";
import { FormWrapper } from "@framework/mui-form";
import { IOffer, IUser, IAssetPurchaseDto } from "@framework/types";

import { validationSchema } from "./validation";
import { PdfPreview } from "../../components/pdf/PdfPreview";
import { StyledFieldsBox } from "./styled";
import { InputBox } from "../../components/input-box";
import { PaymentSubmit } from "./submit-buttons";

interface IPaywallFormProps {
  offerId?: string;
}

export const PaywallForm: FC<IPaywallFormProps> = ({ offerId }) => {
  const [hasScrolledToEnd, setHasScrolledToEnd] = useState<boolean>(false);
  const [isPdfNotSupported, setIsPdfNotSupported] = useState<boolean>(false);

  const user = useUser<IUser | null>();
  const api = useApi();
  const { formatMessage } = useIntl();

  const { data: offer, isLoading } = useQuery({
    queryKey: ["offer", offerId],
    queryFn: (): Promise<IOffer> => {
      return api.fetchJson({
        url: `/offers/${offerId}`,
      });
    },
    enabled: !!offerId,
  });

  const onSubmit = async (values: IAssetPurchaseDto, event?: React.BaseSyntheticEvent<object, any, any>) => {
    const submitEvent = event?.nativeEvent as SubmitEvent | undefined;
    const submitter = submitEvent?.submitter as HTMLButtonElement | null;

    const paymentMethod = (submitter?.dataset.method || "stripe") as "paykilla" | "stripe";

    const url = {
      paykilla: `/paykilla/sell/${offerId}`,
      stripe: `/stripe-checkout/sell/${offerId}`,
    };

    return api.fetchJson({
      url: url[paymentMethod],
      method: "POST",
      data: {
        name: values.name,
        isConfirmed: values.isConfirmed,
      },
    });
  };

  const handlePdfNotSupported = () => {
    setIsPdfNotSupported(true);
  };

  const handleScrollToEnd = () => {
    setHasScrolledToEnd(true);
  };

  return (
    <ProgressOverlay isLoading={isLoading}>
      <FormWrapper
        name="fcc"
        showButtons={false}
        initialValues={{
          name: user.profile?.displayName || "",
          isConfirmed: false,
        }}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        renderButtons={props => (
          <PaymentSubmit isPdfNotSupported={isPdfNotSupported} hasScrolledToEnd={hasScrolledToEnd} {...props} />
        )}
        onSuccess={json => {
          window.location.href = json.url;
        }}
      >
        <Stack width="100%">
          <PdfPreview
            document={{ url: "/pdf/purchase_agreement_template.pdf", type: "buyer" }}
            offer={offer}
            onScrollToEnd={handleScrollToEnd}
            onPdfNotSupported={handlePdfNotSupported}
          />
          <StyledFieldsBox mt={5}>
            <InputBox sx={{ marginBottom: 2.5 }} label={formatMessage({ id: "form.labels.buyerName" })}>
              <TextInput showLabel={false} name="name" variant="outlined" />
            </InputBox>
            <CheckboxInput
              required
              disableRipple
              icon={<span />}
              checkedIcon={<Check />}
              name="isConfirmed"
              label={formatMessage({ id: "form.labels.confirmPurchase" })}
            />
          </StyledFieldsBox>
        </Stack>
      </FormWrapper>
    </ProgressOverlay>
  );
};
