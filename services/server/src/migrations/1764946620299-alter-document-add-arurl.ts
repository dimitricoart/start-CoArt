import { Migration } from "@mikro-orm/migrations";

import { ns } from "@framework/constants";

export class AlterDocumentAddArUrl1764946620299 extends Migration {
  // eslint-disable-next-line @typescript-eslint/require-await
  public async up(): Promise<void> {
    this.addSql(`
      ALTER TABLE ${ns}.document ADD COLUMN ar_url varchar;
      ALTER TABLE ${ns}.document ADD COLUMN content_type varchar;
    `);
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  public async down(): Promise<void> {
    this.addSql(`
      ALTER TABLE ${ns}.document DROP COLUMN ar_url;
      ALTER TABLE ${ns}.document DROP COLUMN content_type;
    `);
  }
}
