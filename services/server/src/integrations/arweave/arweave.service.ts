import { Inject, Injectable, Logger, LoggerService } from "@nestjs/common";
import { TurboAuthenticatedClient } from "@ardrive/turbo-sdk";
import { ConfigService } from "@nestjs/config";

import { StorageGcpService } from "../google/storage-gcp.service";
import { getMarkdown } from "../../utils/lexical";

import { AssetEntity } from "../../marketplace/asset/asset.entity";
import { DocumentEntity } from "../../marketplace/document/document.entity";
import { ARWEAVE_PROVIDER } from "./arweave.provider";

@Injectable()
export class ArweaveService {
  constructor(
    @Inject(Logger)
    private readonly loggerService: LoggerService,
    @Inject(ARWEAVE_PROVIDER)
    private readonly turbo: TurboAuthenticatedClient,
    private readonly storageService: StorageGcpService,
    private readonly configService: ConfigService,
  ) {}

  public async uploadAsset(assetEntity: AssetEntity) {
    for (const document of assetEntity.documents) {
      await this.uploadDocument(document);
    }

    return this.uploadIndex(assetEntity);
  }

  public async uploadDocument(document: DocumentEntity) {
    const bucket = this.configService.get<string>("GOOGLE_STORAGE_BUCKET_DOCUMENTS", "coart-documents-staging");

    const objectName = document.fileUrl.split("/").pop()!;
    const file = await this.storageService.getObject({ objectName, bucket });

    const [buffer] = await file.download();
    const [metadata] = await file.getMetadata();
    const contentType = metadata.contentType || "application/octet-stream";

    const { id } = await this.uploadFile(buffer, contentType);
    Object.assign(document, { arUrl: `ar://${id}`, contentType });
  }

  public async uploadFile(buffer: Buffer, contentType: string) {
    return this.turbo.upload({
      data: buffer,
      dataItemOpts: {
        tags: [
          {
            name: "Content-Type",
            value: contentType,
          },
        ],
      },
      events: {
        onError: error => {
          this.loggerService.error(error);
        },
      },
    });
  }

  public async uploadIndex(assetEntity: AssetEntity) {
    const baseUrl = this.configService.get<string>("FE_URL", "http://localhost:3002");

    const index = {
      version: 1,
      previousRevision: null,
      name: assetEntity.title,
      description: getMarkdown(assetEntity.description),
      externalUrl: `${baseUrl}/asset/${assetEntity.id}`,
      files: assetEntity.documents.map((document: DocumentEntity) => ({
        caption: document.caption,
        contentType: document.contentType,
        src: document.arUrl,
      })),
    };

    return this.turbo.upload({
      data: JSON.stringify(index),
      dataItemOpts: {
        tags: [
          {
            name: "Content-Type",
            value: "application/json",
          },
        ],
      },
      events: {
        onError: error => {
          this.loggerService.error(error);
        },
      },
    });
  }
}
