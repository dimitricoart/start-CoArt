import { Migration } from "@mikro-orm/migrations";

export class CreateDomainUint1561991000002 extends Migration {
  // eslint-disable-next-line @typescript-eslint/require-await
  async up(): Promise<void> {
    this.addSql(`
      CREATE DOMAIN uint256 AS NUMERIC
        CHECK (VALUE >= 0 AND VALUE < 2^256)
        CHECK (SCALE(VALUE) = 0);
    `);
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  async down(): Promise<void> {
    this.addSql(`DROP DOMAIN uint256;`);
  }
}
