import { Migration } from "@mikro-orm/migrations";

import { ns } from "@framework/constants";

export class CreateContractTable1563804000110 extends Migration {
  // eslint-disable-next-line @typescript-eslint/require-await
  async up(): Promise<void> {
    this.addSql(`
      CREATE TYPE ${ns}.contract_status_enum AS ENUM (
        'ACTIVE',
        'INACTIVE'
      );
    `);

    this.addSql(`
      create table ${ns}.contract (
        id serial primary key,
        title varchar not null,
        description json not null,
        image_url varchar not null,
        address varchar not null,
        chain_id int not null,
        symbol varchar not null,
        decimals int not null,
        base_token_uri varchar not null,
        contract_status ${ns}.contract_status_enum not null,
        created_at timestamptz not null default current_timestamp,
        updated_at timestamptz not null default current_timestamp
      );
    `);

    this.addSql(`SELECT setval('${ns}.contract_id_seq', 1, true);`);
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  async down(): Promise<void> {
    this.addSql(`drop table ${ns}.contract;`);
    this.addSql(`drop type ${ns}.contract_status_enum;`);
  }
}
