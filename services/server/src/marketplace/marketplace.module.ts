import { Module } from "@nestjs/common";

import { AssetModule } from "./asset/asset.module";
import { DocumentModule } from "./document/document.module";
import { FavoriteModule } from "./favorite/favorite.module";
import { LedgerModule } from "./ledger/ledger.module";
import { OfferModule } from "./offer/offer.module";
import { PdfModule } from "./pdf/pdf.module";
import { PhotoModule } from "./photo/photo.module";
import { ProvenanceModule } from "./provenance/provenance.module";
import { ShowroomModule } from "./showroom/showroom.module";

@Module({
  imports: [
    AssetModule,
    DocumentModule,
    FavoriteModule,
    LedgerModule,
    PdfModule,
    PhotoModule,
    ProvenanceModule,
    ShowroomModule,
    OfferModule,
  ],
})
export class MarketplaceModule {}
