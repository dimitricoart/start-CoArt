import { Body, Query, Controller, Get, Param, ParseUUIDPipe, Post, Put, UseInterceptors } from "@nestjs/common";
import { ApiBearerAuth } from "@nestjs/swagger";

import { NotFoundInterceptor, PaginationInterceptor } from "../../common/interceptors";
import { Public, User } from "../../common/decorators";

import { UserEntity } from "../../infrastructure/user/user.entity";
import { ShowroomEntity } from "./showroom.entity";
import { ShowroomService } from "./showroom.service";
import { ShowroomCreateDto, ShowroomSearchDto, ShowroomUpdateDto } from "./dto";

@ApiBearerAuth()
@Controller("/showrooms")
export class ShowroomController {
  constructor(private readonly showroomService: ShowroomService) {}

  @Public()
  @Get("/")
  @UseInterceptors(PaginationInterceptor)
  public search(@Query() dto: ShowroomSearchDto): Promise<[Array<ShowroomEntity>, number]> {
    return this.showroomService.search(dto);
  }

  @Get("/autocomplete")
  public autocomplete(@User() userEntity: UserEntity): Promise<Array<ShowroomEntity>> {
    return this.showroomService.autocomplete(userEntity);
  }

  @Public()
  @Get("/:showroomId")
  @UseInterceptors(NotFoundInterceptor)
  public findOne(
    @Param("showroomId", ParseUUIDPipe) showroomId: string,
    @User() userEntity: UserEntity,
  ): Promise<ShowroomEntity | null> {
    return this.showroomService.findOneAndCheckStatus({ id: showroomId }, userEntity);
  }

  @Post("/")
  public create(@Body() dto: ShowroomCreateDto, @User() userEntity: UserEntity): Promise<ShowroomEntity> {
    return this.showroomService.create(dto, userEntity, false);
  }

  @Put("/:showroomId")
  public update(
    @Param("showroomId", ParseUUIDPipe) showroomId: string,
    @Body() dto: ShowroomUpdateDto,
    @User() userEntity: UserEntity,
  ): Promise<ShowroomEntity> {
    return this.showroomService.update({ id: showroomId }, dto, userEntity);
  }
}
