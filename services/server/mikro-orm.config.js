"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const database_config_1 = __importDefault(require("./src/infrastructure/database/database.config"));
const nodeEnv = process.env.NODE_ENV || "development";
const envPath = path_1.default.resolve(process.cwd(), `.env.${nodeEnv}`);
require("dotenv").config({ path: envPath });
function parsePostgresUrl(url) {
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
exports.default = {
    ...database_config_1.default,
    ...connection,
};
//# sourceMappingURL=mikro-orm.config.js.map