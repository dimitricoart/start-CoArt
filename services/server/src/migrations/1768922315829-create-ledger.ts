import { Migration } from "@mikro-orm/migrations";

import { ns } from "@framework/constants";

export class CreateLedgerTable1768922315829 extends Migration {
  // eslint-disable-next-line @typescript-eslint/require-await
  async up(): Promise<void> {
    this.addSql(`
      create table ${ns}.ledger (
        id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
        asset_id uuid not null,
        merchant_id uuid not null,
        showroom_id uuid not null,
        fractions uint256 not null,
        created_at timestamptz not null default current_timestamp,
        updated_at timestamptz not null default current_timestamp,
        foreign key (asset_id) references ${ns}.asset (id) on delete cascade,
        foreign key (merchant_id) references ${ns}.merchant (id) on delete cascade,
        foreign key (showroom_id) references ${ns}.showroom (id) on delete cascade
      );
    `);
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  async down(): Promise<void> {
    this.addSql(`drop table ${ns}.ledger;`);
  }
}
