import { enqueueSnackbar } from "notistack";
import { useIntl } from "react-intl";
import { useState } from "react";

import { useApi } from "@framework/mui-form";

export const useDeleteUrl = (bucket?: string) => {
  const api = useApi();
  const [isLoading, setIsLoading] = useState(false);

  const { formatMessage } = useIntl();

  const deleteUrl = async (url: string): Promise<void> => {
    setIsLoading(true);
    await api
      .fetchJson({
        method: "DELETE",
        url: "/storage/delete",
        data: {
          objectName: url.split("/").pop(),
          bucket,
        },
      })
      .then(() => {
        enqueueSnackbar(formatMessage({ id: "snackbar.deleted" }), { variant: "success" });
      })
      .catch(e => {
        console.error(e);
        enqueueSnackbar(formatMessage({ id: "snackbar.error" }), { variant: "error" });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  return { deleteUrl, isLoading };
};
