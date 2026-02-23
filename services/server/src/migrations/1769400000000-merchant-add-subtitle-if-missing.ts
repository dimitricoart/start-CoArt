import { Migration } from "@mikro-orm/migrations";

import { ns } from "@framework/constants";

/**
 * Ensures coart.merchant has subtitle column (e.g. when move-data migration
 * was not run in production).
 *
 * Data safety:
 * - Only adds a column (ADD COLUMN IF NOT EXISTS). Does not drop or alter
 *   any existing columns — all existing merchant and showroom data is preserved.
 * - Type matches showroom.subtitle (json). Backfill only where merchant.subtitle
 *   is NULL; never overwrites existing values.
 * - Idempotent: safe to run even if the column already exists.
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
      FROM (
        SELECT DISTINCT ON (merchant_id) merchant_id, subtitle
        FROM ${ns}.showroom
        ORDER BY merchant_id, is_default DESC, id
      ) s
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
