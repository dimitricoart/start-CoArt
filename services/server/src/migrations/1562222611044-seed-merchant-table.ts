import { Migration } from "@mikro-orm/migrations";

import { imageUrl, ns } from "@framework/constants";

const EMPTY_LEXICAL = '{"root":{"children":[],"direction":null,"format":"","indent":0,"type":"root","version":1}}';

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
        '00000000-0000-7000-8000-100000000001',
        'Trej"s Shop',
        '${EMPTY_LEXICAL}',
        '${imageUrl}',
        'trejgun@gmail.com',
        'ACTIVE'
      ), (
        '00000000-0000-7000-8000-100000000002',
        'Meow"s Shop',
        '${EMPTY_LEXICAL}',
        '${imageUrl}',
        'meow.dao@gmail.com',
        'ACTIVE'
      ), (
        '00000000-0000-7000-8000-100000000003',
        'CTO"s Shop',
        '${EMPTY_LEXICAL}',
        '${imageUrl}',
        'cto@fractown.com',
        'INACTIVE'
      ), (
        '00000000-0000-7000-8000-100000000004',
        'Demo Shop',
        '${EMPTY_LEXICAL}',
        '${imageUrl}',
        'owner@example.com',
        'PENDING'
      );
    `);
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  public async down(): Promise<void> {
    this.addSql(`truncate table ${ns}.merchant restart identity cascade;`);
  }
}
