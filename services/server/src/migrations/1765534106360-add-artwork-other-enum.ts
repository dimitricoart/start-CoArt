import { Migration } from "@mikro-orm/migrations";

import { ns } from "@framework/constants";

export class AddArtworkOtherEnum1765534106360 extends Migration {
  // eslint-disable-next-line @typescript-eslint/require-await
  public async up(): Promise<void> {
    this.addSql(`
      create type ${ns}.artwork_other_enum as enum (
        'OTHER'
      );
    `);

    this.addSql(`
      ALTER TYPE ${ns}.artwork_category_enum ADD VALUE 'OTHER';
    `);

    this.addSql(`
      ALTER TYPE ${ns}.artwork_subject_enum ADD VALUE 'OTHER';
    `);

    this.addSql(`
      ALTER TYPE ${ns}.artwork_style_enum ADD VALUE 'OTHER';
    `);

    this.addSql(`
      ALTER TYPE ${ns}.artwork_material_enum ADD VALUE 'OTHER';
    `);
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  public async down(): Promise<void> {
    this.addSql(`
      drop type ${ns}.artwork_other_enum;
    `);
  }
}
