import { Migration } from "@mikro-orm/migrations";

import { ns } from "@framework/constants";

const SEED_WALLET = "0x0000000000000000000000000000000000000001";

export class SeedBalanceTable1563804000160 extends Migration {
  // eslint-disable-next-line @typescript-eslint/require-await
  public async up(): Promise<void> {
    this.addSql(`
      insert into ${ns}.balance (
        account,
        amount,
        token_id
      ) values (
        '${SEED_WALLET}',
        10,
        1
      );
    `);
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  public async down(): Promise<void> {
    this.addSql(`truncate table ${ns}.balance restart identity cascade;`);
  }
}
