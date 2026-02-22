import { Migration } from "@mikro-orm/migrations";

import { ns } from "@framework/constants";

export class CreateMerchantTable1562222611033 extends Migration {
  // eslint-disable-next-line @typescript-eslint/require-await
  async up(): Promise<void> {
    this.addSql(`
      CREATE TYPE ${ns}.merchant_status_enum AS ENUM (
        'ACTIVE',
        'INACTIVE',
        'PENDING'
      );
    `);

    this.addSql(`
      create table ${ns}.merchant (
        id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
        title varchar not null,
        description json not null,
        image_url varchar,
        email varchar not null unique,
        api_key uuid not null default uuid_generate_v4(),
        merchant_status ${ns}.merchant_status_enum not null default 'PENDING',
        created_at timestamptz not null default current_timestamp,
        updated_at timestamptz not null default current_timestamp
      );
    `);
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  async down(): Promise<void> {
    this.addSql(`drop table ${ns}.merchant;`);
    this.addSql(`drop type ${ns}.merchant_status_enum;`);
  }
}
