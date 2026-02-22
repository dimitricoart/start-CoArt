import { FC } from "react";
import { IconButton } from "@mui/material";
import { FormattedMessage } from "react-intl";

import { TextArea, TextInput } from "../../../inputs";
import { FormWrapper } from "@framework/mui-form";

import { validationSchema } from "./validation";
import { Dialog } from "../../../dialog";
import { InputBox } from "../../../input-box";
import { CloseIcon } from "../../../../shared";
import { Button } from "../../simple";

export interface IProposePriceDto {
  email: string;
  message: string;
}

export interface IProposePriceDialogProps {
  open: boolean;
  onCancel: () => void;
  onConfirm: (values: IProposePriceDto) => Promise<void>;
  initialValues: IProposePriceDto;
}

export const ProposePriceDialog: FC<IProposePriceDialogProps> = props => {
  const { initialValues, open, onCancel, onConfirm } = props;

  const action = (
    <IconButton className="CloseIcon" onClick={onCancel}>
      <CloseIcon />
    </IconButton>
  );

  return (
    <Dialog message="pages.asset.view.contactSeller" open={open} onClose={onCancel} action={action}>
      <FormWrapper
        showButtons={false}
        name="ProposePriceForm"
        onSubmit={onConfirm}
        initialValues={initialValues}
        validationSchema={validationSchema}
        renderButtons={props => (
          <Button
            className="ProposePriceDialog-SubmitButton"
            isLoading={props.isLoading}
            variant="contained"
            type="submit"
            color="primary"
            data-testid="ProposePriceSubmitButton"
          >
            <FormattedMessage id="form.buttons.sendMessage" />
          </Button>
        )}
      >
        <InputBox labelId="email">
          <TextInput showLabel={false} name="email" variant="outlined" required />
        </InputBox>
        <InputBox labelId="message">
          <TextArea showLabel={false} name="message" variant="outlined" required />
        </InputBox>
      </FormWrapper>
    </Dialog>
  );
};
