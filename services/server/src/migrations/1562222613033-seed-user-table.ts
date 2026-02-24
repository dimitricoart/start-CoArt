import { Migration } from "@mikro-orm/migrations";

import { imageUrl, ns } from "@framework/constants";

export class SeedUserTable1562222613033 extends Migration {
  // eslint-disable-next-line @typescript-eslint/require-await
  public async up(): Promise<void> {
    this.addSql(`
      insert into ${ns}.user (
        id,
        email,
        sub,
        display_name,
        image_url,
        user_roles,
        user_status,
        merchant_id
      ) values (
        '00000000-0000-7000-8000-200000000001',
        'trejgun@gmail.com',
        'rISIVEOw2hQl3PDoArCwIvi3YMR2', -- My5up3r5tr0ngP@55w0rd
        'Trej Gun',
        '${imageUrl}',
        '{SUPER,ADMIN,OWNER,MANAGER,CUSTOMER}',
        'ACTIVE',
        '00000000-0000-7000-8000-100000000001'
      ), (
        '00000000-0000-7000-8000-200000000002',
        'meow.dao@gmail.com',
        'yeYvJLj3POYPcX5xvvdadA8E3z32', -- My5up3r5tr0ngP@55w0rd
        'Meow Dao',
        '${imageUrl}',
        '{OWNER}',
        'ACTIVE',
        '00000000-0000-7000-8000-100000000002'
      ), (
        '00000000-0000-7000-8000-200000000003',
        'cto@fractown.com',
        'yeYvJLj3POYPcX5xvvdadA8E3z32', -- My5up3r5tr0ngP@55w0rd
        'CTO',
        '${imageUrl}',
        '{OWNER}',
        'ACTIVE',
        '00000000-0000-7000-8000-100000000003'
      ), (
        '00000000-0000-7000-8000-200000000004',
        'owner@example.com',
        'yeYvJLj3POYPcX5xvvdadA8E3z32', -- My5up3r5tr0ngP@55w0rd
        'Demo Owner',
        '${imageUrl}',
        '{OWNER}',
        'ACTIVE',
        '00000000-0000-7000-8000-100000000004'
      );
    `);
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  public async down(): Promise<void> {
    this.addSql(`truncate table ${ns}.user restart identity cascade;`);
  }
}
