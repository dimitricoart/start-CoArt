import { Controller, Get, Param, ParseUUIDPipe, Query, UseInterceptors } from "@nestjs/common";

import { NotFoundInterceptor, PaginationInterceptor } from "../../common/interceptors";
import { Public, User } from "../../common/decorators";

import { UserEntity } from "../../infrastructure/user/user.entity";
import { LedgerService } from "./ledger.service";
import type { ILedgerAutocompleteResult } from "./interfaces";
import { LedgerEntity } from "./ledger.entity";
import { LedgerSearchDto } from "./dto";

@Public()
@Controller("/ledger")
export class LedgerController {
  constructor(private readonly ledgerService: LedgerService) {}

  @Get("/")
  @UseInterceptors(PaginationInterceptor)
  public search(@Query() dto: LedgerSearchDto): Promise<[Array<LedgerEntity>, number]> {
    return this.ledgerService.search(dto);
  }

  @Get("/autocomplete")
  public autocomplete(@User() userEntity: UserEntity): Promise<Array<ILedgerAutocompleteResult>> {
    return this.ledgerService.autocomplete(userEntity);
  }

  @Get("/:ledgerId")
  @UseInterceptors(NotFoundInterceptor)
  public findOne(@Param("ledgerId", ParseUUIDPipe) ledgerId: string): Promise<LedgerEntity | null> {
    return this.ledgerService.findOneWithRelations({ id: ledgerId });
  }
}
