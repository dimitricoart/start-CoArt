import { Migration } from "@mikro-orm/migrations";
import { zeroHash } from "viem";

import { ns } from "@framework/constants";

export class SeedProvenanceTable1739868846206 extends Migration {
  // eslint-disable-next-line @typescript-eslint/require-await
  public async up(): Promise<void> {
    this.addSql(`
      insert into ${ns}.provenance (
        seller_id,
        buyer_id,
        artwork_id,
        price,
        fractions,
        tx_hash
      ) values (
        '00000000-0000-7000-8000-100000000001',
        '00000000-0000-7000-8000-100000000002',
        '00000000-0000-7000-8000-400000000001',
        100,
        100,
        '${zeroHash}'
      ), (
        '00000000-0000-7000-8000-100000000002',
        '00000000-0000-7000-8000-100000000001',
        '00000000-0000-7000-8000-400000000001',
        1000,
        100,
        '${zeroHash}'
      ), (
        '00000000-0000-7000-8000-100000000001',
        '00000000-0000-7000-8000-100000000002',
        '00000000-0000-7000-8000-400000000001',
        10000,
        100,
        '${zeroHash}'
      ), (
        '00000000-0000-7000-8000-100000000002',
        '00000000-0000-7000-8000-100000000001',
        '00000000-0000-7000-8000-400000000001',
        100000,
        100,
        '${zeroHash}'
      ), (
        '00000000-0000-7000-8000-100000000002',
        '00000000-0000-7000-8000-100000000001',
        '00000000-0000-7000-8000-400000000002',
        100,
        100,
        '${zeroHash}'
      ), (
        '00000000-0000-7000-8000-100000000002',
        '00000000-0000-7000-8000-100000000001',
        '00000000-0000-7000-8000-400000000002',
        100,
        100,
        '${zeroHash}'
      );
    `);
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  public async down(): Promise<void> {
    this.addSql(`truncate table ${ns}.provenance restart identity cascade;`);
  }
}
