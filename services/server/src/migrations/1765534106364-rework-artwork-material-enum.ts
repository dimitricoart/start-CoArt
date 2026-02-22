import { Migration } from "@mikro-orm/migrations";

import { ns } from "@framework/constants";

export class ReworkArtworkMaterialEnum1765534106361 extends Migration {
  // eslint-disable-next-line @typescript-eslint/require-await
  public async up(): Promise<void> {
    this.addSql(`
      UPDATE ${ns}.artwork SET material = 'OTHER'::${ns}.artwork_material_enum;
    `);

    this.addSql(`
      ALTER TABLE ${ns}.artwork
      ALTER COLUMN material
      TYPE ${ns}.artwork_other_enum
      USING material::text::${ns}.artwork_other_enum;
    `);

    this.addSql(`
      drop type ${ns}.artwork_material_enum;
    `);

    this.addSql(`
      create type ${ns}.artwork_material_enum as enum (
        'OIL_ON_CANVAS',
        'ACRYLIC_ON_CANVAS',
        'TEMPERA',
        'WATERCOLOR',
        'GOUACHE',
        'ENCAUSTIC',
        'MIXED_MEDIA',
        'DIGITAL_PRINT',
        'LITHOGRAPH',
        'ETCHING',
        'GOLD',
        'SILVER',
        'PLATINUM',
        'ENAMEL',
        'DIAMONDS',
        'RUBIES',
        'SAPPHIRES',
        'PRECIOUS_STONES',
        'SEMI_PRECIOUS_STONES',
        'PORCELAIN',
        'GLASS',
        'BRONZE',
        'MARBLE',
        'WOOD',
        'STAINLESS_STEEL',
        'OTHER'
      );
    `);

    this.addSql(`
      ALTER TABLE ${ns}.artwork
      ALTER COLUMN material
      TYPE ${ns}.artwork_material_enum
      USING material::text::${ns}.artwork_material_enum;
    `);
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  public async down(): Promise<void> {
    this.addSql(`
      -- this is too complicated
    `);
  }
}
