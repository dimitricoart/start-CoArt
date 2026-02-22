import {
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
  LoggerService,
  UnauthorizedException,
} from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt } from "passport-jwt";
import { Strategy } from "passport-firebase-jwt";
import { app } from "firebase-admin";

import { UserRole, UserStatus } from "@framework/types";
import { EnabledLanguages } from "@framework/constants";
import { emptyStateString } from "../../../utils/lexical";

import { ShowroomService } from "../../../marketplace/showroom/showroom.service";
import { UserService } from "../../user/user.service";
import { UserEntity } from "../../user/user.entity";
import { MerchantService } from "../../merchant/merchant.service";
import { APP_PROVIDER } from "../auth.constants";

@Injectable()
export class FirebaseStrategy extends PassportStrategy(Strategy, "firebase-http") {
  constructor(
    @Inject(APP_PROVIDER)
    private readonly admin: app.App,
    @Inject(Logger)
    private readonly loggerService: LoggerService,
    private readonly userService: UserService,
    private readonly merchantService: MerchantService,
    private readonly showroomService: ShowroomService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  public async validate(payload: string): Promise<UserEntity> {
    const data = await this.admin
      .auth()
      .verifyIdToken(payload, true)
      .catch(error => {
        this.loggerService.error(error);
        throw new UnauthorizedException("unauthorized");
      });

    let userEntity = await this.userService.findOne({ sub: data.sub });

    if (!userEntity) {
      const firebaseUser = await this.admin
        .auth()
        .getUser(data.sub)
        .catch(error => {
          this.loggerService.error(error);
        });

      if (!firebaseUser) {
        throw new InternalServerErrorException("internalServerError");
      }

      const colors = ["red", "green", "yellow", "blue", "purple"];
      const color = colors[Math.floor(Math.random() * colors.length)];

      const merchantEntity = await this.merchantService.import({
        email: firebaseUser.email!,
        title: firebaseUser.displayName,
        imageUrl: `https://storage.googleapis.com/coart-statics/showroom/showroom_icon_${color}.png`,
        backgroundImageUrl: `https://storage.googleapis.com/coart-statics/showroom/showroom_background_${color}.png`,
      });

      userEntity = await this.userService.import(
        {
          displayName: firebaseUser.displayName,
          email: firebaseUser.email,
          imageUrl: firebaseUser.photoURL,
          language: EnabledLanguages.EN,
          userRoles: [UserRole.OWNER],
          userStatus: UserStatus.ACTIVE,
          sub: data.sub,
        },
        merchantEntity,
      );

      await this.showroomService.create(
        {
          title: "My showroom",
          subtitle: emptyStateString,
          description: emptyStateString,
          imageUrl: `https://storage.googleapis.com/coart-statics/showroom/showroom_icon_${color}.png`,
        },
        userEntity,
        true,
      );
    }

    const roles = [UserRole.SUPER, UserRole.ADMIN, UserRole.OWNER, UserRole.MANAGER, UserRole.CUSTOMER];
    if (!userEntity.userRoles.some(role => roles.includes(role))) {
      throw new UnauthorizedException("userHasWrongRole");
    }

    if (userEntity.userStatus !== UserStatus.ACTIVE) {
      throw new UnauthorizedException("userIsNotActive");
    }

    if (data.email && !data.email_verified) {
      throw new UnauthorizedException("emailIsNotVerified");
    }

    return userEntity;
  }
}
