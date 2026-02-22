import { FC } from "react";
import { FormattedMessage } from "react-intl";
import { useParams } from "react-router";
import { Typography } from "@mui/material";

import { StyledContainer } from "./styled";
import { PageHeader } from "../../components/page-header";

export const Message: FC = () => {
  const { message } = useParams<{ message: string }>();

  return (
    <StyledContainer>
      <PageHeader message={`messages.titles.${message}`} />
      <Typography typography="ralewayRegular" fontSize={18}>
        <FormattedMessage id={`messages.${message}`} />
      </Typography>
    </StyledContainer>
  );
};
