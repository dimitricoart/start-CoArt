import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  HttpStatus,
  Injectable,
} from "@nestjs/common";
import { BaseExceptionFilter } from "@nestjs/core";
import { Response } from "express";

@Catch(BadRequestException)
@Injectable()
export class ValidationExceptionFilter extends BaseExceptionFilter {
  catch(exception: BadRequestException, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const body = exception.getResponse();

    if (typeof body === "object" && body !== null && "message" in body) {
      const msg = (body as { message: string | string[] }).message;
      const errors = Array.isArray(msg) ? msg : [msg];
      response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: HttpStatus.BAD_REQUEST,
        message: "validationFailed",
        errors,
      });
      return;
    }
    super.catch(exception, host);
  }
}
