import { FC } from "react";

import { Merchants } from "./merchants";
import { Carousel } from "./carousel";
import { Provenance } from "./provenance";
import { Youtube } from "./youtube";
import { StyledMain } from "./styled";

export const Landing: FC = () => {
  return (
    <StyledMain>
      <Carousel />
      <Merchants />
      <Youtube />
      <Provenance />
    </StyledMain>
  );
};
