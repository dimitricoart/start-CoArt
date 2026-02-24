import { Migration } from "@mikro-orm/migrations";

import { ns } from "@framework/constants";

export class CreateTokenTable1563804000130 extends Migration {
  // eslint-disable-next-line @typescript-eslint/require-await
  async up(): Promise<void> {
    this.addSql(`
      CREATE TYPE ${ns}.token_status_enum AS ENUM (
        'MINTED',
        'BURNED'
      );
    `);

    this.addSql(`
      create table ${ns}.token (
        id serial primary key,
        amount uint256 not null,
        contract_id int not null,
        token_status ${ns}.token_status_enum not null,
        token_id uint256 not null,
        created_at timestamptz  not null default current_timestamp,
        updated_at timestamptz not null default current_timestamp,
        foreign key (contract_id) references ${ns}.contract (id) on delete cascade
      );
    `);

    this.addSql(`SELECT setval('${ns}.token_id_seq', 1, true);`);
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  async down(): Promise<void> {
    this.addSql(`drop table ${ns}.token;`);
    this.addSql(`drop type ${ns}.token_status_enum;`);
  }
}
