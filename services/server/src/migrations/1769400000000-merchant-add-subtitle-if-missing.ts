import { Migration } from "@mikro-orm/migrations";

import { ns } from "@framework/constants";

/**
 * Ensures coart.merchant has subtitle column (e.g. when move-data migration
 * was not run in production). Idempotent: safe to run even if column exists.
 */
export class MerchantAddSubtitleIfMissing1769400000000 extends Migration {
  // eslint-disable-next-line @typescript-eslint/require-await
  public async up(): Promise<void> {
    this.addSql(`
      ALTER TABLE ${ns}.merchant
      ADD COLUMN IF NOT EXISTS subtitle json;
    `);
    this.addSql(`
      UPDATE ${ns}.merchant m
      SET subtitle = s.subtitle
      FROM ${ns}.showroom s
      WHERE s.merchant_id = m.id AND m.subtitle IS NULL;
    `);
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  public async down(): Promise<void> {
    this.addSql(`
      ALTER TABLE ${ns}.merchant
      DROP COLUMN IF EXISTS subtitle;
    `);
  }
}
