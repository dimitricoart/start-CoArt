import { Migration } from "@mikro-orm/migrations";

import { ns } from "@framework/constants";

const EMPTY_LEXICAL = '{"root":{"children":[],"direction":null,"format":"","indent":0,"type":"root","version":1}}';

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
        '00000000-0000-7000-8000-300000000001',
        'Trej" Showroom',
        '${EMPTY_LEXICAL}',
        1,
        'https://storage.googleapis.com/coart-artworks/watch.jpg',
        'https://www.saatchiart.com/saatchi-general/homepage/hybrid-2021/hp-hero-slide1-01272025-large.jpg',
        '00000000-0000-7000-8000-100000000001'
      ), (
        '00000000-0000-7000-8000-300000000002',
        'Meow Dao"s Showroom',
        '${EMPTY_LEXICAL}',
        3,
        'https://storage.googleapis.com/coart-artworks/lith.jpg',
        'https://www.saatchiart.com/saatchi-general/homepage/2020/hero/hybrid-hero-slide3-large.jpg',
        '00000000-0000-7000-8000-100000000002'
      ), (
        '00000000-0000-7000-8000-300000000003',
        'CTO"s Showroom',
        '${EMPTY_LEXICAL}',
        0,
        'https://www.saatchiart.com/saatchi-general/homepage/2020/hero/hybrid-hero-slide3-large.jpg',
        'https://www.saatchiart.com/saatchi-general/homepage/2020/hero/hybrid-hero-slide3-large.jpg',
        '00000000-0000-7000-8000-100000000003'
      ), (
        '00000000-0000-7000-8000-300000000004',
        'Fourth Showroom',
        '${EMPTY_LEXICAL}',
        0,
        'https://www.saatchiart.com/saatchi-general/homepage/hybrid-2021/HP-slide-2-new-2022-large.jpg',
        'https://www.saatchiart.com/saatchi-general/homepage/hybrid-2021/HP-slide-2-new-2022-large.jpg',
        '00000000-0000-7000-8000-100000000004'
      );
    `);
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  public async down(): Promise<void> {
    this.addSql(`truncate table ${ns}.showroom restart identity cascade;`);
  }
}
