import { Injectable, InternalServerErrorException } from "@nestjs/common";

import { EmailType } from "./interfaces";
import { IEmailResult, MailjetStubService } from "./mailjet-stub.service";

@Injectable()
export class EmailService {
  constructor(private readonly mailjetService: MailjetStubService) {}

  public sendEmail(template: EmailType, payload: Record<string, any>): Promise<IEmailResult> {
    switch (template) {
      case EmailType.PROPOSE_YOUR_PRICE: {
        return this.mailjetService.sendTemplate({
          template: 7576959,
          to: [payload.seller.email],
          replyTo: payload.replyTo,
          data: {
            replyTo: payload.replyTo,
            displayName: payload.seller.title,
            message: payload.message,
          },
        });
      }
      case EmailType.LISTING_AGREEMENT: {
        return this.mailjetService.sendTemplate({
          template: 7570530,
          to: [payload.seller.email],
          data: {
            displayName: payload.seller.title,
            agreementUrl: payload.agreementUrl,
          },
        });
      }
      case EmailType.PURCHASE_AGREEMENT: {
        return this.mailjetService.sendTemplate({
          template: 7570534,
          to: [payload.buyer.email],
          data: {
            displayName: payload.buyer.title,
            agreementUrl: payload.agreementUrl,
          },
        });
      }
      case EmailType.LOW_BALANCE: {
        return this.mailjetService.sendTemplate({
          template: 7591991,
          to: ["dimitri@fractown.com", "cto@fractown.com"],
          data: {
            chain: payload.chain,
            address: payload.address,
          },
        });
      }
      default:
        throw new InternalServerErrorException();
    }
  }
}
