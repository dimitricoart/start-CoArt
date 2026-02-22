import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import { PrivateKeyService } from "./private-key.service";

@Module({
  imports: [ConfigModule],
  providers: [PrivateKeyService],
  exports: [PrivateKeyService],
})
export class PrivateKeyModule {}
