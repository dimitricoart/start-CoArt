import { FC, useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";

import { IOffer, IAsset, IAssetTokenizeDto } from "@framework/types";

import { PdfRenderer } from "./PdfRenderer";
import { generatePurchaseAgreement, generateListingAgreement, IDocument } from "./pdf";
import { DocumentPrepare } from "./components";

interface IPdfPreviewProps {
  document: IDocument;
  onScrollToEnd?: () => void;
  onPdfNotSupported?: () => void;
  offer?: IOffer;
  asset?: IAsset;
}

export const PdfPreview: FC<IPdfPreviewProps> = props => {
  const { document, onScrollToEnd, offer, asset } = props;
  const [pdfUrl, setPdfUrl] = useState<string>("");

  const form = useFormContext<IAssetTokenizeDto>();
  const name = form.watch("name");

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

  return <PdfRenderer fileUrl={pdfUrl} onScrollToEnd={onScrollToEnd} />;
};
