import { FC } from "react";

import { Display } from "../../lexical-display";

import { StyledAboutRoot } from "./styled";

interface IAboutTabContentProps {
  description: string;
}

export const AboutTabContent: FC<IAboutTabContentProps> = ({ description }) => {
  return (
    <StyledAboutRoot>
      <Display data={description} />
    </StyledAboutRoot>
  );
};
