import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import { GoogleModule } from "../../integrations/google/google.module";

import { PdfService } from "./pdf.service";

@Module({
  imports: [ConfigModule, GoogleModule],
  providers: [PdfService],
  exports: [PdfService],
})
export class PdfModule {}
