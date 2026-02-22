import { Migration } from "@mikro-orm/migrations";

import { ns } from "@framework/constants";

export class SeedPaykillaTable1762160943134 extends Migration {
  public async up(): Promise<void> {}

  // eslint-disable-next-line @typescript-eslint/require-await
  public async down(): Promise<void> {
    this.addSql(`truncate table ${ns}.paykilla restart identity cascade;`);
  }
}
