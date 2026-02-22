import { Migration } from "@mikro-orm/migrations";

export class InstallExtensionUUID1561991000003 extends Migration {
  // eslint-disable-next-line @typescript-eslint/require-await
  async up(): Promise<void> {
    this.addSql(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`);
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  async down(): Promise<void> {
    this.addSql(`DROP EXTENSION IF EXISTS "uuid-ossp";`);
  }
}
