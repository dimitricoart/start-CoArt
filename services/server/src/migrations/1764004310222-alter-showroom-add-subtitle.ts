import { Migration } from "@mikro-orm/migrations";

import { ns } from "@framework/constants";

const EMPTY_LEXICAL = '{"root":{"children":[],"direction":null,"format":"","indent":0,"type":"root","version":1}}';

export class AlterShowroomAddSubtitle1764004310222 extends Migration {
  // eslint-disable-next-line @typescript-eslint/require-await
  public async up(): Promise<void> {
    this.addSql(`
      ALTER TABLE ${ns}.showroom ADD COLUMN subtitle json;
      UPDATE ${ns}.showroom SET subtitle = '${EMPTY_LEXICAL}';
      ALTER TABLE ${ns}.showroom ALTER COLUMN subtitle SET NOT NULL;
    `);
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  public async down(): Promise<void> {
    this.addSql(`
      ALTER TABLE ${ns}.showroom DROP COLUMN subtitle;
    `);
  }
}
