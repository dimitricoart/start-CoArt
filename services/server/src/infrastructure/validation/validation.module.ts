import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import { GoogleModule } from "../../integrations/google/google.module";

import { CloudVisionImageValidator } from "../../marketplace/photo/dto/image.validator";

@Module({
  imports: [ConfigModule, GoogleModule],
  providers: [CloudVisionImageValidator],
})
export class ValidationModule {}
