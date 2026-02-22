import { Migration } from "@mikro-orm/migrations";

import { ns } from "@framework/constants";

export class AlterUserLanguageEnum1767770279276 extends Migration {
  // eslint-disable-next-line @typescript-eslint/require-await
  public async up(): Promise<void> {
    this.addSql(`
        ALTER TYPE ${ns}.languages ADD VALUE IF NOT EXISTS 'RU';
    `);
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  public async down(): Promise<void> {
    this.addSql(`
        -- this is too complicated
    `);
  }
}
