import { Body, Controller, Get, Post } from "@nestjs/common";
import { ApiBearerAuth } from "@nestjs/swagger";

import { TestService } from "./test.service";
import { TestDto } from "./dto";

@ApiBearerAuth()
@Controller("/test")
export class TestController {
  constructor(private readonly testService: TestService) {}

  // @Public()
  @Post("/")
  public update(@Body() dto: TestDto): Promise<boolean> {
    return this.testService.test(dto);
  }

  // @Public()
  @Get("/sentry")
  public getError() {
    throw new Error("My first Sentry error!");
  }
}
