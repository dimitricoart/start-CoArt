import { Migration } from "@mikro-orm/migrations";

import { ns } from "@framework/constants";

export class CreateOfferTable1768923308027 extends Migration {
  // eslint-disable-next-line @typescript-eslint/require-await
  async up(): Promise<void> {
    this.addSql(`
      CREATE TYPE ${ns}.offer_status_enum AS ENUM (
        'AVAILABLE',
        'TXAWAIT',
        'PAID',
        'DELETED'
      );
    `);

    this.addSql(`
      create table ${ns}.offer (
        id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
        asset_id uuid not null,
        merchant_id uuid not null,
        price int not null,
        fractions uint256 not null,
        offer_status ${ns}.offer_status_enum not null default 'AVAILABLE',
        created_at timestamptz not null default current_timestamp,
        updated_at timestamptz not null default current_timestamp,
        foreign key (asset_id) references ${ns}.asset (id) on delete cascade,
        foreign key (merchant_id) references ${ns}.merchant (id) on delete cascade
      );
    `);
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  async down(): Promise<void> {
    this.addSql(`drop table ${ns}.offer;`);
    this.addSql(`drop type ${ns}.offer_status_enum;`);
  }
}
