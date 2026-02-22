import { Migration } from "@mikro-orm/migrations";

import { ns } from "@framework/constants";

import {
  ASSET_DECLINED_1,
  ASSET_DECLINED_2,
  ASSET_FINALIZED_1,
  ASSET_FINALIZED_2,
  ASSET_FINALIZED_3,
  ASSET_FINALIZED_4,
  ASSET_FINALIZED_5,
  ASSET_FINALIZED_6,
  ASSET_NEW_1,
  ASSET_NEW_2,
  ASSET_NEW_3,
} from "../utils/uuid";

export class SeedPhotoTable1738237445775 extends Migration {
  // eslint-disable-next-line @typescript-eslint/require-await
  public async up(): Promise<void> {
    this.addSql(`
      insert into ${ns}.photo (
        caption,
        image_url,
        priority,
        artwork_id
      ) values (
        'Photo #1',
        'https://www.saatchiart.com/saatchi-general/homepage/hybrid-2021/hp-hero-slide1-01272025-large.jpg',
        0,
        '${ASSET_FINALIZED_1}'
      ), (
        'Photo #2',
        'https://www.saatchiart.com/saatchi-general/homepage/hybrid-2021/hp-hero-slide1-01272025-large.jpg',
        1,
        '${ASSET_FINALIZED_1}'
      ), (
        'Photo #3',
        'https://www.saatchiart.com/saatchi-general/homepage/hybrid-2021/hp-hero-slide1-01272025-large.jpg',
        2,
        '${ASSET_FINALIZED_1}'
      ), (
        'Photo #4',
        'https://www.saatchiart.com/saatchi-general/homepage/hybrid-2021/hp-hero-slide1-01272025-large.jpg',
        0,
        '${ASSET_FINALIZED_2}'
      ), (
        'Photo #5',
        'https://www.saatchiart.com/saatchi-general/homepage/hybrid-2021/hp-hero-slide1-01272025-large.jpg',
        0,
        '${ASSET_FINALIZED_3}'
      ), (
        'Photo #6',
        'https://www.saatchiart.com/saatchi-general/homepage/hybrid-2021/hp-hero-slide1-01272025-large.jpg',
        0,
        '${ASSET_FINALIZED_4}'
      ), (
        'Photo #7',
        'https://www.saatchiart.com/saatchi-general/homepage/hybrid-2021/hp-hero-slide1-01272025-large.jpg',
        0,
        '${ASSET_FINALIZED_5}'
      ), (
        'Photo #8',
        'https://www.saatchiart.com/saatchi-general/homepage/hybrid-2021/hp-hero-slide1-01272025-large.jpg',
        0,
        '${ASSET_FINALIZED_6}'
      ), (
        'Photo #9',
        'https://www.saatchiart.com/saatchi-general/homepage/hybrid-2021/hp-hero-slide1-01272025-large.jpg',
        0,
        '${ASSET_DECLINED_1}'
      ), (
        'Photo #10',
        'https://www.saatchiart.com/saatchi-general/homepage/hybrid-2021/hp-hero-slide1-01272025-large.jpg',
        0,
        '${ASSET_DECLINED_2}'
      ), (
        'Photo #11',
        'https://www.saatchiart.com/saatchi-general/homepage/hybrid-2021/hp-hero-slide1-01272025-large.jpg',
        0,
        '${ASSET_NEW_1}'
      ), (
        'Photo #12',
        'https://www.saatchiart.com/saatchi-general/homepage/hybrid-2021/hp-hero-slide1-01272025-large.jpg',
        0,
        '${ASSET_NEW_2}'
      ), (
        'Photo #13',
        'https://www.saatchiart.com/saatchi-general/homepage/hybrid-2021/hp-hero-slide1-01272025-large.jpg',
        0,
        '${ASSET_NEW_3}'
      );
    `);
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  public async down(): Promise<void> {
    this.addSql(`truncate table ${ns}.photo restart identity cascade;`);
  }
}
