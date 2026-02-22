import { Migration } from "@mikro-orm/migrations";

import { imageUrl, ns } from "@framework/constants";

import {
  MERCHANT_ACTIVE_1,
  MERCHANT_ACTIVE_2,
  MERCHANT_INACTIVE,
  MERCHANT_PENDING,
  USER_ACTIVE_1,
  USER_ACTIVE_2,
  USER_ACTIVE_3,
  USER_ACTIVE_4,
} from "../utils/uuid";

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
        '${USER_ACTIVE_1}',
        'trejgun@gmail.com',
        'rISIVEOw2hQl3PDoArCwIvi3YMR2', -- My5up3r5tr0ngP@55w0rd
        'Trej Gun',
        '${imageUrl}',
        '{SUPER,ADMIN,OWNER,MANAGER,CUSTOMER}',
        'ACTIVE',
        '${MERCHANT_ACTIVE_1}'
      ), (
        '${USER_ACTIVE_2}',
        'meow.dao@gmail.com',
        'yeYvJLj3POYPcX5xvvdadA8E3z32', -- My5up3r5tr0ngP@55w0rd
        'Meow Dao',
        '${imageUrl}',
        '{OWNER}',
        'ACTIVE',
        '${MERCHANT_ACTIVE_2}'
      ), (
        '${USER_ACTIVE_3}',
        'cto@fractown.com',
        'yeYvJLj3POYPcX5xvvdadA8E3z32', -- My5up3r5tr0ngP@55w0rd
        'CTO',
        '${imageUrl}',
        '{OWNER}',
        'ACTIVE',
        '${MERCHANT_INACTIVE}'
      ), (
        '${USER_ACTIVE_4}',
        'oleg@ethberry.io',
        'yeYvJLj3POYPcX5xvvdadA8E3z32', -- My5up3r5tr0ngP@55w0rd
        'EthBerry',
        '${imageUrl}',
        '{OWNER}',
        'ACTIVE',
        '${MERCHANT_PENDING}'
      );
    `);
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  public async down(): Promise<void> {
    this.addSql(`truncate table ${ns}.user restart identity cascade;`);
  }
}
