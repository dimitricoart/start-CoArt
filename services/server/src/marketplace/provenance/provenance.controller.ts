import { Controller, Get, Query, UseInterceptors } from "@nestjs/common";

import { PaginationInterceptor } from "../../common/interceptors";
import { Public } from "../../common/decorators";
import { PaginationDto } from "../../common/dto";

import { ProvenanceEntity } from "./provenance.entity";
import { ProvenanceService } from "./provenance.service";
import { ProvenanceSearchDto } from "./dto";

@Public()
@Controller("/provenance")
export class ProvenanceController {
  constructor(private readonly provenanceService: ProvenanceService) {}

  @Get("/")
  @UseInterceptors(PaginationInterceptor)
  public search(@Query() dto: ProvenanceSearchDto): Promise<[Array<ProvenanceEntity>, number]> {
    return this.provenanceService.search(dto);
  }

  @Get("/recent")
  @UseInterceptors(PaginationInterceptor)
  public recent(@Query() dto: PaginationDto): Promise<[Array<ProvenanceEntity>, number]> {
    return this.provenanceService.recent(dto);
  }
}
