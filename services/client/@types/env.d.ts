import { NodeEnv } from "@framework/constants";

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: NodeEnv;
      PORT: number;
      HOST: string;

      BE_URL: string;

      FIREBASE_API_KEY: string;
      FIREBASE_AUTH_DOMAIN: string;
      FIREBASE_PROJECT_ID: string;
      FIREBASE_STORAGE_BUCKET: string;
      FIREBASE_MESSAGE_SENDER_ID: string;
      FIREBASE_APP_ID: string;
      FIREBASE_MEASUREMENT_ID: string;

      TYPESENSE_HOST: string;
      TYPESENSE_PORT: string;
      TYPESENSE_PROTOCOL: string;
      TYPESENSE_API_KEY: string;

      SENTRY_DNS: string;

      GOOGLE_STORAGE_BUCKET_AGREEMENTS: string;
      GOOGLE_STORAGE_BUCKET_ARTWORKS: string;
      GOOGLE_STORAGE_BUCKET_ASSETS: string;
      GOOGLE_STORAGE_BUCKET_AVATARS: string;
      GOOGLE_STORAGE_BUCKET_DOCUMENTS: string;
      GOOGLE_STORAGE_BUCKET_MERCHANTS: string;
      GOOGLE_STORAGE_BUCKET_SHOWROOMS: string;
      GOOGLE_STORAGE_BUCKET_STATIC: string;
    }
  }
}
export = NodeJS;
