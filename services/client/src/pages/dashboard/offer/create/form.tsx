import { FC, RefObject, useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { Stack, Typography } from "@mui/material";

import { NumberInput, CurrencyInput, EntityInput } from "../../../../components/inputs";
import { IOfferCreateDto } from "@framework/types";
import { FormWrapper } from "@framework/mui-form";

import { validationSchema } from "./validation";
import { Button } from "../../../../components/buttons";
import { Dialog } from "../../../../components/dialog";

export interface IOfferCreateFormProps {
  initialValues: IOfferCreateDto;
  innerRef?: RefObject<HTMLFormElement | null>;
  onSubmit: (values: IOfferCreateDto) => Promise<void>;
  redirect: string;
}

export const OfferCreateForm: FC<IOfferCreateFormProps> = props => {
  /** TODO - remove dialog later **/
  const [open, setOpen] = useState(false);
  const { formatMessage } = useIntl();

  const onDialogOpen = () => setOpen(true);

  const onDialogClose = () => setOpen(false);

  return (
    <FormWrapper
      showButtons={false}
      validationSchema={validationSchema}
      name="OfferCreateForm"
      renderButtons={({ isLoading, disabled }) => (
        <Stack direction="row" justifyContent="flex-start">
          <Button
            className="OfferCreate-SubmitButton"
            isLoading={isLoading}
            disabled={disabled}
            variant="contained"
            // type="submit" //Uncomment later
            color="primary"
            data-testid="OfferCreateSubmitButton"
            onClick={onDialogOpen}
          >
            <FormattedMessage id="form.buttons.createOffer" />
          </Button>
        </Stack>
      )}
      {...props}
    >
      <Stack gap={5}>
        <EntityInput required name="assetId" controller="ledger" variant="outlined" disabled />

        <NumberInput name="fractions" variant="outlined" disabled />

        <CurrencyInput
          sx={theme => ({ ...theme.typography.ralewayRegular, fontSize: 16 })}
          name="price"
          precision={0}
          symbol={"€"}
          variant="outlined"
        />
      </Stack>
      <Dialog open={open} message={formatMessage({ id: "dialogs.comingSoon" })} onClose={onDialogClose}>
        <Stack gap={3}>
          <Typography variant="ralewayMedium">{formatMessage({ id: "messages.fractionalInterest" })}</Typography>
          <Button className="OfferCreate-SubmitButton" variant="outlined" color="primary" onClick={onDialogClose}>
            <FormattedMessage id="form.buttons.gotIt" />
          </Button>
        </Stack>
      </Dialog>
    </FormWrapper>
  );
};
