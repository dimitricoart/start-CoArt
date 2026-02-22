import { Migration } from "@mikro-orm/migrations";

import { ns } from "@framework/constants";

export class CreateDocumentTable1764351077882 extends Migration {
  // eslint-disable-next-line @typescript-eslint/require-await
  public async up(): Promise<void> {
    this.addSql(`
      create table ${ns}.document (
        id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
        caption varchar not null,
        priority int not null default 0,
        file_url varchar not null,
        artwork_id uuid not null,
        created_at timestamptz not null default current_timestamp,
        updated_at timestamptz not null default current_timestamp,
        foreign key (artwork_id) references ${ns}.artwork (id) on delete cascade
      );
    `);
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  public async down(): Promise<void> {
    this.addSql(`drop table ${ns}.document`);
  }
}
