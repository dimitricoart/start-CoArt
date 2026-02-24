import { Migration } from "@mikro-orm/migrations";

import { ns } from "@framework/constants";

export class RenameArtworkToAsset1765704614366 extends Migration {
  // eslint-disable-next-line @typescript-eslint/require-await
  public async up(): Promise<void> {
    this.addSql(`
        ALTER TABLE ${ns}.artwork RENAME COLUMN artwork_status TO asset_status;
    `);

    this.addSql(`
        ALTER TABLE ${ns}.artwork RENAME COLUMN artwork_type TO asset_type;
    `);

    this.addSql(`
      ALTER TABLE ${ns}.artwork RENAME TO asset;
    `);

    this.addSql(`
      ALTER TYPE ${ns}.artwork_type_enum RENAME TO asset_type_enum;
    `);

    this.addSql(`
      ALTER TYPE ${ns}.artwork_orientation_enum RENAME TO asset_orientation_enum;
    `);

    this.addSql(`
      ALTER TYPE ${ns}.artwork_status_enum RENAME TO asset_status_enum;
    `);

    this.addSql(`
      ALTER TYPE ${ns}.artwork_category_enum RENAME TO asset_category_enum;
    `);

    this.addSql(`
      ALTER TYPE ${ns}.artwork_subject_enum RENAME TO asset_subject_enum;
    `);

    this.addSql(`
      ALTER TYPE ${ns}.artwork_style_enum RENAME TO asset_style_enum;
    `);

    this.addSql(`
      ALTER TYPE ${ns}.artwork_material_enum RENAME TO asset_material_enum;
    `);

    this.addSql(`
      ALTER TYPE ${ns}.artwork_unit_enum RENAME TO asset_unit_enum;
    `);

    this.addSql(`
      ALTER TABLE ${ns}.photo RENAME COLUMN artwork_id TO asset_id;
    `);

    this.addSql(`
      ALTER TABLE ${ns}.document RENAME COLUMN artwork_id TO asset_id;
    `);

    this.addSql(`
      ALTER TABLE ${ns}.favorite RENAME COLUMN artwork_id TO asset_id;
    `);

    this.addSql(`
      ALTER TABLE ${ns}.provenance RENAME COLUMN artwork_id TO asset_id;
    `);

    this.addSql(`
      ALTER TABLE ${ns}.stripe_checkout RENAME COLUMN artwork_id TO asset_id;
    `);

    this.addSql(`
      ALTER TABLE ${ns}.paykilla RENAME COLUMN artwork_id TO asset_id;
    `);
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  public async down(): Promise<void> {
    this.addSql(`
        ALTER TABLE ${ns}.artwork RENAME COLUMN asset_status TO artwork_status;
    `);

    this.addSql(`
        ALTER TABLE ${ns}.artwork RENAME COLUMN asset_type TO artwork_type;
    `);

    this.addSql(`
      ALTER TABLE ${ns}.asset RENAME TO artwork;
    `);

    this.addSql(`
      ALTER TYPE ${ns}.asset_type_enum RENAME TO artwork_type_enum;
    `);

    this.addSql(`
      ALTER TYPE ${ns}.asset_orientation_enum RENAME TO artwork_orientation_enum;
    `);

    this.addSql(`
      ALTER TYPE ${ns}.asset_status_enum RENAME TO artwork_status_enum;
    `);

    this.addSql(`
      ALTER TYPE ${ns}.asset_category_enum RENAME TO artwork_category_enum;
    `);

    this.addSql(`
      ALTER TYPE ${ns}.asset_subject_enum RENAME TO artwork_subject_enum;
    `);

    this.addSql(`
      ALTER TYPE ${ns}.asset_style_enum RENAME TO artwork_style_enum;
    `);

    this.addSql(`
      ALTER TYPE ${ns}.asset_material_enum RENAME TO artwork_material_enum;
    `);

    this.addSql(`
      ALTER TYPE ${ns}.asset_unit_enum RENAME TO artwork_unit_enum;
    `);

    this.addSql(`
      ALTER TABLE ${ns}.photo RENAME COLUMN asset_id TO artwork_id;
    `);

    this.addSql(`
      ALTER TABLE ${ns}.document RENAME COLUMN asset_id TO artwork_id;
    `);

    this.addSql(`
      ALTER TABLE ${ns}.favorite RENAME COLUMN asset_id TO artwork_id;
    `);

    this.addSql(`
      ALTER TABLE ${ns}.provenance RENAME COLUMN asset_id TO artwork_id;
    `);

    this.addSql(`
      ALTER TABLE ${ns}.stripe_checkout RENAME COLUMN asset_id TO artwork_id;
    `);

    this.addSql(`
      ALTER TABLE ${ns}.paykilla RENAME COLUMN asset_id TO artwork_id;
    `);
  }
}
