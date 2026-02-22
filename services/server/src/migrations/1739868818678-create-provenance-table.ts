import { Migration } from "@mikro-orm/migrations";

import { ns } from "@framework/constants";

export class CreateProvenanceTable1739868818678 extends Migration {
  // eslint-disable-next-line @typescript-eslint/require-await
  public async up(): Promise<void> {
    this.addSql(`
      create table ${ns}.provenance (
        id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
        seller_id uuid not null,
        buyer_id uuid not null,
        artwork_id uuid not null,
        price int not null,
        fractions uint256 not null,
        tx_hash varchar not null,
        created_at timestamptz not null default current_timestamp,
        updated_at timestamptz not null default current_timestamp,
        foreign key (seller_id) references ${ns}.merchant (id) on delete cascade,
        foreign key (buyer_id) references ${ns}.merchant (id) on delete cascade,
        foreign key (artwork_id) references ${ns}.artwork (id) on delete cascade
      );
    `);
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  public async down(): Promise<void> {
    this.addSql(`drop table ${ns}.photo`);
  }
}
