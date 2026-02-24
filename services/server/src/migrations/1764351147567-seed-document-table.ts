import { Migration } from "@mikro-orm/migrations";

import { imageUrl, ns } from "@framework/constants";

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
        '00000000-0000-7000-8000-400000000001'
      ), (
        'Caption',
        '${imageUrl}',
        1,
        '00000000-0000-7000-8000-400000000001'
      ), (
        'Caption',
        '${imageUrl}',
        2,
        '00000000-0000-7000-8000-400000000001'
      ), (
        'Caption',
        '${imageUrl}',
        0,
        '00000000-0000-7000-8000-400000000002'
      ), (
        'Caption',
        '${imageUrl}',
        0,
        '00000000-0000-7000-8000-400000000003'
      ), (
        'Caption',
        '${imageUrl}',
        0,
        '00000000-0000-7000-8000-400000000004'
      ), (
        'Caption',
        '${imageUrl}',
        0,
        '00000000-0000-7000-8000-400000000005'
      ), (
        'Caption',
        '${imageUrl}',
        0,
        '00000000-0000-7000-8000-400000000006'
      ), (
        'Caption',
        '${imageUrl}',
        0,
        '00000000-0000-7000-8000-400000000007'
      ), (
        'Caption',
        '${imageUrl}',
        0,
        '00000000-0000-7000-8000-400000000008'
      ), (
        'Caption',
        '${imageUrl}',
        0,
        '00000000-0000-7000-8000-400000000009'
      ), (
        'Caption',
        '${imageUrl}',
        0,
        '00000000-0000-7000-8000-40000000000a'
      ), (
        'Caption',
        '${imageUrl}',
        0,
        '00000000-0000-7000-8000-40000000000b'
      );
    `);
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  public async down(): Promise<void> {
    this.addSql(`truncate table ${ns}.document restart identity cascade;`);
  }
}
