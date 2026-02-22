import { FC } from "react";
import { Typography, Box, useMediaQuery } from "@mui/material";

import { companyName } from "@framework/constants";

import { SocialLinks } from "./social";
import { StyledCopyrightWrapper, StyledFooterRoot, StyledWrapper } from "./styled";
import { LogoWhiteIcon } from "../../shared/icons/logo-white";
import { TermOfUseLink } from "./term-of-use";
import { CommunityStandardsLink } from "./community-standards";
import { ResponsibleStoragePolicy } from "./responsible-storage-policy";

export const Footer: FC = () => {
  const isMd = useMediaQuery(theme => theme.breakpoints.down("md"));

  return (
    <StyledFooterRoot>
      <StyledWrapper container size={12}>
        <StyledCopyrightWrapper size={{ xs: 12, md: 6 }} display="flex" flexDirection="column" gap={4.5}>
          <LogoWhiteIcon />
          {!isMd && (
            <Box>
              <TermOfUseLink />
              {" | "}
              <CommunityStandardsLink />
              {" | "}
              <ResponsibleStoragePolicy />
            </Box>
          )}
        </StyledCopyrightWrapper>
        <StyledCopyrightWrapper
          size={{ xs: 12, md: 6 }}
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
          alignItems="flex-end"
          gap={4.5}
        >
          {!isMd && <SocialLinks />}
          <Typography fontWeight={800} lineHeight={"24px"} fontSize={14} variant="ralewayRegular">
            {`All Rights Reserved ${companyName} ${new Date().getFullYear()}`}
          </Typography>
          {isMd && <SocialLinks />}
          {isMd && (
            <Box textAlign="center">
              <TermOfUseLink />
              {" | "}
              <CommunityStandardsLink />
              {" | "}
              <ResponsibleStoragePolicy />
            </Box>
          )}
        </StyledCopyrightWrapper>
      </StyledWrapper>
    </StyledFooterRoot>
  );
};
