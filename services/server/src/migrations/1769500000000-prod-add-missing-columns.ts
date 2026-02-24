import { Migration } from "@mikro-orm/migrations";

import { ns } from "@framework/constants";

/**
 * Adds columns that exist in code but may be missing in production DB
 * (when older migrations were not run). Only ADD + backfill where safe; never drops data.
 *
 * - merchant: priority (default 0), background_image_url (default '') — no backfill from showroom
 *   (showroom may not have those columns in prod).
 * - asset: merchant_id (backfill from showroom via showroom_id).
 *
 * Safe: idempotent (IF NOT EXISTS), preserves all existing data and types.
 */
export class ProdAddMissingColumns1769500000000 extends Migration {
  // eslint-disable-next-line @typescript-eslint/require-await
  public async up(): Promise<void> {
    // --- merchant: priority, background_image_url (subtitle done in 1769400000000) ---
    this.addSql(`
      ALTER TABLE ${ns}.merchant
      ADD COLUMN IF NOT EXISTS priority int NOT NULL DEFAULT 0;
    `);
    this.addSql(`
      ALTER TABLE ${ns}.merchant
      ADD COLUMN IF NOT EXISTS background_image_url varchar;
    `);
    this.addSql(`
      UPDATE ${ns}.merchant SET background_image_url = '' WHERE background_image_url IS NULL;
    `);
    this.addSql(`
      ALTER TABLE ${ns}.merchant
      ALTER COLUMN background_image_url SET DEFAULT '';
    `);
    this.addSql(`
      ALTER TABLE ${ns}.merchant
      ALTER COLUMN background_image_url SET NOT NULL;
    `);

    // --- asset: merchant_id (backfill from showroom; do not drop showroom_id) ---
    this.addSql(`
      ALTER TABLE ${ns}.asset
      ADD COLUMN IF NOT EXISTS merchant_id uuid;
    `);

    this.addSql(`
      UPDATE ${ns}.asset a
      SET merchant_id = s.merchant_id
      FROM ${ns}.showroom s
      WHERE s.id = a.showroom_id AND a.merchant_id IS NULL;
    `);

    this.addSql(`
      ALTER TABLE ${ns}.asset
      ALTER COLUMN merchant_id SET NOT NULL;
    `);

    this.addSql(`
      DO $$
      BEGIN
        IF NOT EXISTS (
          SELECT 1 FROM pg_constraint c
          WHERE c.conname = 'asset_merchant_id_fkey'
          AND c.conrelid = '${ns}.asset'::regclass
        ) THEN
          ALTER TABLE ${ns}.asset
          ADD CONSTRAINT asset_merchant_id_fkey
          FOREIGN KEY (merchant_id) REFERENCES ${ns}.merchant(id);
        END IF;
      END $$;
    `);
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  public async down(): Promise<void> {
    this.addSql(`
      ALTER TABLE ${ns}.asset DROP CONSTRAINT IF EXISTS asset_merchant_id_fkey;
    `);
    this.addSql(`
      ALTER TABLE ${ns}.asset DROP COLUMN IF EXISTS merchant_id;
    `);
    this.addSql(`
      ALTER TABLE ${ns}.merchant DROP COLUMN IF EXISTS priority;
    `);
    this.addSql(`
      ALTER TABLE ${ns}.merchant DROP COLUMN IF EXISTS background_image_url;
    `);
  }
}
