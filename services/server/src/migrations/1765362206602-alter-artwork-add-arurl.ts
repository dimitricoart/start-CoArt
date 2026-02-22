import { Migration } from "@mikro-orm/migrations";

import { ns } from "@framework/constants";

export class AlterArtworkAddArUrl1765362206602 extends Migration {
  // eslint-disable-next-line @typescript-eslint/require-await
  public async up(): Promise<void> {
    this.addSql(`
      ALTER TABLE ${ns}.artwork ADD COLUMN ar_url varchar;
    `);
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  public async down(): Promise<void> {
    this.addSql(`
      ALTER TABLE ${ns}.artwork DROP COLUMN ar_url;
    `);
  }
}
