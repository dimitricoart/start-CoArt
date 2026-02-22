import { Module } from "@nestjs/common";

import { TypesenseModule } from "./typesense/typesense.module";
import { PaykillaModule } from "./paykilla/paykilla.module";
import { SafeWalletModule } from "./safe-wallet/safe-wallet.module";
import { ArweaveModule } from "./arweave/arweave.module";
import { GoogleModule } from "./google/google.module";
import { StripeModule } from "./stripe/stripe.module";

@Module({
  imports: [TypesenseModule, PaykillaModule, SafeWalletModule, ArweaveModule, GoogleModule, StripeModule],
})
export class IntegrationsModule {}
