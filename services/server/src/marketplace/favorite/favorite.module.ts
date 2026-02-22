import { Module } from "@nestjs/common";
import { MikroOrmModule } from "@mikro-orm/nestjs";

import { AssetModule } from "../asset/asset.module";
import { FavoriteService } from "./favorite.service";
import { FavoriteEntity } from "./favorite.entity";
import { FavoriteController } from "./favorite.controller";

@Module({
  imports: [AssetModule, MikroOrmModule.forFeature([FavoriteEntity])],
  providers: [FavoriteService],
  controllers: [FavoriteController],
  exports: [FavoriteService],
})
export class FavoriteModule {}
