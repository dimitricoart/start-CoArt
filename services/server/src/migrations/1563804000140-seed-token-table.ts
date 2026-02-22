import { Migration } from "@mikro-orm/migrations";

import { ns } from "@framework/constants";

export class SeedTokenTable1563804000140 extends Migration {
  // eslint-disable-next-line @typescript-eslint/require-await
  public async up(): Promise<void> {
    this.addSql(`
      insert into ${ns}.token (
        id,
        amount,
        contract_id,
        token_status,
        token_id
      ) values (
        1,
        10000,
        1,
        'MINTED',
        4
      );
    `);
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  public async down(): Promise<void> {
    this.addSql(`truncate table ${ns}.token restart identity cascade;`);
  }
}
