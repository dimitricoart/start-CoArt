import { Migration } from "@mikro-orm/migrations";

import { ns } from "@framework/constants";

export class ReworkArtworkSubjectEnum1765534106362 extends Migration {
  // eslint-disable-next-line @typescript-eslint/require-await
  public async up(): Promise<void> {
    this.addSql(`
      UPDATE ${ns}.artwork SET subject = 'OTHER'::${ns}.artwork_subject_enum;
    `);

    this.addSql(`
      ALTER TABLE ${ns}.artwork
      ALTER COLUMN subject
      TYPE ${ns}.artwork_other_enum
      USING subject::text::${ns}.artwork_other_enum;
    `);

    this.addSql(`
      drop type ${ns}.artwork_subject_enum;
    `);

    this.addSql(`
      create type ${ns}.artwork_subject_enum as enum (
        'ABSTRACT',
        'LANDSCAPE',
        'PORTRAIT',
        'PEOPLE',
        'WOMEN',
        'MEN',
        'ANIMAL',
        'NATURE',
        'CITYSCAPE',
        'STILL_LIFE',
        'FLORAL',
        'NUDE',
        'FANTASY',
        'RELIGION',
        'MYTHOLOGY',
        'ARCHITECTURE',
        'OTHER'
      );
    `);

    this.addSql(`
      ALTER TABLE ${ns}.artwork
      ALTER COLUMN subject
      TYPE ${ns}.artwork_subject_enum
      USING subject::text::${ns}.artwork_subject_enum;
    `);
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  public async down(): Promise<void> {
    this.addSql(`
      -- this is too complicated
    `);
  }
}
