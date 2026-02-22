// this is needed by umzug to run *.ts migrations
import "ts-node/register";

import { Options, UnderscoreNamingStrategy } from "@mikro-orm/core";
import { SqlHighlighter } from "@mikro-orm/sql-highlighter";
import { TsMorphMetadataProvider } from "@mikro-orm/reflection";
import { PostgreSqlDriver } from "@mikro-orm/postgresql";
import { Migrator } from "@mikro-orm/migrations";

import { ns } from "@framework/constants";

import { ShowroomEntity } from "../../marketplace/showroom/showroom.entity";
import { AssetEntity } from "../../marketplace/asset/asset.entity";
import { PhotoEntity } from "../../marketplace/photo/photo.entity";
import { DocumentEntity } from "../../marketplace/document/document.entity";
import { FavoriteEntity } from "../../marketplace/favorite/favorite.entity";
import { WalletEntity } from "../../blockchain/wallet/wallet.entity";
import { ContractEntity } from "../../blockchain/hierarchy/contract/contract.entity";
import { TokenEntity } from "../../blockchain/hierarchy/token/token.entity";
import { BalanceEntity } from "../../blockchain/hierarchy/balance/balance.entity";
import { PaykillaEntity } from "../../integrations/paykilla/paykilla.entity";
import { StripeCheckoutEntity } from "../../integrations/stripe/checkout/stripe-checkout.entity";
import { OtpEntity } from "../otp/otp.entity";
import { UserEntity } from "../user/user.entity";
import { MerchantEntity } from "../merchant/merchant.entity";
import { LedgerEntity } from "../../marketplace/ledger/ledger.entity";
import { OfferEntity } from "../../marketplace/offer/offer.entity";

const config: Options = {
  extensions: [Migrator],
  driver: PostgreSqlDriver,
  entities: [
    // infrastructure
    UserEntity,
    MerchantEntity,
    OtpEntity,
    // blockchain
    ContractEntity,
    TokenEntity,
    BalanceEntity,
    WalletEntity,
    // marketplace
    ShowroomEntity,
    AssetEntity,
    PhotoEntity,
    DocumentEntity,
    FavoriteEntity,
    LedgerEntity,
    OfferEntity,
    // integrations
    PaykillaEntity,
    StripeCheckoutEntity,
  ],
  baseDir: process.cwd(),
  namingStrategy: UnderscoreNamingStrategy,
  migrations: {
    tableName: ns,
    path: "./src/migrations",
    glob: "!(*.d).{js,ts}",
    transactional: true,
    allOrNothing: false,
  },
  debug: false,
  highlighter: new SqlHighlighter(),
  metadataProvider: TsMorphMetadataProvider,
};

export default config;
