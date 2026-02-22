import { FC, ReactNode } from "react";
import { styled } from "@mui/material";

import { PageHeader } from "../../../components/page-header";
import { StyledCardsBlockRoot } from "../styled";

const StyledIframe = styled("iframe")(({ theme }) => ({
  width: "100%",
  height: "100%",
  borderRadius: theme.spacing(3.5),
}));

export const Youtube: FC = () => {
  return (
    <StyledCardsBlockRoot>
      <PageHeader
        sx={theme => ({
          margin: 0,
          marginBottom: theme.spacing(7),
        })}
        message="pages.landing.youtube.video"
        data={{ i: (value: ReactNode[]) => <i className="ShowroomTop-ItalicBoldText">{value}</i> }}
      />

      <div style={{ width: "100%", aspectRatio: "4/2" }}>
        <StyledIframe
          src="https://www.youtube.com/embed/XJWfrqgO-Uw?si=E5e9nGtcHUa16d17"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></StyledIframe>
      </div>
    </StyledCardsBlockRoot>
  );
};
