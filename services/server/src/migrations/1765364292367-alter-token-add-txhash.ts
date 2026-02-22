import { Migration } from "@mikro-orm/migrations";

import { ns } from "@framework/constants";

export class AlterTokenAddTxHash1765364292367 extends Migration {
  // eslint-disable-next-line @typescript-eslint/require-await
  public async up(): Promise<void> {
    this.addSql(`
        ALTER TABLE ${ns}.token ADD COLUMN tx_hash varchar;
        UPDATE ${ns}.token SET tx_hash = 'N/A';
        ALTER TABLE ${ns}.token ALTER COLUMN tx_hash SET NOT NULL;
    `);
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  public async down(): Promise<void> {
    this.addSql(`
      ALTER TABLE ${ns}.token DROP COLUMN tx_hash;
    `);
  }
}
