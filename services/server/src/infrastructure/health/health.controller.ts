import { Controller, Get } from "@nestjs/common";
import {
  HealthCheck,
  HealthCheckResult,
  HealthCheckService,
  HealthIndicatorResult,
  MikroOrmHealthIndicator,
} from "@nestjs/terminus";
// import { RedisManager } from "@liaoliaots/nestjs-redis";
// import { RedisHealthIndicator } from "@liaoliaots/nestjs-redis-health";

import { Public } from "../../common/decorators";

@Public()
// @SkipThrottle({ default: true })
@Controller("/health")
export class HealthController {
  constructor(
    private readonly health: HealthCheckService,
    private readonly db: MikroOrmHealthIndicator,
    // private readonly redisIndicator: RedisHealthIndicator,
    // private readonly redisManager: RedisManager,
  ) {}

  @Get()
  @HealthCheck()
  readiness(): Promise<HealthCheckResult> {
    return this.health.check([
      async (): Promise<HealthIndicatorResult> =>
        this.db.pingCheck("Postgres", {
          timeout: 1200,
        }),
      // async (): Promise<HealthIndicatorResult> =>
      //   this.redisIndicator.checkHealth("Redis", {
      //     type: "redis",
      //     client: this.redisManager.getClient(THROTTLE_STORE),
      //   }),
    ]);
  }
}
