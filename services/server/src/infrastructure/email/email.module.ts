import { Module } from "@nestjs/common";

import { EmailService } from "./email.service";
import { MailjetStubService } from "./mailjet-stub.service";

@Module({
  providers: [MailjetStubService, EmailService],
  exports: [EmailService],
})
export class EmailModule {}
