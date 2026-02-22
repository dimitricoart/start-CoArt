import path from "path";

import type { Options } from "@mikro-orm/core";

import config from "./src/infrastructure/database/database.config";

const nodeEnv = process.env.NODE_ENV || "development";
const envPath = path.resolve(process.cwd(), `.env.${nodeEnv}`);
require("dotenv").config({ path: envPath });

function parsePostgresUrl(url: string): {
  host: string;
  port: number;
  user: string;
  password: string;
  dbName: string;
} {
  const u = new URL(url);
  return {
    host: u.hostname,
    port: u.port ? parseInt(u.port, 10) : 5432,
    user: decodeURIComponent(u.username),
    password: decodeURIComponent(u.password),
    dbName: u.pathname.replace(/^\//, "") || "coart-development",
  };
}

const url = process.env.POSTGRES_URL;
const fromUrl = url ? parsePostgresUrl(url) : null;

const connection = fromUrl
  ? fromUrl
  : {
      host: process.env.POSTGRES_HOST || "localhost",
      port: parseInt(process.env.POSTGRES_PORT || "5432", 10),
      user: process.env.POSTGRES_USER || "postgres",
      password: process.env.POSTGRES_PASSWORD || "",
      dbName: process.env.POSTGRES_DB || "coart-development",
    };

export default {
  ...config,
  ...connection,
} as Options;
