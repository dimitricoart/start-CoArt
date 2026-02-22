import { Migration } from "@mikro-orm/migrations";
import { zeroHash } from "viem";

import { ns } from "@framework/constants";

import { ASSET_FINALIZED_1, ASSET_FINALIZED_2, MERCHANT_ACTIVE_1, MERCHANT_ACTIVE_2 } from "../utils/uuid";

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
        '${MERCHANT_ACTIVE_1}',
        '${MERCHANT_ACTIVE_2}',
        '${ASSET_FINALIZED_1}',
        100,
        100,
        '${zeroHash}'
      ), (
        '${MERCHANT_ACTIVE_2}',
        '${MERCHANT_ACTIVE_1}',
        '${ASSET_FINALIZED_1}',
        1000,
        100,
        '${zeroHash}'
      ), (
        '${MERCHANT_ACTIVE_1}',
        '${MERCHANT_ACTIVE_2}',
        '${ASSET_FINALIZED_1}',
        10000,
        100,
        '${zeroHash}'
      ), (
        '${MERCHANT_ACTIVE_2}',
        '${MERCHANT_ACTIVE_1}',
        '${ASSET_FINALIZED_1}',
        100000,
        100,
        '${zeroHash}'
      ), (
        '${MERCHANT_ACTIVE_2}',
        '${MERCHANT_ACTIVE_1}',
        '${ASSET_FINALIZED_2}',
        100,
        100,
        '${zeroHash}'
      ), (
        '${MERCHANT_ACTIVE_2}',
        '${MERCHANT_ACTIVE_1}',
        '${ASSET_FINALIZED_2}',
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
