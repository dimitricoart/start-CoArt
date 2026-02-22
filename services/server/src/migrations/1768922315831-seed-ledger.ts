import { Migration } from "@mikro-orm/migrations";

import { ns } from "@framework/constants";

export class SeedLedgerTable1768922315831 extends Migration {
  // eslint-disable-next-line @typescript-eslint/require-await
  public async up(): Promise<void> {
    this.addSql(`
        insert into ${ns}.ledger (asset_id,
                                  merchant_id,
                                  showroom_id,
                                  fractions)
        select asset.id          as asset_id,
               asset.merchant_id as merchant_id,
               showroom.id       as showroom_id,
               asset.fractions   as fractions
        from ${ns}.asset asset
                 join ${ns}.merchant merchant
                      on merchant.id = asset.merchant_id
                 join ${ns}.showroom showroom
                      on showroom.merchant_id = merchant.id
                          and showroom.is_default = true
    `);
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  public async down(): Promise<void> {
    this.addSql(`truncate table ${ns}.ledger restart identity cascade;`);
  }
}
