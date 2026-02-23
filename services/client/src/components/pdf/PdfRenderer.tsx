import { FC, useCallback, useRef, useState } from "react";

import { Box } from "@mui/material";

import { StyledDocumentContainer, StyledRoot } from "./styled";
import { DocumentLoading } from "./components";

/**
 * PDF viewer via iframe (blob URL). Avoids react-pdf/pdfjs-dist in the bundle,
 * which was causing "Cannot read properties of undefined (reading 'call')" in production.
 */
interface IPdfRendererProps {
  fileUrl: string;
  onScrollToEnd?: () => void;
}

export const PdfRenderer: FC<IPdfRendererProps> = props => {
  const { fileUrl, onScrollToEnd } = props;
  const [loading, setLoading] = useState(true);
  const reportedRef = useRef(false);

  const onIframeLoad = useCallback(() => {
    setLoading(false);
    if (onScrollToEnd && !reportedRef.current) {
      reportedRef.current = true;
      onScrollToEnd();
    }
  }, [onScrollToEnd]);

  return (
    <StyledRoot>
      {loading && (
        <Box position="absolute" top={0} left={0} right={0} bottom={0} display="flex" alignItems="center" justifyContent="center" zIndex={1}>
          <DocumentLoading />
        </Box>
      )}
      <StyledDocumentContainer sx={{ minHeight: 560 }}>
        <iframe
          title="PDF document"
          src={fileUrl}
          onLoad={onIframeLoad}
          style={{
            width: "100%",
            minHeight: 560,
            border: "none",
          }}
        />
      </StyledDocumentContainer>
    </StyledRoot>
  );
};
