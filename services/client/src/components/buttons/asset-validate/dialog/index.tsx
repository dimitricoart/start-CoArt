import { useCallback } from "react";
import { IconButton } from "@mui/material";
import { FormattedMessage } from "react-intl";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { SelectInput, TextArea } from "../../../inputs";
import { FormWrapper } from "@framework/mui-form";
import { IAssetValidateDto } from "@framework/types";
import { useApi } from "@framework/mui-form";

import { validationSchema } from "./validation";
import { Dialog } from "../../../dialog";
import { InputBox } from "../../../input-box";
import { CloseIcon } from "../../../../shared";
import { Button } from "../../simple";
import { useAssetValidation } from "../context";
import { convertAssetStatus, RejectAssetOptions } from "./constants";

export const AssetRejectDialog = () => {
  const queryClient = useQueryClient();
  const api = useApi();
  const { assetId, isDialogOpen, onCloseAssetValidationDialog } = useAssetValidation();

  const { mutateAsync } = useMutation({
    mutationFn: async (values: IAssetValidateDto) => {
      const { assetStatus, comment } = values;
      return (api as { fetchJson: (o: { url: string; method?: string; data?: object }) => Promise<unknown> }).fetchJson({
        url: `/assets/${assetId}/validate`,
        method: "PUT",
        data: { assetStatus: assetStatus, comment },
      });
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["assets"] });
      void queryClient.invalidateQueries({ queryKey: ["assets/new"] });
      onCloseAssetValidationDialog();
    },
  });

  const handleReject = useCallback(
    async (values: { comment: IAssetValidateDto["comment"]; assetStatus: RejectAssetOptions }) => {
      if (!assetId) {
        return;
      }
      return mutateAsync({ ...values, assetStatus: convertAssetStatus[values.assetStatus] });
    },
    [assetId],
  );

  const action = (
    <IconButton className="CloseIcon" onClick={onCloseAssetValidationDialog}>
      <CloseIcon />
    </IconButton>
  );

  return (
    <Dialog
      message="pages.asset.rejectAsset.message"
      open={isDialogOpen}
      onClose={onCloseAssetValidationDialog}
      action={action}
    >
      <FormWrapper
        showButtons={false}
        name="AssetValidateForm"
        onSubmit={handleReject}
        initialValues={{
          assetStatus: RejectAssetOptions.DECLINE,
          comment: "",
        }}
        validationSchema={validationSchema}
        renderButtons={props => (
          <Button
            className="AssetRejectDialog-SubmitButton"
            isLoading={props.isLoading}
            variant="contained"
            type="submit"
            color="primary"
            data-testid="AssetValidateSubmitButton"
          >
            <FormattedMessage id="form.buttons.reject" />
          </Button>
        )}
      >
        <SelectInput
          InputLabelProps={{
            sx: theme => ({ position: "static", transform: "none", marginBottom: theme.spacing(2) }),
          }}
          name="assetStatus"
          variant="outlined"
          required
          options={RejectAssetOptions}
        />
        <InputBox labelId="comment">
          <TextArea showLabel={false} name="comment" variant="outlined" required />
        </InputBox>
      </FormWrapper>
    </Dialog>
  );
};
