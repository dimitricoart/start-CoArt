import { Migration } from "@mikro-orm/migrations";

import { imageUrl, ns } from "@framework/constants";

import {
  ASSET_DECLINED_1,
  ASSET_DECLINED_2,
  ASSET_FINALIZED_1,
  ASSET_FINALIZED_2,
  ASSET_FINALIZED_3,
  ASSET_FINALIZED_4,
  ASSET_FINALIZED_5,
  ASSET_FINALIZED_6,
  ASSET_NEW_1,
  ASSET_NEW_2,
  ASSET_NEW_3,
} from "../utils/uuid";

export class SeedDocumentTable1738237445775 extends Migration {
  // eslint-disable-next-line @typescript-eslint/require-await
  public async up(): Promise<void> {
    this.addSql(`
      insert into ${ns}.document (
        caption,
        file_url,
        priority,
        artwork_id
      ) values (
        'Caption',
        '${imageUrl}',
        0,
        '${ASSET_FINALIZED_1}'
      ), (
        'Caption',
        '${imageUrl}',
        1,
        '${ASSET_FINALIZED_1}'
      ), (
        'Caption',
        '${imageUrl}',
        2,
        '${ASSET_FINALIZED_1}'
      ), (
        'Caption',
        '${imageUrl}',
        0,
        '${ASSET_FINALIZED_2}'
      ), (
        'Caption',
        '${imageUrl}',
        0,
        '${ASSET_FINALIZED_3}'
      ), (
        'Caption',
        '${imageUrl}',
        0,
        '${ASSET_FINALIZED_4}'
      ), (
        'Caption',
        '${imageUrl}',
        0,
        '${ASSET_FINALIZED_5}'
      ), (
        'Caption',
        '${imageUrl}',
        0,
        '${ASSET_FINALIZED_6}'
      ), (
        'Caption',
        '${imageUrl}',
        0,
        '${ASSET_DECLINED_1}'
      ), (
        'Caption',
        '${imageUrl}',
        0,
        '${ASSET_DECLINED_2}'
      ), (
        'Caption',
        '${imageUrl}',
        0,
        '${ASSET_NEW_1}'
      ), (
        'Caption',
        '${imageUrl}',
        0,
        '${ASSET_NEW_2}'
      ), (
        'Caption',
        '${imageUrl}',
        0,
        '${ASSET_NEW_3}'
      );
    `);
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  public async down(): Promise<void> {
    this.addSql(`truncate table ${ns}.document restart identity cascade;`);
  }
}
