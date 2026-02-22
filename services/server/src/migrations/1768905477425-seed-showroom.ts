import { Migration } from "@mikro-orm/migrations";

import { ns } from "@framework/constants";
import { simpleFormatting } from "../utils/lexical";
import { NodeEnv } from "@framework/constants";

import { MERCHANT_ACTIVE_1 } from "../utils/uuid";

export class SeedShowroom1768905477425 extends Migration {
  // eslint-disable-next-line @typescript-eslint/require-await
  public async up(): Promise<void> {
    if (process.env.NODE_ENV !== NodeEnv.development) {
      return;
    }

    this.addSql(`
      insert into ${ns}.showroom (
        title,
        subtitle,
        description,
        priority,
        image_url,
        background_image_url,
        merchant_id,
        is_default
      ) values (
        'Trej" Showroom 2',
        '${simpleFormatting}',
        '${simpleFormatting}',
        1,
        'https://storage.googleapis.com/coart-artworks/watch.jpg',
        'https://www.saatchiart.com/saatchi-general/homepage/hybrid-2021/hp-hero-slide1-01272025-large.jpg',
        '${MERCHANT_ACTIVE_1}',
        false
      );
    `);
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  public async down(): Promise<void> {
    if (process.env.NODE_ENV !== NodeEnv.development) {
      return;
    }

    this.addSql(`
        delete from ${ns}.showroom
        where merchant_id = '${MERCHANT_ACTIVE_1}'
          and is_default = false;
    `);
  }
}
