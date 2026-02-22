import { Migration } from "@mikro-orm/migrations";

import { simpleFormatting } from "../utils/lexical";
import { imageUrl, ns } from "@framework/constants";

import { MERCHANT_ACTIVE_1, MERCHANT_ACTIVE_2, MERCHANT_INACTIVE, MERCHANT_PENDING } from "../utils/uuid";

export class SeedMerchantTable1562222611044 extends Migration {
  // eslint-disable-next-line @typescript-eslint/require-await
  public async up(): Promise<void> {
    this.addSql(`
      insert into ${ns}.merchant (
        id,
        title,
        description,
        image_url,
        email,
        merchant_status
      ) values (
        '${MERCHANT_ACTIVE_1}',
        'Trej"s Shop',
        '${simpleFormatting}',
        '${imageUrl}',
        'trejgun@gmail.com',
        'ACTIVE'
      ), (
        '${MERCHANT_ACTIVE_2}',
        'Meow"s Shop',
        '${simpleFormatting}',
        '${imageUrl}',
        'meow.dao@gmail.com',
        'ACTIVE'
      ), (
        '${MERCHANT_INACTIVE}',
        'CTO"s Shop',
        '${simpleFormatting}',
        '${imageUrl}',
        'cto@fractown.com',
        'INACTIVE'
      ), (
        '${MERCHANT_PENDING}',
        'EthBerry"s Shop',
        '${simpleFormatting}',
        '${imageUrl}',
        'oleg@ethberry.io',
        'PENDING'
      );
    `);
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  public async down(): Promise<void> {
    this.addSql(`truncate table ${ns}.merchant restart identity cascade;`);
  }
}
