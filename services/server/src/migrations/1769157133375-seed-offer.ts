import { Migration } from "@mikro-orm/migrations";

import { ns } from "@framework/constants";

export class SeedOfferTable1769157133375 extends Migration {
  // eslint-disable-next-line @typescript-eslint/require-await
  public async up(): Promise<void> {
    this.addSql(`
        INSERT INTO ${ns}.offer (
            asset_id,
            merchant_id,
            price,
            fractions,
            offer_status
        )
        SELECT
            asset.id,
            asset.merchant_id,
            asset.price,
            asset.fractions,
            'AVAILABLE'::${ns}.offer_status_enum
        FROM ${ns}.asset asset
        WHERE asset.asset_status = 'FINALIZED'
    `);
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  public async down(): Promise<void> {
    this.addSql(`truncate table ${ns}.offer restart identity cascade;`);
  }
}
