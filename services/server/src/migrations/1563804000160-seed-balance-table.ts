import { Migration } from "@mikro-orm/migrations";

import { ns, seedWalletAddress } from "@framework/constants";

export class SeedBalanceTable1563804000160 extends Migration {
  // eslint-disable-next-line @typescript-eslint/require-await
  public async up(): Promise<void> {
    this.addSql(`
      insert into ${ns}.balance (
        account,
        amount,
        token_id
      ) values (
        '${seedWalletAddress}',
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
