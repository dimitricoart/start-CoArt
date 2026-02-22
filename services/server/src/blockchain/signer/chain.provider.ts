import { ConfigService } from "@nestjs/config";
import { defineChain } from "viem";
import { polygon } from "viem/chains";

import { NodeEnv } from "@framework/constants";

export const CHAIN_PROVIDER = Symbol("CHAIN_PROVIDER");

export const chainProvider = {
  provide: CHAIN_PROVIDER,
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => {
    const nodeEnv = configService.get<NodeEnv>("NODE_ENV", NodeEnv.development);
    const rpcUrl = configService.get<string>("RPC_URL", "http://localhost:8545/");

    const polygonWithRpc = defineChain({
      ...polygon,
      rpcUrls: {
        default: {
          http: [rpcUrl],
        },
      },
    });

    switch (nodeEnv) {
      case NodeEnv.production:
      case NodeEnv.staging:
      case NodeEnv.test:
      case NodeEnv.development:
      default:
        return polygonWithRpc;
    }
  },
};
