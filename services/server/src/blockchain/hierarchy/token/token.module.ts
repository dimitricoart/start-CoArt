import { Module } from "@nestjs/common";
import { MikroOrmModule } from "@mikro-orm/nestjs";

import { SignerModule } from "../../signer/signer.module";
import { ContractModule } from "../contract/contract.module";
import { TokenEntity } from "./token.entity";
import { TokenService } from "./token.service";

@Module({
  imports: [ContractModule, SignerModule, MikroOrmModule.forFeature([TokenEntity])],
  providers: [TokenService],
  exports: [TokenService],
})
export class TokenModule {}
