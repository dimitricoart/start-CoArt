import { FC } from "react";
import { FormattedMessage } from "react-intl";

import { StyledScrollToEndIndicator } from "../styled";

interface IScrollToEndIndicatorProps {
  scrollToDocumentEnd(): void;
}

export const ScrollToEndIndicator: FC<IScrollToEndIndicatorProps> = ({ scrollToDocumentEnd }) => {
  return (
    <StyledScrollToEndIndicator onClick={scrollToDocumentEnd}>
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M8 3V13M8 13L12 9M8 13L4 9"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <FormattedMessage id="form.pdf.scrollToEnd" />
    </StyledScrollToEndIndicator>
  );
};
