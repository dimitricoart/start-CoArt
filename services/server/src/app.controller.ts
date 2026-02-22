import { Controller, Get, Redirect } from "@nestjs/common";

import { Public } from "./common/decorators";

@Public()
@Controller("/")
export class AppController {
  @Get("/")
  @Redirect("/swagger", 301)
  public redirect(): void {
    // should be empty
  }
}
