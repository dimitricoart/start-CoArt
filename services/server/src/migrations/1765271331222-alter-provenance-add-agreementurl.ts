import { Migration } from "@mikro-orm/migrations";

import { ns } from "@framework/constants";

export class AlterProvenanceAddAgreementUrl1765271331222 extends Migration {
  // eslint-disable-next-line @typescript-eslint/require-await
  public async up(): Promise<void> {
    this.addSql(`
      ALTER TABLE ${ns}.provenance ADD COLUMN agreement_url varchar;
      UPDATE ${ns}.provenance SET agreement_url = '';
      ALTER TABLE ${ns}.provenance ALTER COLUMN agreement_url SET NOT NULL;
    `);
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  public async down(): Promise<void> {
    this.addSql(`
      ALTER TABLE ${ns}.provenance DROP COLUMN agreement_url;
    `);
  }
}
