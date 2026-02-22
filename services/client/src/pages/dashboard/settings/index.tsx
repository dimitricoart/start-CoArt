import { FC } from "react";

import { companyName, imageUrl } from "@framework/constants";

import { StyledContainer, StyledLogo } from "./styled";

export const Settings: FC = () => {
  return (
    <StyledContainer>
      <a href={process.env.FE_URL}>
        <StyledLogo component="img" src={imageUrl} alt={companyName} style={{ maxWidth: 400 }} />
      </a>
    </StyledContainer>
  );
};
