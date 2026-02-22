import { randomBytes } from "crypto";

import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@mikro-orm/nestjs";
import { FilterQuery } from "@mikro-orm/core";
import { EntityRepository } from "@mikro-orm/postgresql";

import { OtpType } from "@framework/types";

import { OtpEntity } from "./otp.entity";
import { UserEntity } from "../user/user.entity";

@Injectable()
export class OtpService {
  constructor(
    @InjectRepository(OtpEntity)
    private readonly tokenEntityRepository: EntityRepository<OtpEntity>,
  ) {}

  public findOne(where: FilterQuery<OtpEntity>): Promise<OtpEntity | null> {
    return this.tokenEntityRepository.findOne(where, {
      populate: ["user"],
    });
  }

  public async getToken(type: OtpType, userEntity: UserEntity): Promise<OtpEntity> {
    let tokenEntity = await this.tokenEntityRepository.findOne({
      type,
      user: userEntity,
    });

    if (tokenEntity) {
      // update timestamps
      await this.tokenEntityRepository.getEntityManager().flush();
      return tokenEntity;
    } else {
      tokenEntity = this.tokenEntityRepository.create({
        code: randomBytes(3).toString("hex").toUpperCase(),
        type,
        user: userEntity,
      });

      await this.tokenEntityRepository.getEntityManager().persist(tokenEntity).flush();

      return tokenEntity;
    }
  }

  public remove(tokenEntity: OtpEntity): Promise<void> {
    return this.tokenEntityRepository.getEntityManager().remove(tokenEntity).flush();
  }
}
