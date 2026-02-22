import { Migration } from "@mikro-orm/migrations";

import { ns } from "@framework/constants";

export class AlterAssetDropPrice1769158903243 extends Migration {
  // eslint-disable-next-line @typescript-eslint/require-await
  public async up(): Promise<void> {
    this.addSql(`
        ALTER TABLE ${ns}.asset DROP COLUMN price;
    `);
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  public async down(): Promise<void> {
    this.addSql(`
        ALTER TABLE ${ns}.asset ADD COLUMN price int;
        UPDATE ${ns}.asset SET price = 0;
        ALTER TABLE ${ns}.asset ALTER COLUMN price SET NOT NULL;
    `);
  }
}
