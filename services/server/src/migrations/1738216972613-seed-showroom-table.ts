import { Migration } from "@mikro-orm/migrations";

import { simpleFormatting } from "../utils/lexical";
import { ns } from "@framework/constants";

import {
  MERCHANT_ACTIVE_1,
  MERCHANT_ACTIVE_2,
  MERCHANT_INACTIVE,
  MERCHANT_PENDING,
  SHOWROOM_1,
  SHOWROOM_2,
  SHOWROOM_3,
  SHOWROOM_4,
} from "../utils/uuid";

export class SeedShowroomTable1738216972613 extends Migration {
  // eslint-disable-next-line @typescript-eslint/require-await
  public async up(): Promise<void> {
    this.addSql(`
      insert into ${ns}.showroom (
        id,
        title,
        description,
        priority,
        image_url,
        background_image_url,
        merchant_id
      ) values (
        '${SHOWROOM_1}',
        'Trej" Showroom',
        '${simpleFormatting}',
        1,
        'https://storage.googleapis.com/coart-artworks/watch.jpg',
        'https://www.saatchiart.com/saatchi-general/homepage/hybrid-2021/hp-hero-slide1-01272025-large.jpg',
        '${MERCHANT_ACTIVE_1}'
      ), (
        '${SHOWROOM_2}',
        'Meow Dao"s Showroom',
        '${simpleFormatting}',
        3,
        'https://storage.googleapis.com/coart-artworks/lith.jpg',
        'https://www.saatchiart.com/saatchi-general/homepage/2020/hero/hybrid-hero-slide3-large.jpg',
        '${MERCHANT_ACTIVE_2}'
      ), (
        '${SHOWROOM_3}',
        'CTO"s Showroom',
        '${simpleFormatting}',
        0,
        'https://www.saatchiart.com/saatchi-general/homepage/2020/hero/hybrid-hero-slide3-large.jpg',
        'https://www.saatchiart.com/saatchi-general/homepage/2020/hero/hybrid-hero-slide3-large.jpg',
        '${MERCHANT_INACTIVE}'
      ), (
        '${SHOWROOM_4}',
        'EthBerry"s Showroom',
        '${simpleFormatting}',
        0,
        'https://www.saatchiart.com/saatchi-general/homepage/hybrid-2021/HP-slide-2-new-2022-large.jpg',
        'https://www.saatchiart.com/saatchi-general/homepage/hybrid-2021/HP-slide-2-new-2022-large.jpg',
        '${MERCHANT_PENDING}'
      );
    `);
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  public async down(): Promise<void> {
    this.addSql(`truncate table ${ns}.showroom restart identity cascade;`);
  }
}
