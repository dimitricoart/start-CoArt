import { Migration } from "@mikro-orm/migrations";

import { ns } from "@framework/constants";
import { simpleFormatting } from "../utils/lexical";

export class AlterShowroomAddSubtitle1764004310222 extends Migration {
  // eslint-disable-next-line @typescript-eslint/require-await
  public async up(): Promise<void> {
    this.addSql(`
      ALTER TABLE ${ns}.showroom ADD COLUMN subtitle json;
      UPDATE ${ns}.showroom SET subtitle = '${simpleFormatting}';
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
