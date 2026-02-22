import { EntityRepository } from "@mikro-orm/postgresql";
import { Inject, Injectable, Logger, LoggerService } from "@nestjs/common";
import { InjectRepository } from "@mikro-orm/nestjs";
import { ConfigService } from "@nestjs/config";
import { Cron, CronExpression } from "@nestjs/schedule";
import { FilterQuery, FindAllOptions, Loaded } from "@mikro-orm/core";

import { NodeEnv } from "@framework/constants";
import { StorageGcpService } from "../../integrations/google/storage-gcp.service";

import { MerchantEntity } from "./merchant.entity";

@Injectable()
export class MerchantCron {
  constructor(
    @InjectRepository(MerchantEntity)
    private readonly merchantEntityRepository: EntityRepository<MerchantEntity>,
    @Inject(Logger)
    private readonly loggerService: LoggerService,
    private readonly storageService: StorageGcpService,
    private readonly configService: ConfigService,
  ) {}

  public async findAll<Hint extends string = never, Fields extends string = "*">(
    where: FilterQuery<MerchantEntity>,
    options?: FindAllOptions<MerchantEntity, Hint, Fields>,
  ): Promise<Array<Loaded<MerchantEntity, Hint, Fields>>> {
    const em = this.merchantEntityRepository.getEntityManager().fork();
    const repo = em.getRepository(MerchantEntity);

    return repo.findAll({ ...options, where });
  }

  @Cron(CronExpression.EVERY_DAY_AT_3AM)
  public async merchants() {
    const nodeEnv = this.configService.get<NodeEnv>("NODE_ENV", NodeEnv.development);

    if (nodeEnv !== NodeEnv.staging) {
      return;
    }

    const bucket = this.configService.get<string>("GOOGLE_STORAGE_BUCKET_MERCHANTS", "coart-merchants-staging");

    const files = await this.storageService.listFiles({ bucket });

    const merchantEntities = await this.findAll({}, { fields: ["imageUrl", "backgroundImageUrl"] });

    for (const file of files) {
      const exists = merchantEntities.find(
        d => d.imageUrl.endsWith(file.name) || d.backgroundImageUrl.endsWith(file.name),
      );
      if (!exists) {
        await file.delete();
        this.loggerService.log(`Deleted obsolete file: ${bucket}/${file.name}`, MerchantCron.name);
      }
    }
  }
}
