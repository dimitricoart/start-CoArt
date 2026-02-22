import { FC, Fragment, useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { useMutation } from "@tanstack/react-query";
import { useSnackbar } from "notistack";

import { useApi } from "@framework/mui-form";
import { useUser } from "../../../libs/providers/user-provider";
import { IUser } from "@framework/types";

import { Button } from "../simple";
import { IProposePriceDto, ProposePriceDialog } from "./dialog";

interface IProposeButtonProps {
  assetId: string;
}

export const ProposeButton: FC<IProposeButtonProps> = props => {
  const { assetId } = props;
  const [isProposeDialogOpen, setIsProposeDialogOpen] = useState(false);

  const user = useUser<IUser>();
  const { enqueueSnackbar } = useSnackbar();
  const { formatMessage } = useIntl();
  const api = useApi();

  const { mutate: proposePrice } = useMutation({
    mutationFn: (data: IProposePriceDto): Promise<any> => {
      return api.fetchJson({
        method: "POST",
        url: `/assets/${assetId}/propose`,
        data,
      });
    },
    onSettled: () => {
      setIsProposeDialogOpen(false);
    },
    onSuccess: () => {
      enqueueSnackbar(formatMessage({ id: "snackbar.success" }), { variant: "success" });
    },
    onError: e => {
      console.error(e);
      enqueueSnackbar(formatMessage({ id: "snackbar.error" }), { variant: "error" });
    },
  });

  const handleProposePrice = () => {
    setIsProposeDialogOpen(true);
  };

  const handleProposePriceCancel = (): void => {
    setIsProposeDialogOpen(false);
  };

  const handleProposePriceConfirmed = async (values: IProposePriceDto): Promise<void> => {
    await Promise.resolve(values);
    proposePrice(values);
  };

  return (
    <Fragment>
      <Button
        sx={{ minWidth: 250 }}
        customColor="white"
        variant="contained"
        color="primary"
        data-testid="ProposePriceDialogButton"
        onClick={handleProposePrice}
      >
        <FormattedMessage id="pages.asset.view.contactSeller" />
      </Button>

      <ProposePriceDialog
        onCancel={handleProposePriceCancel}
        onConfirm={handleProposePriceConfirmed}
        open={isProposeDialogOpen}
        initialValues={{
          email: user.profile?.email || "",
          message: "",
        }}
      />
    </Fragment>
  );
};
