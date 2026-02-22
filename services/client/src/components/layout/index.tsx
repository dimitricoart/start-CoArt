import { FC } from "react";
import { Outlet, useLocation } from "react-router";
import { Box } from "@mui/material";

import ErrorBoundary from "../error-boundary";
import { Header } from "../header";
import { Footer } from "../footer";
import { StyledContainer } from "./styled";
import { ROUTES } from "../../routes/routes";

const isShowroomPath = (path: string) => {
  const re = /^\/?showrooms\/([^/]+)$/;
  return re.test(path);
};

export const Layout: FC = () => {
  const location = useLocation();
  const isLanding = location.pathname === ROUTES.MAIN;
  const isShowroom = isShowroomPath(location.pathname);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <Header />
      <StyledContainer sx={{ flexGrow: 1, paddingInline: isLanding || isShowroom ? 0 : 2 }}>
        <ErrorBoundary>
          <Outlet />
        </ErrorBoundary>
      </StyledContainer>
      <Footer />
    </Box>
  );
};
