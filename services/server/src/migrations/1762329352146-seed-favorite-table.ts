import { Migration } from "@mikro-orm/migrations";

import { ns } from "@framework/constants";

export class SeedFavoriteTable1762329352146 extends Migration {
  // eslint-disable-next-line @typescript-eslint/require-await
  public async up(): Promise<void> {
    this.addSql(`
      insert into ${ns}.favorite (
        user_id,
        artwork_id
      ) values (
        '00000000-0000-7000-8000-200000000001',
        '00000000-0000-7000-8000-400000000001'
      ), (
        '00000000-0000-7000-8000-200000000001',
        '00000000-0000-7000-8000-400000000002'
      ), (
        '00000000-0000-7000-8000-200000000002',
        '00000000-0000-7000-8000-400000000001'
      );
    `);
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  public async down(): Promise<void> {
    this.addSql(`truncate table ${ns}.favorite restart identity cascade;`);
  }
}
