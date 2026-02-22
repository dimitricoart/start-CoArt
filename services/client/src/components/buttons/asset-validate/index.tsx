import { FC, Fragment, MouseEvent } from "react";
import { FormattedMessage } from "react-intl";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Grid } from "@mui/material";

import { useApi } from "@framework/mui-form";
import { AssetStatus, IAssetValidateDto } from "@framework/types";

import { Button } from "../simple";
import { useAssetValidation } from "./context";

export { AssetValidationContextProvider } from "./context";
export { AssetRejectDialog } from "./dialog";

interface IAssetValidateButtonProps {
  assetId: string;
}

export const AssetValidateButton: FC<IAssetValidateButtonProps> = props => {
  const { assetId } = props;
  const { onOpenAssetValidationDialog: onOpenAssetValidationDialog } = useAssetValidation();

  const queryClient = useQueryClient();
  const api = useApi();

  const { mutate, isPending } = useMutation({
    mutationFn: async (values: IAssetValidateDto) => {
      const { assetStatus, comment } = values;
      return api.fetchJson({
        url: `/assets/${assetId}/validate`,
        method: "PUT",
        data: { assetStatus: assetStatus, comment },
      });
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["assets"] });
      void queryClient.invalidateQueries({ queryKey: ["assets/new"] });
    },
  });

  const handleRejectDialog = () => {
    return (e: MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      onOpenAssetValidationDialog(assetId);
    };
  };

  const handleApprove = (assetStatus: AssetStatus) => {
    return (e: MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      void mutate({ assetStatus });
    };
  };

  return (
    <Fragment>
      <Grid container size={12} spacing={2} display="flex" flexDirection="column" mt={"auto"}>
        <Grid size={12}>
          <Button
            sx={theme => ({ minWidth: "100%", padding: theme.spacing(1, 2.5) })}
            size="small"
            disabled={isPending}
            onClick={handleApprove(AssetStatus.APPROVED)}
          >
            <FormattedMessage id="form.buttons.approve" />
          </Button>
        </Grid>
        <Grid size={12}>
          <Button
            sx={theme => ({ minWidth: "100%", padding: theme.spacing(1, 2.5) })}
            size="small"
            customColor="white"
            disabled={isPending}
            onClick={handleRejectDialog()}
          >
            <FormattedMessage id="form.buttons.reject" />
          </Button>
        </Grid>
      </Grid>
    </Fragment>
  );
};
