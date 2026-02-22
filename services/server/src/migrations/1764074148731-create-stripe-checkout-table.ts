import { Migration } from "@mikro-orm/migrations";

import { ns } from "@framework/constants";

export class CreateStripeCheckoutTable1764074148731 extends Migration {
  // eslint-disable-next-line @typescript-eslint/require-await
  public async up(): Promise<void> {
    this.addSql(`
      CREATE TYPE ${ns}.stripe_checkout_status_enum AS ENUM (
        'NEW',
        'CREATED',
        'PAID',
        'EXPIRED'
      );
    `);

    this.addSql(`
      create table ${ns}.stripe_checkout (
        id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
        seller_id uuid not null,
        buyer_id uuid not null,
        artwork_id uuid not null,
        stripe_checkout_status ${ns}.stripe_checkout_status_enum not null,
        price int not null,
        fractions uint256 not null,
        external_id varchar not null,
        created_at timestamptz not null default current_timestamp,
        updated_at timestamptz not null default current_timestamp,
        foreign key (seller_id) references ${ns}.merchant (id) on delete cascade,
        foreign key (buyer_id) references ${ns}.merchant (id) on delete cascade,
        foreign key (artwork_id) references ${ns}.artwork (id) on delete cascade
      );
    `);

    this.addSql(`
      create unique index stripe_checkout_external_id_uidx on ${ns}.stripe_checkout (external_id);
    `);
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  public async down(): Promise<void> {
    this.addSql(`drop table ${ns}.stripe_checkout`);
    this.addSql(`drop type ${ns}.stripe_checkout_status_enum;`);
  }
}
