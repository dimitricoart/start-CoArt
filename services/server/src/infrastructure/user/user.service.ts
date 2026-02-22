import { EntityRepository } from "@mikro-orm/postgresql";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@mikro-orm/nestjs";
import { FilterQuery, FindOneOptions, Loaded } from "@mikro-orm/core";

import { UserEntity } from "./user.entity";
import { IUserImportDto } from "./interfaces";
import { MerchantEntity } from "../merchant/merchant.entity";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userEntityRepository: EntityRepository<UserEntity>,
  ) {}

  public search(where: FilterQuery<UserEntity>): Promise<[Array<UserEntity>, number]> {
    return this.userEntityRepository.findAndCount(where);
  }

  public findOne<Hint extends string = never>(
    where: FilterQuery<UserEntity>,
    options?: FindOneOptions<UserEntity, Hint>,
  ): Promise<Loaded<UserEntity, Hint> | null> {
    return this.userEntityRepository.findOne(where, options);
  }

  public findAndCount(where: FilterQuery<UserEntity> = {}): Promise<[Array<UserEntity>, number]> {
    return this.userEntityRepository.findAndCount(where);
  }

  public async import(dto: IUserImportDto, merchantEntity: MerchantEntity): Promise<UserEntity> {
    const userEntity = this.userEntityRepository.create({ ...dto, merchant: merchantEntity });
    await this.userEntityRepository.getEntityManager().persist(userEntity).flush();
    return userEntity;
  }
}
