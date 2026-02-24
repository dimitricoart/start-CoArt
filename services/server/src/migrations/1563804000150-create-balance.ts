import { Migration } from "@mikro-orm/migrations";

import { ns } from "@framework/constants";

export class CreateBalanceTable1563804000150 extends Migration {
  // eslint-disable-next-line @typescript-eslint/require-await
  async up(): Promise<void> {
    this.addSql(`
      create table ${ns}.balance (
        id serial primary key,
        account varchar not null,
        amount uint256 not null,
        token_id int not null,
        created_at timestamptz  not null default current_timestamp,
        updated_at timestamptz not null default current_timestamp,
        foreign key (token_id) references ${ns}.token (id) on delete cascade
      );
    `);

    this.addSql(`SELECT setval('${ns}.balance_id_seq', 500000, true);`);
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  async down(): Promise<void> {
    this.addSql(`drop table ${ns}.token;`);
  }
}
