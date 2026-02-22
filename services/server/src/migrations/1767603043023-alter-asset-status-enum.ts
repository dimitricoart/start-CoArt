import { Migration } from "@mikro-orm/migrations";

import { ns } from "@framework/constants";

export class AlterAssetStatusEnum1767603043023 extends Migration {
  // eslint-disable-next-line @typescript-eslint/require-await
  public async up(): Promise<void> {
    this.addSql(`
        ALTER TYPE ${ns}.asset_status_enum ADD VALUE 'TXAWAIT';
    `);
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  public async down(): Promise<void> {
    this.addSql(`
        -- this is too complicated
    `);
  }
}
