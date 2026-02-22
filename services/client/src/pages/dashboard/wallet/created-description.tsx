import { FC, ReactNode } from "react";
import { Fade, IconButton, Stack, Tooltip, Typography } from "@mui/material";
import { FormattedMessage, useIntl } from "react-intl";

import { CopyIcon } from "../../../shared";
import { useClipboard } from "../../../shared/hooks/use-copy-clipboard";

const walletCreatedDescription = [
  "pages.dashboard.wallet.created.0",
  "pages.dashboard.wallet.created.1",
  "pages.dashboard.wallet.created.2",
  "pages.dashboard.wallet.created.3",
  "pages.dashboard.wallet.created.4",
];

interface IWalletCreatedDescriptionProps {
  multisig: string;
}

export const WalletCreatedDescription: FC<IWalletCreatedDescriptionProps> = ({ multisig }) => {
  const { copy, isCopied } = useClipboard();
  const { formatMessage } = useIntl();

  const onCopyClickHandle = () => {
    void copy(multisig.toLowerCase());
  };

  return (
    <Stack mb={2.5}>
      {walletCreatedDescription.map((id, index) => (
        <Typography key={id} mb={index !== 1 ? 2.5 : 0} variant="ralewayRegular" fontSize="20px" lineHeight="30px">
          <FormattedMessage id={id} />
        </Typography>
      ))}

      <Typography variant="ralewayRegular" fontSize={20} lineHeight="30px">
        <FormattedMessage
          id="pages.dashboard.wallet.address"
          values={{
            value: multisig,
            address: (value: ReactNode[]) => (
              <Stack direction="row" alignItems="center" gap={1.5}>
                <Tooltip
                  disableHoverListener
                  title={formatMessage({ id: "messages.copy" })}
                  open={isCopied}
                  slots={{ transition: Fade }}
                  slotProps={{
                    transition: { timeout: 400 },
                  }}
                  leaveDelay={3000}
                >
                  <IconButton onClick={onCopyClickHandle}>
                    <CopyIcon />
                  </IconButton>
                </Tooltip>
                <Typography variant="ralewayMedium" fontSize={24} lineHeight="34px">
                  {value}
                </Typography>
              </Stack>
            ),
          }}
        />
      </Typography>
    </Stack>
  );
};
