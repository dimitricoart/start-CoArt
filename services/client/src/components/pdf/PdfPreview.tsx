import { FC, lazy, Suspense, useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";

import { IOffer, IAsset, IAssetTokenizeDto } from "@framework/types";

import { PdfPlaceholder } from "./PdfPlaceholder";
import { isPdfJsSupported } from "./utils";
import { generatePurchaseAgreement, generateListingAgreement, IDocument } from "./pdf";
import { DocumentPrepare } from "./components";

// Lazy-load so react-pdf chunk only loads when we actually show a PDF (avoids undefined module in main/vendors).
const PdfRenderer = lazy(() => import("./PdfRenderer").then(m => ({ default: m.PdfRenderer })));

interface IPdfPreviewProps {
  document: IDocument;
  onScrollToEnd?: () => void;
  onPdfNotSupported?: () => void;
  offer?: IOffer;
  asset?: IAsset;
}

export const PdfPreview: FC<IPdfPreviewProps> = props => {
  const { document, onScrollToEnd, onPdfNotSupported, offer, asset } = props;
  const [pdfUrl, setPdfUrl] = useState<string>("");
  const [isPdfSupported, setIsPdfSupported] = useState<boolean | null>(null);

  const form = useFormContext<IAssetTokenizeDto>();
  const name = form.watch("name");

  useEffect(() => {
    void (async () => {
      try {
        const isSupported = await isPdfJsSupported();
        setIsPdfSupported(isSupported);
        if (!isSupported) {
          onPdfNotSupported?.();
        }
      } catch {
        setIsPdfSupported(false);
        onPdfNotSupported?.();
      }
    })();
  }, [onPdfNotSupported]);

  useEffect(() => {
    void (async () => {
      const pdfDoc = await (asset
        ? generateListingAgreement(name, document, asset)
        : generatePurchaseAgreement(name, document, offer!));
      const pdfBytes = await pdfDoc.save();
      const pdfBlob = new Blob([new Uint8Array(pdfBytes)], {
        type: "application/pdf",
      });
      setPdfUrl(URL.createObjectURL(pdfBlob));
    })();
  }, [name]);

  if (!pdfUrl || !asset) {
    return <DocumentPrepare />;
  }

  // Если PDF.js не поддерживается, показываем placeholder
  if (isPdfSupported === false) {
    return <PdfPlaceholder fileUrl={pdfUrl} onScrollToEnd={onScrollToEnd} />;
  }

  return (
    <Suspense fallback={<DocumentPrepare />}>
      <PdfRenderer fileUrl={pdfUrl} onScrollToEnd={onScrollToEnd} />
    </Suspense>
  );
};
