import { Migration } from "@mikro-orm/migrations";

import { ns } from "@framework/constants";

export class AlterPaykillaAddName1765270927825 extends Migration {
  // eslint-disable-next-line @typescript-eslint/require-await
  public async up(): Promise<void> {
    this.addSql(`
      ALTER TABLE ${ns}.paykilla ADD COLUMN name varchar;
      UPDATE ${ns}.paykilla SET name = '';
      ALTER TABLE ${ns}.paykilla ALTER COLUMN name SET NOT NULL;
    `);
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  public async down(): Promise<void> {
    this.addSql(`
      ALTER TABLE ${ns}.paykilla DROP COLUMN name;
    `);
  }
}
