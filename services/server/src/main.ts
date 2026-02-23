import "./instrument";

import * as express from "express";
import helmet from "helmet";
import { NestFactory } from "@nestjs/core";
import { NestExpressApplication } from "@nestjs/platform-express";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { ConfigService } from "@nestjs/config";
import { useContainer } from "class-validator";
import passport from "passport";

import { NodeEnv } from "@framework/constants";
import { companyName } from "@framework/constants";

import { AppModule } from "./app.module";
import { patchBigInt } from "./utils";

patchBigInt();

async function bootstrap(): Promise<void> {
  console.info("[bootstrap] Starting Nest application…");

  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    rawBody: true,
  });

  app.use(helmet({ contentSecurityPolicy: false }));
  app.use(passport.initialize());

  const configService = app.get(ConfigService);
  const nodeEnv = configService.get<NodeEnv>("NODE_ENV", NodeEnv.development);
  const baseUrl = configService.get<string>("FE_URL", "http://localhost:3002");

  const normalizeOrigin = (o: string) => o.replace(/\/+$/, "");
  const allowedOrigins = new Set(
    [
      baseUrl,
      // Production frontends
      "https://coartmarket.com",
      "https://www.coartmarket.com",
    ]
      .filter(Boolean)
      .map(normalizeOrigin),
  );

  // PUBLiC API
  app.enableCors({
    origin: (origin, callback) => {
      if (nodeEnv === NodeEnv.development || !origin) {
        return callback(null, true);
      }

      if (origin && allowedOrigins.has(normalizeOrigin(origin))) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"), false);
    },
    credentials: true,
    exposedHeaders: ["Content-Disposition"],
  });

  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  app.set("trust proxy", true);

  const options = new DocumentBuilder()
    .addBearerAuth()
    .setTitle(companyName)
    .setDescription("API description")
    .setVersion("1.0")
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup("swagger", app, document);

  if (nodeEnv === NodeEnv.production || nodeEnv === NodeEnv.staging) {
    app.enableShutdownHooks();
  }

  // Cloud Run sets PORT=8080 at runtime; prefer process.env so we never miss it
  const port =
    Number(process.env.PORT) || Number(configService.get<string>("PORT")) || 8080;
  const host =
    nodeEnv === NodeEnv.production || nodeEnv === NodeEnv.staging
      ? "0.0.0.0"
      : configService.get<string>("HOST", "localhost");

  app.set("query parser", "extended");
  app.use(express.urlencoded({ extended: true }));

  console.info(`[bootstrap] Binding to http://${host}:${port} (PORT env=${process.env.PORT ?? "not set"})`);
  await app.listen(port, host, () => {
    console.info(`[bootstrap] API server is running on http://${host}:${port}`);
  });
}

bootstrap().catch((err) => {
  console.error("[bootstrap] Fatal error:", err);
  process.exit(1);
});
