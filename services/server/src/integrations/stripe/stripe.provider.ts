import { ConfigService } from "@nestjs/config";
import { Stripe } from "stripe";

export const STRIPE_PROVIDER = Symbol("STRIPE_PROVIDER");

export const stripeProvider = {
  provide: STRIPE_PROVIDER,
  inject: [ConfigService],
  useFactory: (configService: ConfigService): Stripe => {
    return new Stripe(configService.get<string>("STRIPE_SECRET_KEY", "sk_test"));
  },
};
