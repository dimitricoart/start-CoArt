import { Migration } from "@mikro-orm/migrations";

import { ns } from "@framework/constants";

export class AlterDimensionsChangeType1765800585853 extends Migration {
  // eslint-disable-next-line @typescript-eslint/require-await
  public async up(): Promise<void> {
    this.addSql(`
        ALTER TABLE ${ns}.asset
            ALTER COLUMN dimensions_height TYPE float
            USING dimensions_height::float;
    `);

    this.addSql(`
        ALTER TABLE ${ns}.asset
            ALTER COLUMN dimensions_width TYPE float
            USING dimensions_width::float;
    `);

    this.addSql(`
        ALTER TABLE ${ns}.asset
            ALTER COLUMN dimensions_depth TYPE float
            USING dimensions_depth::float;
    `);
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  public async down(): Promise<void> {
    this.addSql(`
        ALTER TABLE ${ns}.asset
            ALTER COLUMN dimensions_height TYPE int
            USING dimensions_height::int;
    `);

    this.addSql(`
        ALTER TABLE ${ns}.asset
            ALTER COLUMN dimensions_width TYPE int
            USING dimensions_width::int;
    `);

    this.addSql(`
        ALTER TABLE ${ns}.asset
            ALTER COLUMN dimensions_depth TYPE int
            USING dimensions_depth::int;
    `);
  }
}
