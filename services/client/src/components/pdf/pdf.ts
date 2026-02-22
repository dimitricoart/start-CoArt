import { PDFDocument } from "pdf-lib";
import fontkit from "@pdf-lib/fontkit";

import { IAsset, IOffer } from "@framework/types";
import { emptyStateString, getMarkdown } from "../../libs/lexical-utils";

export interface IDocument {
  url: string;
  type: "seller" | "buyer";
}

export const generateListingAgreement = async (name: string, document: IDocument, asset: IAsset) => {
  try {
    const existingPdfBytes = await fetch(document.url).then(res => res.arrayBuffer());
    const pdfDoc = await PDFDocument.load(existingPdfBytes);
    pdfDoc.registerFontkit(fontkit);

    const fontBytes = await fetch("/fonts/Roboto-Regular.ttf").then(res => res.arrayBuffer());
    const customFont = await pdfDoc.embedFont(fontBytes);

    const form = pdfDoc.getForm();

    const setTextFieldWithFont = (fieldName: string, text: string) => {
      const field = form.getTextField(fieldName);
      field.setText(text);
      field.updateAppearances(customFont);
    };

    setTextFieldWithFont(
      "effective_date",
      new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "2-digit",
      }),
    );

    if (name) {
      setTextFieldWithFont("owner1", name);
      setTextFieldWithFont("owner2", name);
    }

    setTextFieldWithFont("description", getMarkdown(asset?.description || emptyStateString));
    setTextFieldWithFont("provenance", asset?.agreementUrl || "");

    // makes PDF read-only
    form.flatten();

    return pdfDoc;
  } catch (error) {
    console.error(error);
    // captureException(error);
    throw error;
  }
};

export const generatePurchaseAgreement = async (name: string, document: IDocument, offer: IOffer) => {
  try {
    const existingPdfBytes = await fetch(document.url).then(res => res.arrayBuffer());
    const pdfDoc = await PDFDocument.load(existingPdfBytes);
    pdfDoc.registerFontkit(fontkit);

    const fontBytes = await fetch("/fonts/Roboto-Regular.ttf").then(res => res.arrayBuffer());
    const customFont = await pdfDoc.embedFont(fontBytes);

    const form = pdfDoc.getForm();

    const setTextFieldWithFont = (fieldName: string, text: string) => {
      const field = form.getTextField(fieldName);
      field.setText(text);
      field.updateAppearances(customFont);
    };

    setTextFieldWithFont(
      "effective_date",
      new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "2-digit",
      }),
    );

    setTextFieldWithFont(
      "agreement_date",
      new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "2-digit",
      }),
    );

    setTextFieldWithFont("seller", offer.asset?.seller || "");
    setTextFieldWithFont("seller2", offer.asset?.seller || "");
    setTextFieldWithFont("seller3", offer.asset?.seller || "");

    setTextFieldWithFont("buyer", name);
    setTextFieldWithFont("buyer2", name);

    setTextFieldWithFont("fractions1", (offer.asset?.fractions || 0n).toString());
    setTextFieldWithFont("fractions2", (offer.asset?.fractions || 0n).toString());

    setTextFieldWithFont("artwork_name", offer.asset?.title || "");

    setTextFieldWithFont("price_per_fraction", (Number(offer.price) / Number(offer.fractions)).toFixed(2));
    setTextFieldWithFont("description", getMarkdown(offer.asset?.description || emptyStateString));
    setTextFieldWithFont("opinion", "N/A");

    // makes PDF read-only
    form.flatten();

    return pdfDoc;
  } catch (error) {
    console.error(error);
    // captureException(error);
    throw error;
  }
};
