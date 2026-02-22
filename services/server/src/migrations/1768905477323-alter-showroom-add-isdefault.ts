import { Migration } from "@mikro-orm/migrations";

import { ns } from "@framework/constants";

export class AlterShowroomAddIsDefault1768905477323 extends Migration {
  // eslint-disable-next-line @typescript-eslint/require-await
  public async up(): Promise<void> {
    this.addSql(`
        ALTER TABLE ${ns}.showroom ADD COLUMN is_default boolean default true NOT NULL;
    `);
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  public async down(): Promise<void> {
    this.addSql(`
        ALTER TABLE ${ns}.showroom DROP COLUMN is_default;
    `);
  }
}
