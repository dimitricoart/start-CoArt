import { Module } from "@nestjs/common";
import { MikroOrmModule } from "@mikro-orm/nestjs";

import { OtpService } from "./otp.service";
import { OtpEntity } from "./otp.entity";

@Module({
  imports: [MikroOrmModule.forFeature([OtpEntity])],
  providers: [OtpService],
  exports: [OtpService],
})
export class OtpModule {}
