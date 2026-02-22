import { Module } from "@nestjs/common";

import { StripeCheckoutModule } from "./checkout/stripe-checkout.module";

@Module({
  imports: [StripeCheckoutModule],
})
export class StripeModule {}
