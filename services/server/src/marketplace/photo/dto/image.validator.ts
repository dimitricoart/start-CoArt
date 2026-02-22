import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from "class-validator";

import { NodeEnv } from "@framework/constants";
import { CloudVisionGcpService } from "../../../integrations/google/cloud-vision-gcp.service";

@Injectable()
@ValidatorConstraint({ async: true })
export class CloudVisionImageValidator implements ValidatorConstraintInterface {
  private reason: string;

  constructor(
    private readonly configService: ConfigService,
    private readonly cloudVisionService: CloudVisionGcpService,
  ) {}

  public async validate(value: string): Promise<boolean> {
    this.reason = await this.isValid(value);
    return !this.reason;
  }

  public defaultMessage(): string {
    return this.reason;
  }

  private async isValid(value: string): Promise<string> {
    const nodeEnv = this.configService.get<NodeEnv>("NODE_ENV", NodeEnv.development);
    if (nodeEnv === NodeEnv.test) {
      return "";
    }

    const success = await this.cloudVisionService.validate(value);
    if (success) {
      return "";
    }
    return "notSafeForWork";
  }
}

export function IsSafeForWork(validationOptions?: ValidationOptions): PropertyDecorator {
  return (object: Record<string, any>, propertyName: string | symbol): void => {
    registerDecorator({
      name: "IsSafeForWork",
      target: object.constructor,
      propertyName: propertyName as string,
      options: validationOptions,
      validator: CloudVisionImageValidator,
    });
  };
}
