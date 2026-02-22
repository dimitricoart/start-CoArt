import { FC, Fragment } from "react";
import { FormattedMessage } from "react-intl";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useLocation, useNavigate } from "react-router";
import { Typography } from "@mui/material";
import { Check } from "@mui/icons-material";

import { useApi } from "@framework/mui-form";
import { PageHeader, ProgressOverlay } from "../../../components/page-layout";
import { FormWrapper } from "@framework/mui-form";
import { CheckboxInput } from "../../../components/inputs";
import { IWalletCreateDto } from "@framework/types";

import { StyledPageRoot } from "../../../components/styled";
import { WalletCreateDescription } from "./description";
import { CreateWalletSubmitButton } from "./submit";
import { WalletCreatedDescription } from "./created-description";

export const Wallet: FC = () => {
  const api = useApi();
  const location = useLocation();
  const navigate = useNavigate();
  const redirectUrl: string | null = location.state?.redirectUrl || null;

  const { data, refetch, isLoading } = useQuery({
    queryKey: ["wallet"],
    queryFn: async () => {
      return api.fetchJson({
        url: "/wallet",
      });
    },
    retry: false,
  });

  const { mutateAsync } = useMutation({
    mutationFn: async (values: IWalletCreateDto): Promise<any> => {
      return await api.fetchJson({
        url: "/wallet",
        method: "POST",
        data: values,
      });
    },
    onSuccess: () => {
      void refetch();
      if (redirectUrl) {
        void navigate(redirectUrl);
      }
    },
    onError: e => {
      console.error(e);
    },
  });

  const handleCreateMerchant = async (values: IWalletCreateDto) => {
    await mutateAsync(values);
  };

  return (
    <StyledPageRoot>
      <PageHeader sx={{ margin: 0, mb: 4 }} message="pages.dashboard.wallet.title" />
      <ProgressOverlay isLoading={isLoading}>
        {data?.multisig ? (
          <Fragment>
            <WalletCreatedDescription multisig={data.multisig} />
            <Typography variant="ralewayRegular" fontSize="20px" lineHeight="30px">
              <FormattedMessage id="pages.dashboard.wallet.allData" />
            </Typography>
          </Fragment>
        ) : (
          <Fragment>
            <WalletCreateDescription />
            <FormWrapper
              name="CreateWallet"
              showButtons={false}
              showPrompt={false}
              onSubmit={handleCreateMerchant}
              initialValues={{ isConfirmed: false }}
              renderButtons={props => <CreateWalletSubmitButton {...props} />}
            >
              <CheckboxInput disableRipple icon={<span />} checkedIcon={<Check />} name="isConfirmed" />
            </FormWrapper>
          </Fragment>
        )}
      </ProgressOverlay>
    </StyledPageRoot>
  );
};
