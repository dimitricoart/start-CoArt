import { Migration } from "@mikro-orm/migrations";

import { ns } from "@framework/constants";

import { MERCHANT_ACTIVE_1, MERCHANT_ACTIVE_2, MERCHANT_INACTIVE, MERCHANT_PENDING } from "../utils/uuid";

export class SeedWalletTable1738229309717 extends Migration {
  // eslint-disable-next-line @typescript-eslint/require-await
  public async up(): Promise<void> {
    this.addSql(`
      insert into ${ns}.wallet (
        merchant_id,
        address,
        private_key,
        multisig
      ) values (
        '${MERCHANT_ACTIVE_1}',
        '0xD269dA9773327a3052892D194f88642fD6a46907',
        'KBOXwK7yoJBDp9vLEup0JbxFonyPkT5ZaLqS2uJvMMI=.CMTP0bGMr0RDDM/58OrRVQ==.deFdOlOzS57Tz9ZyqhOvSBIxYV0ynpq6/BcYELZz1vI=',
        '0xb06dA4249005C0d5E055DE00A131a560Fd1F9c7e'
      ), (
        '${MERCHANT_ACTIVE_2}',
        '0x1D81B683d5b1DFCB746B172eC41Cea2BaF0532DE',
        'JBYWoN0Wg4kPlhdPQPjZELSTGmZ6p3ilRjqR0RDhq5c=.mo454kpRBcamZM1JRDLkGA==.hlOyG2F1cNwEdVsiGhEaK+R0yyODlSDdZUZqeL2WFuU=',
        '0xE80f56a95b82d4C2809f27a57f0c9f3ceb14aDf7'
      ), (
        '${MERCHANT_INACTIVE}',
        '0xD269dA9773327a3052892D194f88642fD6a46907',
        'KBOXwK7yoJBDp9vLEup0JbxFonyPkT5ZaLqS2uJvMMI=.CMTP0bGMr0RDDM/58OrRVQ==.deFdOlOzS57Tz9ZyqhOvSBIxYV0ynpq6/BcYELZz1vI=',
        '0xb06dA4249005C0d5E055DE00A131a560Fd1F9c7e'
      ), (
        '${MERCHANT_PENDING}',
        '0x1D81B683d5b1DFCB746B172eC41Cea2BaF0532DE',
        'JBYWoN0Wg4kPlhdPQPjZELSTGmZ6p3ilRjqR0RDhq5c=.mo454kpRBcamZM1JRDLkGA==.hlOyG2F1cNwEdVsiGhEaK+R0yyODlSDdZUZqeL2WFuU=',
        '0xE80f56a95b82d4C2809f27a57f0c9f3ceb14aDf7'
      );
    `);

    // MASTER_KEY=f237c84f6a4f90ac592b083ce4373696bda515553b180ceb02af9665cdf0f428
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  public async down(): Promise<void> {
    this.addSql(`truncate table ${ns}.wallet restart identity cascade;`);
  }
}
