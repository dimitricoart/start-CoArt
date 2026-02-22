import { ApiProperty } from "@nestjs/swagger";
import { Equals, IsBoolean } from "class-validator";

import { IWalletCreateDto } from "@framework/types";

export class WalletCreateDto implements IWalletCreateDto {
  @ApiProperty()
  @IsBoolean({ message: "badInput" })
  @Equals(true, { message: "valueMissing" })
  public isConfirmed: boolean;
}
