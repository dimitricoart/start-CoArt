import { Controller, Get, UseInterceptors } from "@nestjs/common";

import { PaginationInterceptor } from "../../common/interceptors";
import { Roles } from "../../common/decorators";
import { UserRole } from "@framework/types";

import { DocumentEntity } from "./document.entity";
import { DocumentService } from "./document.service";

@Controller("/documents")
export class DocumentController {
  constructor(private readonly documentService: DocumentService) {}

  @Get("/")
  @Roles(UserRole.SUPER, UserRole.ADMIN)
  @UseInterceptors(PaginationInterceptor)
  public search(): Promise<[Array<DocumentEntity>, number]> {
    return this.documentService.findAndCount({});
  }
}
