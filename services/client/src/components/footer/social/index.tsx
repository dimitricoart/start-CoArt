import { FC } from "react";

import { StyledLink, StyledWrapper } from "./styled";
import { InstagramIcon } from "./icons/instagram";
import { LinkedinIcon } from "./icons/linkedin";
import { FacebookIcon } from "./icons/facebook";
import { YoutubeIcon } from "./icons/youtube";
import { XIcon } from "./icons/x";
import { MediumIcon } from "./icons/medium";

export const SocialLinks: FC = () => {
  return (
    <StyledWrapper>
      <StyledLink href="https://www.instagram.com/coartmarket/" target="_blank">
        <InstagramIcon />
      </StyledLink>
      <StyledLink href="https://www.facebook.com/coart.space/" target="_blank">
        <FacebookIcon />
      </StyledLink>
      <StyledLink href="https://www.linkedin.com/in/dimitricoart/" target="_blank">
        <LinkedinIcon />
      </StyledLink>
      <StyledLink href="https://youtube.com/@dimitrisloboda?si=BD1Q3MDQqpOefDG4" target="_blank">
        <YoutubeIcon />
      </StyledLink>
      <StyledLink href="https://x.com/coart_market" target="_blank">
        <XIcon />
      </StyledLink>
      <StyledLink href="https://medium.com/@dimitri-coart" target="_blank">
        <MediumIcon />
      </StyledLink>
    </StyledWrapper>
  );
};
