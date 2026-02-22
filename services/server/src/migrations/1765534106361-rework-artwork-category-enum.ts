import { Migration } from "@mikro-orm/migrations";

import { ns } from "@framework/constants";

export class ReworkArtworkCategoryEnum1765534106361 extends Migration {
  // eslint-disable-next-line @typescript-eslint/require-await
  public async up(): Promise<void> {
    this.addSql(`
      UPDATE ${ns}.artwork SET category = 'OTHER'::${ns}.artwork_category_enum;
    `);

    this.addSql(`
      ALTER TABLE ${ns}.artwork
      ALTER COLUMN category
      TYPE ${ns}.artwork_other_enum
      USING category::text::${ns}.artwork_other_enum;
    `);

    this.addSql(`
      drop type ${ns}.artwork_category_enum;
    `);

    this.addSql(`
      create type ${ns}.artwork_category_enum as enum (
        'PAINTINGS',
        'DRAWINGS',
        'MIXED_MEDIA',
        'SCULPTURE',
        'PHOTOGRAPHY',
        'PRINTS',
        'JEWELRY',
        'WATCHES',
        'PRECIOUS_OBJECTS',
        'OBJET_D_ART',
        'DECORATIVE_OBJECTS',
        'CLOCKS',
        'ICONS_AND_RELIGIOUS_OBJECTS',
        'VINTAGE_OBJECTS',
        'COINS',
        'MEDALS',
        'STAMPS',
        'TOYS',
        'SPORTS_MEMORABILIA',
        'LUXURY_GOODS',
        'RARE_ITEMS_RWA_LUXURY_ASSET_CLASS',
        'CRAFTS',
        'FOLK_ART',
        'MANUSCRIPTS',
        'BOOKS',
        'INSTRUMENTS',
        'OTHER'
      );
    `);

    this.addSql(`
      ALTER TABLE ${ns}.artwork
      ALTER COLUMN category
      TYPE ${ns}.artwork_category_enum
      USING category::text::${ns}.artwork_category_enum;
    `);
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  public async down(): Promise<void> {
    this.addSql(`
      -- this is too complicated
    `);
  }
}
