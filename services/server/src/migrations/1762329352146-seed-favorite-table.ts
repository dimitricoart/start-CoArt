import { Migration } from "@mikro-orm/migrations";

import { ns } from "@framework/constants";

import { ASSET_FINALIZED_1, ASSET_FINALIZED_2, USER_ACTIVE_1, USER_ACTIVE_2 } from "../utils/uuid";

export class SeedFavoriteTable1762329352146 extends Migration {
  // eslint-disable-next-line @typescript-eslint/require-await
  public async up(): Promise<void> {
    this.addSql(`
      insert into ${ns}.favorite (
        user_id,
        artwork_id
      ) values (
        '${USER_ACTIVE_1}',
        '${ASSET_FINALIZED_1}'
      ), (
        '${USER_ACTIVE_2}',
        '${ASSET_FINALIZED_2}'
      ), (
        '${USER_ACTIVE_2}',
        '${ASSET_FINALIZED_1}'
      );
    `);
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  public async down(): Promise<void> {
    this.addSql(`truncate table ${ns}.favorite restart identity cascade;`);
  }
}
