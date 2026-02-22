import { Migration } from "@mikro-orm/migrations";

import { ns } from "@framework/constants";

export class UpdateArtworks1764346894604 extends Migration {
  // eslint-disable-next-line @typescript-eslint/require-await
  public async up(): Promise<void> {
    this.addSql(`
        UPDATE ${ns}.artwork SET artwork_status = 'FINALIZED' WHERE artwork_status = 'APPROVED'
    `);
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  public async down(): Promise<void> {
    this.addSql(`
        UPDATE ${ns}.artwork SET artwork_status = 'APPROVED' WHERE artwork_status = 'FINALIZED'
    `);
  }
}
