import crypto from "crypto";

import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class PrivateKeyService {
  constructor(private readonly configService: ConfigService) {}

  /*
   * AES-256-GCM encrypt
   */
  public encryptPrivateKey(privateKey: string): string {
    const masterKey = this.configService.get<string>("MASTER_KEY", "");

    const iv = crypto.randomBytes(32);
    const cipher = crypto.createCipheriv("aes-256-gcm", Buffer.from(masterKey, "hex"), iv, { authTagLength: 16 });

    const plaintext = Buffer.from(privateKey.replace(/^0x/, ""), "hex");
    const encrypted = Buffer.concat([cipher.update(plaintext), cipher.final()]);
    const tag = cipher.getAuthTag();

    return [iv.toString("base64"), tag.toString("base64"), encrypted.toString("base64")].join(".");
  }

  /*
   * AES-256-GCM decrypt
   */
  public decryptPrivateKey(payload: string): string {
    const masterKey = this.configService.get<string>("MASTER_KEY", "");

    const [ivB64, tagB64, ctB64] = payload.split(".");
    if (!ivB64 || !tagB64 || !ctB64) {
      throw new Error("Invalid payload format");
    }

    const iv = Buffer.from(ivB64, "base64");
    const tag = Buffer.from(tagB64, "base64");
    const ct = Buffer.from(ctB64, "base64");

    const decipher = crypto.createDecipheriv("aes-256-gcm", Buffer.from(masterKey, "hex"), iv, {
      authTagLength: 16,
    });
    decipher.setAuthTag(tag);

    const decrypted = Buffer.concat([decipher.update(ct), decipher.final()]);
    return "0x" + decrypted.toString("hex");
  }
}
