import { Migration } from "@mikro-orm/migrations";

import { ns } from "@framework/constants";

export class CreateWalletTable1738229309617 extends Migration {
  // eslint-disable-next-line @typescript-eslint/require-await
  public async up(): Promise<void> {
    this.addSql(`
      create table ${ns}.wallet (
        id serial primary key,
        merchant_id uuid not null,
        address varchar not null,
        private_key varchar not null,
        multisig varchar not null,
        created_at timestamptz not null default current_timestamp,
        updated_at timestamptz not null default current_timestamp,
        foreign key (merchant_id) references ${ns}.merchant (id) on delete cascade
      );
    `);
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  public async down(): Promise<void> {
    this.addSql(`drop table ${ns}.wallet`);
  }
}
