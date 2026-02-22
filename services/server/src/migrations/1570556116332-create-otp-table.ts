import { Migration } from "@mikro-orm/migrations";

import { ns } from "@framework/constants";

export class CreateOneTimePasswordTable1570556116332 extends Migration {
  // eslint-disable-next-line @typescript-eslint/require-await
  public async up(): Promise<void> {
    this.addSql(`
      CREATE TYPE ${ns}.otp_type_enum AS ENUM (
        'EMAIL',
        'PASSWORD'
      );
    `);

    this.addSql(`
      create table ${ns}.otp (
      id serial primary key,
      code varchar not null,
      type ${ns}.otp_type_enum not null,
      user_id uuid not null,
      created_at timestamptz not null default current_timestamp,
      updated_at timestamptz not null default current_timestamp,
      foreign key (user_id) references ${ns}.user (id) on delete cascade
      );`);

    this.addSql(`
      CREATE OR REPLACE FUNCTION delete_expired_tokens() RETURNS trigger
      LANGUAGE plpgsql
      AS $$
        BEGIN
          DELETE FROM ${ns}.otp WHERE created_at < NOW() - INTERVAL '1 hour';
          RETURN NEW;
        END;
      $$;
    `);

    this.addSql(`
      CREATE TRIGGER delete_expired_tokens_trigger
      AFTER INSERT ON ${ns}.otp
      EXECUTE PROCEDURE delete_expired_tokens()
    `);
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  public async down(): Promise<void> {
    this.addSql(`drop table ${ns}.otp`);
    this.addSql(`DROP TYPE ${ns}.otp_type_enum;`);
    this.addSql("DROP FUNCTION delete_expired_tokens();");
  }
}
