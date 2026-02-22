import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Injectable()
export class PaginationInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<{ data: unknown[]; total: number }> {
    return next.handle().pipe(
      map((value: unknown) => {
        if (Array.isArray(value) && value.length === 2 && typeof value[1] === "number") {
          return { data: value[0] as unknown[], total: value[1] as number };
        }
        return value as { data: unknown[]; total: number };
      }),
    );
  }
}
