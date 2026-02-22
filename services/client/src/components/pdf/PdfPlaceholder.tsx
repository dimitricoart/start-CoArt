import { FC } from "react";
import { FormattedMessage } from "react-intl";
import { Link } from "react-router";
import { Typography } from "@mui/material";

import { StyledPdfPlaceholderRoot } from "./styled";

interface IPdfRendererProps {
  fileUrl: string;
  onScrollToEnd?: () => void;
}

export const PdfPlaceholder: FC<IPdfRendererProps> = () => {
  return (
    <StyledPdfPlaceholderRoot>
      <Typography variant="ralewayMedium" fontSize={20}>
        <FormattedMessage
          id="form.pdf.pdfjs"
          values={{
            a: chunks => (
              <Link
                className="PdfPlaceholder-link"
                to="/pdf/listing_agreement_template.pdf"
                key="key"
                rel="noopener noreferrer"
                target="_blank"
              >
                {chunks}
              </Link>
            ),
          }}
        />
      </Typography>
    </StyledPdfPlaceholderRoot>
  );
};
