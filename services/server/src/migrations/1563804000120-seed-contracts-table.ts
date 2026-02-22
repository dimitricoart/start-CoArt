import { Migration } from "@mikro-orm/migrations";

import { simpleFormatting } from "../utils/lexical";
import { imageUrl, ns } from "@framework/constants";

export class SeedContractTable1563804000120 extends Migration {
  // eslint-disable-next-line @typescript-eslint/require-await
  public async up(): Promise<void> {
    this.addSql(`
      insert into ${ns}.contract (
        id,
        title,
        description,
        image_url,
        address,
        chain_id,
        symbol,
        decimals,
        base_token_uri,
        contract_status
      ) values (
        1,
        'CoArt',
        '${simpleFormatting}',
        '${imageUrl}',
        '0xb3B8ffAc899b912A44363260D424a4C6CA7B42A2', -- staging
        137,
        'CoArt',
        0,
        'ar://',
        'ACTIVE'
      );
    `);

    // it is important to have contract address in mixed case (EIP-55) for Safe
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  public async down(): Promise<void> {
    this.addSql(`truncate table ${ns}.contract restart identity cascade;`);
  }
}
