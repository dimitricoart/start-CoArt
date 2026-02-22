import { Inject, Injectable, Logger, LoggerService } from "@nestjs/common";
import { app } from "firebase-admin";
import { InjectRepository } from "@mikro-orm/nestjs";
import { EntityRepository } from "@mikro-orm/postgresql";

import { UserStatus } from "@framework/types";

import { UserEntity } from "../user/user.entity";
import { APP_PROVIDER } from "../auth/auth.constants";
import type { IProfileUpdateDto } from "./interfaces";

@Injectable()
export class ProfileService {
  constructor(
    @Inject(APP_PROVIDER)
    private readonly admin: app.App,
    @Inject(Logger)
    private readonly loggerService: LoggerService,
    @InjectRepository(UserEntity)
    private readonly userEntityRepository: EntityRepository<UserEntity>,
  ) {}

  public async update(userEntity: UserEntity, dto: IProfileUpdateDto): Promise<UserEntity> {
    const { email: _, ...rest } = dto;

    // UPDATE FIREBASE USER EMAIL
    // if (email && email.toString() !== userEntity.email?.toLowerCase()) {
    //   try {
    //     await this.admin.auth().updateUser(userEntity.sub, { email });
    //   } catch (err) {
    //     this.loggerService.error(err, ProfileService.name);
    //   }
    // }

    Object.assign(userEntity, rest);
    await this.userEntityRepository.getEntityManager().persist(userEntity).flush();
    return userEntity;
  }

  public async delete(userEntity: UserEntity): Promise<UserEntity> {
    Object.assign(userEntity, { userStatus: UserStatus.INACTIVE });
    await this.userEntityRepository.getEntityManager().persist(userEntity).flush();
    return userEntity;
  }
}
