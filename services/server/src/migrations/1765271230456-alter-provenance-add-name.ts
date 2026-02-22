import { Migration } from "@mikro-orm/migrations";

import { ns } from "@framework/constants";

export class AlterProvenanceAddName1765271230456 extends Migration {
  // eslint-disable-next-line @typescript-eslint/require-await
  public async up(): Promise<void> {
    this.addSql(`
      ALTER TABLE ${ns}.provenance ADD COLUMN name varchar;
      UPDATE ${ns}.provenance SET name = '';
      ALTER TABLE ${ns}.provenance ALTER COLUMN name SET NOT NULL;
    `);
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  public async down(): Promise<void> {
    this.addSql(`
      ALTER TABLE ${ns}.provenance DROP COLUMN name;
    `);
  }
}
