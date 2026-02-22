import { Client } from "typesense";

export const typesenseClient = new Client({
  nodes: [
    {
      host: process.env.TYPESENSE_HOST || "localhost",
      port: Number(process.env.TYPESENSE_PORT) || 8108,
      protocol: process.env.TYPESENSE_PROTOCOL || "http",
    },
  ],
  apiKey: process.env.TYPESENSE_API_KEY || "",
  connectionTimeoutSeconds: 2,
});
