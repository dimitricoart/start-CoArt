import { Migration } from "@mikro-orm/migrations";

import { ns } from "@framework/constants";

export class ReworkArtworkStyleEnum1765534106363 extends Migration {
  // eslint-disable-next-line @typescript-eslint/require-await
  public async up(): Promise<void> {
    this.addSql(`
      UPDATE ${ns}.artwork SET style = 'OTHER'::${ns}.artwork_style_enum;
    `);

    this.addSql(`
      ALTER TABLE ${ns}.artwork
      ALTER COLUMN style
      TYPE ${ns}.artwork_other_enum
      USING style::text::${ns}.artwork_other_enum;
    `);

    this.addSql(`
      drop type ${ns}.artwork_style_enum;
    `);

    this.addSql(`
      create type ${ns}.artwork_style_enum as enum (
        'ABSTRACT',
        'EXPRESSIONISM',
        'IMPRESSIONISM',
        'CONCEPTUAL',
        'MINIMALISM',
        'REALISM',
        'MODERN',
        'CONTEMPORARY',
        'FINE_ART',
        'POP_ART',
        'SURREALISM',
        'SYMBOLISM',
        'FIGURATIVE',
        'PRIMITIVISM',
        'ART_DECO',
        'ART_NOUVEAU',
        'VICTORIAN',
        'EDWARDIAN',
        'GEORGIAN',
        'LOUIS_XVI_EMPIRE',
        'MID_CENTURY',
        'ORIENTAL',
        'FABERGE_STYLE_OBJECTS',
        'IMPERIAL_STYLE',
        'VICTORIAN_JEWELRY',
        'MODERNIST_JEWELRY',
        'CONTEMPORARY_JEWELRY',
        'OTHER'
      );
    `);

    this.addSql(`
      ALTER TABLE ${ns}.artwork
      ALTER COLUMN style
      TYPE ${ns}.artwork_style_enum
      USING style::text::${ns}.artwork_style_enum;
    `);
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  public async down(): Promise<void> {
    this.addSql(`
      -- this is too complicated
    `);
  }
}
