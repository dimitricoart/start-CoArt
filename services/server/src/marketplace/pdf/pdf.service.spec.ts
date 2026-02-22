import { Test, TestingModule } from "@nestjs/testing";
import { ConfigModule, ConfigService } from "@nestjs/config";

import type { IAssetPurchaseDto, IAssetTokenizeDto } from "@framework/types";

import { simpleFormatting } from "../../utils/lexical";
import { GoogleModule } from "../../integrations/google/google.module";
import { PdfService } from "./pdf.service";
import { AssetEntity } from "../asset/asset.entity";
import { OfferEntity } from "../offer/offer.entity";

describe("PdfService", () => {
  let pdfService: PdfService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          envFilePath: `.env.${process.env.NODE_ENV as string}`,
        }),
        GoogleModule,
      ],
      providers: [PdfService],
    }).compile();

    pdfService = module.get<PdfService>(PdfService);
  });

  describe("generatePurchaseAgreement", () => {
    it("should generate agreement", async () => {
      const offerEntity = {
        asset: {
          title: "title",
          description: simpleFormatting,
          seller: "seller",
        },
        fractions: 1000n,
        price: 30,
      } as unknown as OfferEntity;
      const dto: IAssetPurchaseDto = { name: "buyer", isConfirmed: true };
      const pdf = await pdfService.generatePurchaseAgreement(offerEntity, dto);
      console.info(pdf);
    });
  });

  describe("generateListingAgreement", () => {
    it("should listing agreement", async () => {
      const assetEntity = {
        description: simpleFormatting,
      } as unknown as AssetEntity;
      const dto: IAssetTokenizeDto = { name: "seller", isConfirmed: true };
      const pdf = await pdfService.generateListingAgreement(assetEntity, dto, "ar-hash");
      console.info(pdf);
    });
  });
});
