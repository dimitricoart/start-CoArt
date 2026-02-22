import { Migration } from "@mikro-orm/migrations";

import { ns } from "@framework/constants";

export class CreateFavoriteTable1762329213918 extends Migration {
  // eslint-disable-next-line @typescript-eslint/require-await
  public async up(): Promise<void> {
    this.addSql(`
      create table ${ns}.favorite (
        id serial primary key,
        artwork_id uuid not null,
        user_id uuid not null,
        created_at timestamptz not null default current_timestamp,
        updated_at timestamptz not null default current_timestamp,
        foreign key (user_id) references ${ns}.user (id) on delete cascade,
        foreign key (artwork_id) references ${ns}.artwork (id) on delete cascade
      );
    `);
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  public async down(): Promise<void> {
    this.addSql(`drop table ${ns}.favorite`);
  }
}
