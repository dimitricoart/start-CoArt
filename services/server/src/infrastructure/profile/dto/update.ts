import type { IProfileUpdateDto } from "../interfaces";
import { UserCommonDto } from "../../../common/user-common";

export class ProfileUpdateDto extends UserCommonDto implements IProfileUpdateDto {}
