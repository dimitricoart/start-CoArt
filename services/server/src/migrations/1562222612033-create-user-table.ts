import { Migration } from "@mikro-orm/migrations";

import { ns } from "@framework/constants";

export class CreateUserTable1562222612033 extends Migration {
  // eslint-disable-next-line @typescript-eslint/require-await
  async up(): Promise<void> {
    this.addSql(`
      CREATE TYPE ${ns}.user_role_enum as enum (
        'SUPER',
        'ADMIN',
        'OWNER',
        'MANAGER',
        'CUSTOMER'
      );
    `);

    this.addSql(`
      CREATE TYPE ${ns}.user_status_enum as enum (
        'ACTIVE',
        'INACTIVE',
        'PENDING'
      );
    `);

    this.addSql(`
      CREATE TYPE ${ns}.languages as enum (
        'EN'
      );
    `);

    this.addSql(`
      create table ${ns}.user (
        id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
        sub varchar not null,
        display_name varchar,
        image_url varchar,
        email varchar not null unique,
        language ${ns}.languages not null default 'EN',
        user_roles ${ns}.user_role_enum[] not null default '{CUSTOMER}',
        user_status ${ns}.user_status_enum not null default 'PENDING',
        merchant_id uuid not null,
        created_at timestamptz not null default current_timestamp,
        updated_at timestamptz not null default current_timestamp,
        foreign key (merchant_id) references ${ns}.merchant (id) on delete cascade
      );
    `);
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  async down(): Promise<void> {
    this.addSql(`drop table ${ns}.user;`);
    this.addSql(`drop type ${ns}.user_role_enum;`);
    this.addSql(`drop type ${ns}.user_status_enum;`);
  }
}
