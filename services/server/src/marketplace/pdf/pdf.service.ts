import { readFile } from "node:fs/promises";

import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PDFDocument } from "pdf-lib";
import fontkit from "@pdf-lib/fontkit";

import type { IAssetPurchaseDto, IAssetTokenizeDto } from "@framework/types";
import { StorageGcpService } from "../../integrations/google/storage-gcp.service";
import { getMarkdown } from "../../utils/lexical";

import { AssetEntity } from "../asset/asset.entity";
import { OfferEntity } from "../offer/offer.entity";

@Injectable()
export class PdfService {
  constructor(
    private readonly storageService: StorageGcpService,
    private readonly configService: ConfigService,
  ) {}

  public async generateListingAgreement(assetEntity: AssetEntity, dto: IAssetTokenizeDto, arHash: string) {
    const bucket = this.configService.get<string>("GOOGLE_STORAGE_BUCKET_AGREEMENTS", "coart-agreements-staging");

    const existingPdfBytes = await readFile("./static/pdf/listing_agreement_template.pdf");
    const pdfDoc = await PDFDocument.load(existingPdfBytes);
    pdfDoc.registerFontkit(fontkit);

    const fontBytes = await readFile("./static/fonts/Roboto-Regular.ttf");
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

    setTextFieldWithFont("owner1", dto.name);
    setTextFieldWithFont("owner2", dto.name);

    setTextFieldWithFont("description", getMarkdown(assetEntity.description));
    setTextFieldWithFont("provenance", `ar://${arHash}`);

    // makes PDF read-only
    form.flatten();

    const pdfBytes = await pdfDoc.save();

    return this.storageService.putObject({
      contentType: "application/pdf",
      bucket,
      content: Buffer.from(pdfBytes),
    });
  }

  public async generatePurchaseAgreement(offerEntity: OfferEntity, dto: IAssetPurchaseDto) {
    const bucket = this.configService.get<string>("GOOGLE_STORAGE_BUCKET_AGREEMENTS", "coart-agreements-staging");

    const existingPdfBytes = await readFile("./static/pdf/purchase_agreement_template.pdf");
    const pdfDoc = await PDFDocument.load(existingPdfBytes);
    pdfDoc.registerFontkit(fontkit);

    const fontBytes = await readFile("./static/fonts/Roboto-Regular.ttf");
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

    setTextFieldWithFont("seller", offerEntity.asset!.seller!);
    setTextFieldWithFont("seller2", offerEntity.asset!.seller!);
    setTextFieldWithFont("seller3", offerEntity.asset!.seller!);
    setTextFieldWithFont("buyer", dto.name);
    setTextFieldWithFont("buyer2", dto.name);
    setTextFieldWithFont("fractions1", offerEntity.fractions.toString());
    setTextFieldWithFont("fractions2", offerEntity.fractions.toString());

    setTextFieldWithFont("artwork_name", offerEntity.asset!.title);

    setTextFieldWithFont("price_per_fraction", (Number(offerEntity.price) / Number(offerEntity.fractions)).toFixed(2));
    setTextFieldWithFont("description", getMarkdown(offerEntity.asset!.description));
    setTextFieldWithFont("opinion", "N/A");

    // makes PDF read-only
    form.flatten();

    const pdfBytes = await pdfDoc.save();

    return this.storageService.putObject({
      contentType: "application/pdf",
      bucket,
      content: Buffer.from(pdfBytes),
    });
  }
}
