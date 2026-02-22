import { Logger, Module, OnModuleInit } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import { TypesenseService } from "./typesense.service";
import { typesenseProvider } from "./typesence.provider";

@Module({
  imports: [ConfigModule],
  providers: [typesenseProvider, TypesenseService],
  exports: [TypesenseService],
})
export class TypesenseModule implements OnModuleInit {
  private readonly logger = new Logger(TypesenseModule.name);

  constructor(private typesenseService: TypesenseService) {}

  async onModuleInit() {
    try {
      await this.typesenseService.initializeCollections();
    } catch (err) {
      this.logger.warn(
        "Typesense is unavailable (ECONNREFUSED or similar). Search will not work until Typesense is running (e.g. docker compose up -d typesense)."
      );
    }
  }
}
