import { FC, PropsWithChildren } from "react";
import { FormattedMessage } from "react-intl";
import { Grid, type SxProps, type Theme, Typography } from "@mui/material";

import { StyledPageHeaderRoot } from "./styled";

export interface IPageHeader {
  message: string;
  data?: any;
  sx?: SxProps<Theme>;
  renderGrow?: boolean;
  titleSize?: number;
}

export const PageHeader: FC<PropsWithChildren<IPageHeader>> = props => {
  const { children, message, data, renderGrow = true, sx = [], titleSize } = props;

  return (
    <StyledPageHeaderRoot
      container
      size={12}
      justifyContent="space-between"
      alignItems="center"
      sx={[...(Array.isArray(sx) ? sx : [sx])]}
    >
      {renderGrow && <Grid size="grow" />}
      <Grid size={titleSize} className="PageHeader-Title">
        <Typography component="h2">
          <FormattedMessage id={message} values={data} />
        </Typography>
      </Grid>

      <Grid size="grow" className="PageHeader-ButtonToolbar">
        {children}
      </Grid>
    </StyledPageHeaderRoot>
  );
};
