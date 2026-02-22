import { Migration } from "@mikro-orm/migrations";

import { ns } from "@framework/constants";

export class AlterArtworkStatusEnum1764598685837 extends Migration {
  // eslint-disable-next-line @typescript-eslint/require-await
  public async up(): Promise<void> {
    this.addSql(`
        ALTER TYPE ${ns}.artwork_status_enum ADD VALUE 'REJECTED';
    `);
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  public async down(): Promise<void> {
    this.addSql(`
        -- this is too complicated
    `);
  }
}
