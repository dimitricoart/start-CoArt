import { Migration } from "@mikro-orm/migrations";

import { ns } from "@framework/constants";

export class MigratePaykilla1769159416469 extends Migration {
  // eslint-disable-next-line @typescript-eslint/require-await
  public async up(): Promise<void> {
    this.addSql(`
        ALTER TABLE ${ns}.paykilla ADD COLUMN offer_id uuid;

        WITH inserted AS (
            SELECT
                id AS stripe_id,
                asset_id,
                seller_id,
                price,
                fractions
            FROM ${ns}.paykilla
        ),
             new_offers AS (
                 INSERT INTO ${ns}.offer (
                                          asset_id,
                                          merchant_id,
                                          price,
                                          fractions,
                                          offer_status
                     )
                     SELECT
                         stripe.asset_id,
                         stripe.seller_id,
                         stripe.price,
                         stripe.fractions,
                         'PAID'::${ns}.offer_status_enum
                     FROM inserted stripe
                     RETURNING id AS offer_id, asset_id, merchant_id, price, fractions
             ),
             mapping AS (
                 SELECT
                     stripe.stripe_id,
                     o.offer_id
                 FROM inserted stripe
                          JOIN new_offers o
                               ON stripe.asset_id = o.asset_id
                                   AND stripe.seller_id = o.merchant_id
                                   AND stripe.price = o.price
                                   AND stripe.fractions = o.fractions
             )
        UPDATE ${ns}.paykilla s
        SET offer_id = m.offer_id
        FROM mapping m
        WHERE s.id = m.stripe_id;

        ALTER TABLE ${ns}.paykilla 
            ALTER COLUMN offer_id SET NOT NULL;

        ALTER TABLE ${ns}.paykilla
            ADD CONSTRAINT asset_offer_id_fkey
            FOREIGN KEY (offer_id) REFERENCES ${ns}.offer(id);

        DROP INDEX IF EXISTS ${ns}.paykilla_asset_id_fkey;

        ALTER TABLE ${ns}.paykilla 
            DROP COLUMN asset_id;
    `);
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  public async down(): Promise<void> {
    this.addSql(`
        ALTER TABLE ${ns}.paykilla ADD COLUMN asset_id uuid;

        UPDATE ${ns}.paykilla stripe
        SET asset_id = offer.asset_id
        FROM ${ns}.offer offer
        WHERE stripe.offer_id = offer.id;

        ALTER TABLE ${ns}.paykilla
            ALTER COLUMN asset_id SET NOT NULL;

        ALTER TABLE ${ns}.paykilla
            ADD CONSTRAINT asset_asset_id_fkey
                FOREIGN KEY (asset_id) REFERENCES ${ns}.asset(id);

        DROP INDEX IF EXISTS ${ns}.paykilla_offer_id_fkey;

        ALTER TABLE ${ns}.paykilla
            DROP COLUMN offer_id;
    `);
  }
}
