import { ConfigService } from "@nestjs/config";
import { Client } from "typesense";

export const TYPESENSE_PROVIDER = Symbol("TYPESENSE_PROVIDER");

export const typesenseProvider = {
  provide: TYPESENSE_PROVIDER,
  inject: [ConfigService],
  useFactory: (configService: ConfigService): Client => {
    return new Client({
      nodes: [
        {
          host: configService.get<string>("TYPESENSE_HOST", "localhost"),
          port: configService.get<number>("TYPESENSE_PORT", 8108),
          protocol: configService.get<string>("TYPESENSE_PROTOCOL", "http"),
        },
      ],
      apiKey: configService.get<string>("TYPESENSE_API_KEY", ""),
      connectionTimeoutSeconds: 2,
    });
  },
};
