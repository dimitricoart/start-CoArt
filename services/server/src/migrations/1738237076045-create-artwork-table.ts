import { Migration } from "@mikro-orm/migrations";

import { DEFAULT_AMOUNT_OF_FRACTIONS_IN_ASSET, ns } from "@framework/constants";

export class CreateArtworkTable1738237076045 extends Migration {
  // eslint-disable-next-line @typescript-eslint/require-await
  public async up(): Promise<void> {
    this.addSql(`
      create type ${ns}.artwork_orientation_enum as enum (
        'HORIZONTAL',
        'VERTICAL',
        'SQUARE'
      );
    `);

    this.addSql(`
      create type ${ns}.artwork_type_enum as enum (
        'DIGITAL',
        'PHYSICAL'
      );
    `);

    this.addSql(`
      create type ${ns}.artwork_status_enum as enum (
        'NEW',
        'APPROVED',
        'DECLINED'
      );
    `);

    this.addSql(`
      create type ${ns}.artwork_category_enum as enum (
        'PAINTINGS',
        'DRAWINGS',
        'MIXED_MEDIA',
        'SCULPTURE',
        'ANTIQUES',
        'PRINTS',
        'PHOTOGRAPHY',
        'INSTALLATION',
        'MERCH'
      );
    `);

    this.addSql(`
      create type ${ns}.artwork_subject_enum as enum (
        'ABSTRACT',
        'LANDSCAPE',
        'PORTRAIT',
        'ANIMAL',
        'NATURE',
        'PEOPLE',
        'FLORAL',
        'ANTIQUE',
        'WOMEN',
        'NUDE'
      );
    `);

    this.addSql(`
      create type ${ns}.artwork_style_enum as enum (
        'EXISTENTIALISM',
        'PRIMITIVISM',
        'SYMBOLISM',
        'FINE_ART',
        'MODERN',
        'ABSTRACT',
        'FIGURATIVE',
        'EXPRESSIONISM',
        'REALISM',
        'POP_ART',
        'IMPRESSIONISM',
        'CONCEPTUAL',
        'PORTRAITURE',
        'MINIMALISM',
        'SURREALISM',
        'ILLUSTRATION',
        'ART_DECO',
        'PHOTOREALISM',
        'DOCUMENTARY',
        'STREET_ART',
        'FOLK',
        'CUBISM',
        'ANTIQUE',
        'MEMES'
      );
    `);

    this.addSql(`
      create type ${ns}.artwork_material_enum as enum (
        'DRAWINGS_PAINTED',
        'CHARCOAL_SANGUINE',
        'OIL_TEMPERA_ON_CANVAS',
        'CARDBOARD',
        'ALUMINIUM',
        'GLASS',
        'BRONZE',
        'CERAMIC',
        'CARBON_FIBRE',
        'MARBLE',
        'STAINLESS_STEEL',
        'OIL_ON_PAPER',
        'ACRYLIC',
        'OIL_ON_CANVAS',
        'SILVER_GELATIN',
        'PIGMENTS',
        'WATERCOLOR',
        'WOOD_PANEL',
        'ARCHIVAL_PAPER',
        'CORK_LEATHER',
        'GICLEE_PRINT_ON_CANVAS',
        'GOUACHE',
        'HOT_PRESS',
        'METAL',
        'PLEXIGLASS',
        'PASTEL',
        'CHARCOAL',
        'COLOR_PAPER',
        'STRETCHED_CANVAS',
        'SOFT'
      );
    `);

    this.addSql(`
      create type ${ns}.artwork_unit_enum as enum (
        'CM',
        'INCH'
      );
    `);

    this.addSql(`
      create table ${ns}.artwork (
        id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
        title varchar not null,
        description json not null,
        fractions uint256 not null default ${DEFAULT_AMOUNT_OF_FRACTIONS_IN_ASSET},
        image_url varchar not null,
        price int not null,
        is_copyright boolean not null,
        artwork_created_at timestamptz default null,
        artist_name varchar default null,
        artwork_type ${ns}.artwork_type_enum not null,
        artwork_status ${ns}.artwork_status_enum not null,
        category ${ns}.artwork_category_enum not null,
        subject ${ns}.artwork_subject_enum not null,
        style ${ns}.artwork_style_enum not null,
        material ${ns}.artwork_material_enum not null,
        showroom_id uuid not null,
        token_id int,
        dimensions_orientation ${ns}.artwork_orientation_enum,
        dimensions_height int,
        dimensions_width int,
        dimensions_depth int,
        dimensions_units ${ns}.artwork_unit_enum,
        created_at timestamptz not null default current_timestamp,
        updated_at timestamptz not null default current_timestamp,
        foreign key (showroom_id) references ${ns}.showroom (id) on delete cascade,
        foreign key (token_id) references ${ns}.token (id) on delete cascade
      );
    `);
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  public async down(): Promise<void> {
    this.addSql(`drop table ${ns}.artwork`);
    this.addSql(`drop type ${ns}.artwork_orientation_enum;`);
    this.addSql(`drop type ${ns}.artwork_type_enum;`);
    this.addSql(`drop type ${ns}.artwork_status_enum;`);
    this.addSql(`drop type ${ns}.artwork_category_enum;`);
    this.addSql(`drop type ${ns}.artwork_subject_enum;`);
    this.addSql(`drop type ${ns}.artwork_style_enum;`);
    this.addSql(`drop type ${ns}.artwork_material_enum;`);
    this.addSql(`drop type ${ns}.artwork_unit_enum;`);
  }
}
