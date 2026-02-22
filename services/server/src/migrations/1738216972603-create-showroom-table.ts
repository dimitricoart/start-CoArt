import { Migration } from "@mikro-orm/migrations";

import { ns } from "@framework/constants";

export class CreateShowroomTable1738216972603 extends Migration {
  // eslint-disable-next-line @typescript-eslint/require-await
  public async up(): Promise<void> {
    this.addSql(`
      create table ${ns}.showroom (
        id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
        title varchar not null,
        description json not null,
        image_url varchar not null,
        background_image_url varchar not null,
        priority int not null default 0,
        merchant_id uuid not null,
        created_at timestamptz not null default current_timestamp,
        updated_at timestamptz not null default current_timestamp,
        foreign key (merchant_id) references ${ns}.merchant (id) on delete cascade
      );
    `);
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  public async down(): Promise<void> {
    this.addSql(`drop table ${ns}.showroom`);
  }
}
