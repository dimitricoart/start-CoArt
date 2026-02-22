import React from "react";
import { Stack, Typography } from "@mui/material";
import { FormattedMessage } from "react-intl";

const walletCreateDescription = [
  "pages.dashboard.wallet.description.0",
  "pages.dashboard.wallet.description.1",
  "pages.dashboard.wallet.description.2",
  "pages.dashboard.wallet.description.3",
];

const walletCreateDescriptionList = [
  "pages.dashboard.wallet.description.2.list_0",
  "pages.dashboard.wallet.description.2.list_1",
  "pages.dashboard.wallet.description.2.list_2",
];

export const WalletCreateDescription = () => {
  return (
    <Stack gap={2.5} mb={5}>
      {walletCreateDescription.map((id, index) => {
        if (index === 2) {
          return (
            <Stack key={id} gap={1}>
              <Typography key={index} variant="ralewayRegular" fontSize="20px" lineHeight="30px">
                <FormattedMessage id={id} />
              </Typography>
              {walletCreateDescriptionList.map(id => (
                <Typography key={id} variant="ralewayRegular" fontSize="20px" lineHeight="30px">
                  <FormattedMessage id={id} />
                </Typography>
              ))}
            </Stack>
          );
        }
        return (
          <Typography key={id} variant="ralewayRegular" fontSize="20px">
            <FormattedMessage id={id} />
          </Typography>
        );
      })}
    </Stack>
  );
};
