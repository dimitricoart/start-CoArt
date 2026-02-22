import { Injectable, NotFoundException } from "@nestjs/common";
import { EntityRepository } from "@mikro-orm/postgresql";
import { InjectRepository } from "@mikro-orm/nestjs";
import { FilterQuery, FindOneOptions, Loaded } from "@mikro-orm/core";

import { ContractEntity } from "./contract.entity";

@Injectable()
export class ContractService {
  constructor(
    @InjectRepository(ContractEntity)
    private readonly contractEntityRepository: EntityRepository<ContractEntity>,
  ) {}

  public findOne<Hint extends string = never>(
    where: FilterQuery<ContractEntity>,
    options?: FindOneOptions<ContractEntity, Hint>,
  ): Promise<Loaded<ContractEntity, Hint> | null> {
    return this.contractEntityRepository.findOne(where, options);
  }

  public async findOneAndCheckExistence<Hint extends string = never>(
    where: FilterQuery<ContractEntity>,
    options?: FindOneOptions<ContractEntity, Hint>,
  ): Promise<Loaded<ContractEntity, Hint>> {
    const contractEntity = await this.findOne(where, options);

    if (!contractEntity) {
      throw new NotFoundException("contractNotFound");
    }

    return contractEntity;
  }
}
