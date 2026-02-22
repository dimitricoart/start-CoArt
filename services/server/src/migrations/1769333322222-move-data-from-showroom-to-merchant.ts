import { Migration } from "@mikro-orm/migrations";

import { ns } from "@framework/constants";

export class MoveDataFromShowroomToMerchant1769333322222 extends Migration {
  // eslint-disable-next-line @typescript-eslint/require-await
  public async up(): Promise<void> {
    // priority
    this.addSql(`
      ALTER TABLE ${ns}.merchant
      ADD COLUMN priority int NOT NULL DEFAULT 0;
    `);

    this.addSql(`
      UPDATE ${ns}.merchant merchant
      SET priority = showroom.priority
      FROM ${ns}.showroom showroom
      WHERE showroom.merchant_id = merchant.id;
    `);

    this.addSql(`
      ALTER TABLE ${ns}.showroom
      DROP COLUMN priority;
    `);

    // background_image_url
    this.addSql(`
      ALTER TABLE ${ns}.merchant
      ADD COLUMN background_image_url varchar;
    `);

    this.addSql(`
      UPDATE ${ns}.merchant merchant
      SET background_image_url = showroom.background_image_url
      FROM ${ns}.showroom showroom
      WHERE showroom.merchant_id = merchant.id;
    `);

    this.addSql(`
      ALTER TABLE ${ns}.showroom 
      ALTER COLUMN background_image_url SET NOT NULL;
    `);

    this.addSql(`
      ALTER TABLE ${ns}.showroom
      DROP COLUMN background_image_url;
    `);

    // subtitle
    this.addSql(`
      ALTER TABLE ${ns}.merchant
      ADD COLUMN subtitle json;
    `);

    this.addSql(`
      UPDATE ${ns}.merchant merchant
      SET subtitle = showroom.subtitle
      FROM ${ns}.showroom showroom
      WHERE showroom.merchant_id = merchant.id;
    `);

    this.addSql(`
      ALTER TABLE ${ns}.showroom 
      ALTER COLUMN subtitle SET NOT NULL;
    `);

    // description
    this.addSql(`
      UPDATE ${ns}.merchant merchant
      SET description = showroom.description
      FROM ${ns}.showroom showroom
      WHERE showroom.merchant_id = merchant.id;
    `);

    // image_url
    this.addSql(`
      UPDATE ${ns}.merchant merchant
      SET image_url = showroom.image_url
      FROM ${ns}.showroom showroom
      WHERE showroom.merchant_id = merchant.id;
    `);
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  public async down(): Promise<void> {
    // priority
    this.addSql(`
      ALTER TABLE ${ns}.showroom
      ADD COLUMN priority int NOT NULL DEFAULT 0;
    `);

    this.addSql(`
      UPDATE ${ns}.showroom showroom
      SET priority = merchant.priority
      FROM ${ns}.merchant merchant
      WHERE showroom.merchant_id = merchant.id;
    `);

    this.addSql(`
      ALTER TABLE ${ns}.merchant
      DROP COLUMN priority;
    `);

    // background_image_url
    this.addSql(`
      ALTER TABLE ${ns}.showroom
      ADD COLUMN background_image_url varchar;
    `);

    this.addSql(`
      UPDATE ${ns}.showroom showroom
      SET background_image_url = merchant.background_image_url
      FROM ${ns}.merchant merchant
      WHERE showroom.merchant_id = merchant.id;
    `);

    this.addSql(`
      ALTER TABLE ${ns}.showroom
      ALTER COLUMN background_image_url SET NOT NULL;
    `);

    this.addSql(`
      ALTER TABLE ${ns}.merchant
      DROP COLUMN background_image_url;
    `);

    // subtitle
    this.addSql(`
      ALTER TABLE ${ns}.showroom
      ADD COLUMN subtitle json;
    `);

    this.addSql(`
      UPDATE ${ns}.showroom showroom
      SET subtitle = showroom.subtitle
      FROM ${ns}.merchant merchant
      WHERE merchant.merchant_id = merchant.id;
    `);

    this.addSql(`
      ALTER TABLE ${ns}.merchant 
      ALTER COLUMN subtitle SET NOT NULL;
    `);

    // description
    this.addSql(`
      UPDATE ${ns}.showroom showroom
      SET description = merchant.description
      FROM ${ns}.merchant merchant
      WHERE showroom.merchant_id = merchant.id;
    `);

    // image_url
    this.addSql(`
      UPDATE ${ns}.showroom showroom
      SET image_url = merchant.image_url
      FROM ${ns}.merchant merchant
      WHERE showroom.merchant_id = merchant.id;
    `);
  }
}
