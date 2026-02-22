import { Migration } from "@mikro-orm/migrations";

import { ns } from "@framework/constants";

export class AlterStripeCheckoutAddName1765271164712 extends Migration {
  // eslint-disable-next-line @typescript-eslint/require-await
  public async up(): Promise<void> {
    this.addSql(`
      ALTER TABLE ${ns}.stripe_checkout ADD COLUMN name varchar;
      UPDATE ${ns}.stripe_checkout SET name = '';
      ALTER TABLE ${ns}.stripe_checkout ALTER COLUMN name SET NOT NULL;
    `);
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  public async down(): Promise<void> {
    this.addSql(`
      ALTER TABLE ${ns}.stripe_checkout DROP COLUMN name;
    `);
  }
}
