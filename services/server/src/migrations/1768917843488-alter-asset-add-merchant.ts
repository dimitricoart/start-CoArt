import { Migration } from "@mikro-orm/migrations";

import { ns } from "@framework/constants";

export class AlterAssetAddMerchant1768917843488 extends Migration {
  // eslint-disable-next-line @typescript-eslint/require-await
  public async up(): Promise<void> {
    this.addSql(`
        ALTER TABLE ${ns}.asset ADD COLUMN merchant_id uuid;

        UPDATE ${ns}.asset a
            SET merchant_id = s.merchant_id
            FROM ${ns}.showroom s
            WHERE s.id = a.showroom_id;

        ALTER TABLE ${ns}.asset 
            ALTER COLUMN merchant_id SET NOT NULL;

        ALTER TABLE ${ns}.asset
            ADD CONSTRAINT asset_merchant_id_fkey
            FOREIGN KEY (merchant_id) REFERENCES ${ns}.merchant(id);

        DROP INDEX IF EXISTS ${ns}.asset_showroom_id_fkey;

        ALTER TABLE ${ns}.asset 
            DROP COLUMN showroom_id;
    `);
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  public async down(): Promise<void> {
    this.addSql(`
        ALTER TABLE ${ns}.asset
            ADD COLUMN showroom_id uuid;

        UPDATE ${ns}.asset a
            SET showroom_id = s.id
            FROM ${ns}.showroom s
            WHERE s.merchant_id = a.merchant_id;

        ALTER TABLE ${ns}.asset
            ALTER COLUMN showroom_id SET NOT NULL;

        ALTER TABLE ${ns}.asset
            ADD CONSTRAINT asset_showroom_id_fkey
            FOREIGN KEY (showroom_id) REFERENCES ${ns}.showroom (id);

        DROP INDEX IF EXISTS ${ns}.asset_merchant_id_fkey;

        ALTER TABLE ${ns}.asset
            DROP COLUMN merchant_id;
    `);
  }
}
