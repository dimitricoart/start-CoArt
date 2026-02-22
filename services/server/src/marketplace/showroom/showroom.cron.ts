import { EntityRepository } from "@mikro-orm/postgresql";
import { Inject, Injectable, Logger, LoggerService } from "@nestjs/common";
import { InjectRepository } from "@mikro-orm/nestjs";
import { ConfigService } from "@nestjs/config";
import { Cron, CronExpression } from "@nestjs/schedule";
import { FilterQuery, FindAllOptions, Loaded } from "@mikro-orm/core";

import { NodeEnv } from "@framework/constants";
import { StorageGcpService } from "../../integrations/google/storage-gcp.service";

import { ShowroomEntity } from "./showroom.entity";

@Injectable()
export class ShowroomCron {
  constructor(
    @InjectRepository(ShowroomEntity)
    private readonly showroomEntityRepository: EntityRepository<ShowroomEntity>,
    @Inject(Logger)
    private readonly loggerService: LoggerService,
    private readonly storageService: StorageGcpService,
    private readonly configService: ConfigService,
  ) {}

  public async findAll<Hint extends string = never, Fields extends string = "*">(
    where: FilterQuery<ShowroomEntity>,
    options?: FindAllOptions<ShowroomEntity, Hint, Fields>,
  ): Promise<Array<Loaded<ShowroomEntity, Hint, Fields>>> {
    const em = this.showroomEntityRepository.getEntityManager().fork();
    const repo = em.getRepository(ShowroomEntity);

    return repo.findAll({ ...options, where });
  }

  @Cron(CronExpression.EVERY_DAY_AT_3AM)
  public async showrooms() {
    const nodeEnv = this.configService.get<NodeEnv>("NODE_ENV", NodeEnv.development);

    if (nodeEnv !== NodeEnv.staging) {
      return;
    }

    const bucket = this.configService.get<string>("GOOGLE_STORAGE_BUCKET_SHOWROOMS", "coart-showrooms-staging");

    const files = await this.storageService.listFiles({ bucket });

    const showroomEntities = await this.findAll({}, { fields: ["imageUrl"] });

    for (const file of files) {
      const exists = showroomEntities.find(d => d.imageUrl.endsWith(file.name));
      if (!exists) {
        await file.delete();
        this.loggerService.log(`Deleted obsolete file: ${bucket}/${file.name}`, ShowroomCron.name);
      }
    }
  }
}
