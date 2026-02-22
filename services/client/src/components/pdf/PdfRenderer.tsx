import { FC, useCallback, useEffect, useRef, useState } from "react";
import { Document, Page } from "react-pdf";
import { FormattedMessage } from "react-intl";
import { Box, Typography } from "@mui/material";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import "pdfjs-dist/build/pdf.worker.min.mjs";

import { StyledDocumentContainer, StyledPageIndicator, StyledRoot } from "./styled";
import { DocumentError, DocumentLoading, PageLoading, ScrollToEndIndicator } from "./components";

interface IPdfRendererProps {
  fileUrl: string;
  onScrollToEnd?: () => void;
}

// Configure pdf.js worker from npm package
// pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

export const PdfRenderer: FC<IPdfRendererProps> = props => {
  const { fileUrl, onScrollToEnd } = props;
  const [numPages, setNumPages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [hasScrolledToEnd, setHasScrolledToEnd] = useState<boolean>(false);
  const [isScrollDetectionEnabled, setIsScrollDetectionEnabled] = useState<boolean>(false);
  const [pageWidth, setPageWidth] = useState<number>(600);
  const containerRef = useRef<HTMLDivElement>(null);

  // Calculate page width on mount and resize
  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.clientWidth;
        setPageWidth(Math.min(containerWidth - 40, 700));
      }
    };

    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  const onDocumentLoadSuccess = useCallback(
    ({ numPages }: { numPages: number }) => {
      setNumPages(numPages);
      setHasScrolledToEnd(false);
      setTimeout(() => {
        setIsScrollDetectionEnabled(true);
        // If content is not scrollable (fits into container), consider it as scrolled to end
        const container = containerRef.current;
        if (container) {
          const { scrollHeight, clientHeight } = container;
          if (scrollHeight <= clientHeight && !hasScrolledToEnd) {
            setHasScrolledToEnd(true);
            onScrollToEnd?.();
          }
        }
      }, 500);
    },
    [hasScrolledToEnd, onScrollToEnd],
  );

  const handleScroll = useCallback(() => {
    if (!containerRef.current || !isScrollDetectionEnabled) return;

    const container = containerRef.current;
    const scrollTop = container.scrollTop;
    const scrollHeight = container.scrollHeight;
    const clientHeight = container.clientHeight;

    // Calculate current page based on scroll position
    if (numPages > 0) {
      const pageHeight = scrollHeight / numPages;
      const newPage = Math.min(numPages, Math.floor(scrollTop / pageHeight) + 1);
      setCurrentPage(newPage);
    }

    // Check if scrolled to bottom
    const isAtBottom = scrollTop + clientHeight >= scrollHeight - 10;
    if (isAtBottom && !hasScrolledToEnd) {
      setHasScrolledToEnd(true);
      onScrollToEnd?.();
    }
  }, [numPages, hasScrolledToEnd, onScrollToEnd, isScrollDetectionEnabled]);

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
      return () => container.removeEventListener("scroll", handleScroll);
    }
    return undefined;
  }, [handleScroll]);

  const scrollToDocumentEnd = () => {
    containerRef.current?.scrollTo({
      top: containerRef.current?.scrollHeight,
      behavior: "smooth",
    });
  };

  return (
    <StyledRoot>
      {/* Page indicator */}
      {numPages > 0 && (
        <StyledPageIndicator>
          <Typography variant="subtitle1">
            <FormattedMessage id="form.pdf.pageIndicator" values={{ current: currentPage, total: numPages }} />
          </Typography>
        </StyledPageIndicator>
      )}

      {/* Scroll to end indicator */}
      {numPages > 0 && !hasScrolledToEnd && <ScrollToEndIndicator scrollToDocumentEnd={scrollToDocumentEnd} />}

      <StyledDocumentContainer ref={containerRef}>
        <Document
          file={fileUrl}
          onLoadSuccess={onDocumentLoadSuccess}
          loading={<DocumentLoading />}
          error={<DocumentError />}
          className="flex flex-col items-center gap-4"
        >
          {Array.from(new Array(numPages), (el, index) => (
            <Box key={`page_${index + 1}`} className="relative">
              <Page
                pageNumber={index + 1}
                width={pageWidth}
                className="shadow-lg rounded-lg overflow-hidden bg-white"
                renderTextLayer={true}
                renderAnnotationLayer={true}
                loading={<PageLoading pageWidth={pageWidth} />}
              />
            </Box>
          ))}
        </Document>
      </StyledDocumentContainer>
    </StyledRoot>
  );
};
