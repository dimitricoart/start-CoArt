import { Injectable } from "@nestjs/common";

export interface IEmailResult {
  success: boolean;
  messageId?: string;
}

@Injectable()
export class MailjetStubService {
  public async sendTemplate(_opts: {
    template: number;
    to: string[];
    replyTo?: string;
    data?: Record<string, unknown>;
  }): Promise<IEmailResult> {
    return { success: true };
  }
}
