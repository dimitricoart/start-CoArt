import { Module } from "@nestjs/common";

import { CloudVisionGcpService } from "./cloud-vision-gcp.service";
import { StorageGcpService } from "./storage-gcp.service";

@Module({
  providers: [StorageGcpService, CloudVisionGcpService],
  exports: [StorageGcpService, CloudVisionGcpService],
})
export class GoogleModule {}
