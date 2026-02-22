import { FC } from "react";
import { Box, Grid, useMediaQuery } from "@mui/material";
import { Link as RouterLink } from "react-router";

import { companyName } from "@framework/constants";

import { StyledAppBar, StyledLink, StyledToolbar } from "./styled";
import { Sections } from "./sections";
import { Search } from "./search";
import { DrawerMenu } from "./drawer";

export const Header: FC = () => {
  const isMd = useMediaQuery(theme => theme.breakpoints.down("md"));
  return (
    <StyledAppBar position="relative" elevation={0}>
      <StyledToolbar>
        <Grid container size={12} width="100%" alignItems="center">
          <Grid size={4} display="flex" justifyContent="flex-start">
            <Search />
          </Grid>
          <Grid size={4} display="flex" justifyContent="center">
            <StyledLink component={RouterLink} to="/">
              <Box component="img" alt={companyName} src={"/assets/logo.svg"} />
            </StyledLink>
          </Grid>
          <Grid size={4} display="flex" justifyContent="flex-end">
            {!isMd && <Sections />}
            {isMd && <DrawerMenu />}
          </Grid>
        </Grid>
      </StyledToolbar>
    </StyledAppBar>
  );
};
