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
  const dbName = u.pathname.replace(/^\//, "").split("/").filter(Boolean).pop() || "coart-development";
  const user = decodeURIComponent(u.username || "postgres");
  const password = decodeURIComponent(u.password || "");

  const socketHost = u.searchParams.get("host");
  if (socketHost && socketHost.startsWith("/")) {
    return {
      host: socketHost,
      port: 5432,
      user,
      password,
      dbName,
    };
  }

  const host = decodeURIComponent(u.hostname || "");
  return {
    host: host || "localhost",
    port: u.port ? parseInt(u.port, 10) : 5432,
    user,
    password,
    dbName,
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
