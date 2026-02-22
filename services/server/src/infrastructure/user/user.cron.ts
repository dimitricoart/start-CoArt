import { EntityRepository } from "@mikro-orm/postgresql";
import { Inject, Injectable, Logger, LoggerService } from "@nestjs/common";
import { InjectRepository } from "@mikro-orm/nestjs";
import { ConfigService } from "@nestjs/config";
import { Cron, CronExpression } from "@nestjs/schedule";
import { FilterQuery, FindAllOptions, Loaded } from "@mikro-orm/core";

import { NodeEnv } from "@framework/constants";
import { StorageGcpService } from "../../integrations/google/storage-gcp.service";

import { UserEntity } from "./user.entity";

@Injectable()
export class UserCron {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userEntityRepository: EntityRepository<UserEntity>,
    @Inject(Logger)
    private readonly loggerService: LoggerService,
    private readonly storageService: StorageGcpService,
    private readonly configService: ConfigService,
  ) {}

  public async findAll<Hint extends string = never, Fields extends string = "*">(
    where: FilterQuery<UserEntity>,
    options?: FindAllOptions<UserEntity, Hint, Fields>,
  ): Promise<Array<Loaded<UserEntity, Hint, Fields>>> {
    const em = this.userEntityRepository.getEntityManager().fork();
    const repo = em.getRepository(UserEntity);

    return repo.findAll({ ...options, where });
  }

  @Cron(CronExpression.EVERY_DAY_AT_3AM)
  public async documents() {
    const nodeEnv = this.configService.get<NodeEnv>("NODE_ENV", NodeEnv.development);

    if (nodeEnv !== NodeEnv.staging) {
      return;
    }

    const bucket = this.configService.get<string>("GOOGLE_STORAGE_BUCKET_AVATARS", "coart-avatars-staging");

    const files = await this.storageService.listFiles({ bucket });

    const userEntities = await this.findAll({}, { fields: ["imageUrl"] });

    for (const file of files) {
      const exists = userEntities.find(d => d.imageUrl?.endsWith(file.name));
      if (!exists) {
        await file.delete();
        this.loggerService.log(`Deleted obsolete file: ${bucket}/${file.name}`, UserCron.name);
      }
    }
  }
}
