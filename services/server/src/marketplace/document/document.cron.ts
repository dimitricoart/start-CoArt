import { EntityRepository } from "@mikro-orm/postgresql";
import { Inject, Injectable, Logger, LoggerService } from "@nestjs/common";
import { InjectRepository } from "@mikro-orm/nestjs";
import { ConfigService } from "@nestjs/config";
import { Cron, CronExpression } from "@nestjs/schedule";
import { FilterQuery, FindAllOptions, Loaded } from "@mikro-orm/core";

import { NodeEnv } from "@framework/constants";
import { StorageGcpService } from "../../integrations/google/storage-gcp.service";

import { DocumentEntity } from "./document.entity";

@Injectable()
export class DocumentCron {
  constructor(
    @InjectRepository(DocumentEntity)
    private readonly documentEntityRepository: EntityRepository<DocumentEntity>,
    @Inject(Logger)
    private readonly loggerService: LoggerService,
    private readonly storageService: StorageGcpService,
    private readonly configService: ConfigService,
  ) {}

  public async findAll<Hint extends string = never, Fields extends string = "*">(
    where: FilterQuery<DocumentEntity>,
    options?: FindAllOptions<DocumentEntity, Hint, Fields>,
  ): Promise<Array<Loaded<DocumentEntity, Hint, Fields>>> {
    const em = this.documentEntityRepository.getEntityManager().fork();
    const repo = em.getRepository(DocumentEntity);

    return repo.findAll({ ...options, where });
  }

  @Cron(CronExpression.EVERY_DAY_AT_3AM)
  public async documents() {
    const nodeEnv = this.configService.get<NodeEnv>("NODE_ENV", NodeEnv.development);

    if (nodeEnv !== NodeEnv.staging) {
      return;
    }

    const bucket = this.configService.get<string>("GOOGLE_STORAGE_BUCKET_DOCUMENTS", "coart-documents-staging");

    const files = await this.storageService.listFiles({ bucket });

    const documentEntities = await this.findAll({}, { fields: ["fileUrl"] });

    for (const file of files) {
      const exists = documentEntities.find(d => d.fileUrl.endsWith(file.name));
      if (!exists) {
        await file.delete();
        this.loggerService.log(`Deleted obsolete file: ${bucket}/${file.name}`, DocumentCron.name);
      }
    }
  }
}
