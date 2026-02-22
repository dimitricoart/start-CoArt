import { readFileSync } from "node:fs";

import { ConfigService } from "@nestjs/config";
import { TurboFactory, TurboAuthenticatedClient } from "@ardrive/turbo-sdk";

export const ARWEAVE_PROVIDER = Symbol("ARWEAVE_PROVIDER");

export const arweaveProvider = {
  provide: ARWEAVE_PROVIDER,
  inject: [ConfigService],
  useFactory: (configService: ConfigService): TurboAuthenticatedClient => {
    const pathToJwk = configService.get<string>("ARWEAVE_JWK", "../../ardrive-wallet.json");
    const jwk = JSON.parse(readFileSync(pathToJwk, "utf8"));

    return TurboFactory.authenticated({
      privateKey: jwk,
    });
  },
};
