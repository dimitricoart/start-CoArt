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
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    rawBody: true,
  });

  app.use(helmet({ contentSecurityPolicy: false }));
  app.use(passport.initialize());

  const configService = app.get(ConfigService);
  const nodeEnv = configService.get<NodeEnv>("NODE_ENV", NodeEnv.development);
  const baseUrl = configService.get<string>("FE_URL", "http://localhost:3002");

  // PUBLiC API
  app.enableCors({
    origin: (origin, callback) => {
      if (nodeEnv === NodeEnv.development || !origin || origin === baseUrl) {
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

  const port = configService.get<string>("PORT", "3001");
  const host =
    nodeEnv === NodeEnv.production || nodeEnv === NodeEnv.staging
      ? "0.0.0.0"
      : configService.get<string>("HOST", "localhost");

  app.set("query parser", "extended");
  app.use(express.urlencoded({ extended: true }));

  await app.listen(Number(port), host, () => {
    console.info(`API server is running on http://${host}:${port}`);
  });
}

void bootstrap();
