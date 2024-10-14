import { Migration } from '@mikro-orm/migrations';

export class Migration20241014165213_InitTable extends Migration {
  override async up(): Promise<void> {
    this.addSql(
      `create table "products" ("id" varchar(21) not null, "created_at" timestamptz not null, "updated_at" timestamptz not null, "name" varchar(255) not null, constraint "products_pkey" primary key ("id"));`
    );

    this.addSql(
      `create table "versions" ("id" varchar(21) not null, "created_at" timestamptz not null, "updated_at" timestamptz not null, "product_id" varchar(21) not null, "primary" boolean not null, constraint "versions_pkey" primary key ("id"));`
    );

    this.addSql(
      `create table "testing" ("id" varchar(21) not null, "created_at" timestamptz not null, "updated_at" timestamptz not null, "product_id" varchar(21) not null, "version_a_id" varchar(21) not null, "version_b_id" varchar(21) not null, "is_running" boolean not null, constraint "testing_pkey" primary key ("id"));`
    );

    this.addSql(
      `create table "version_details" ("id" varchar(21) not null, "created_at" timestamptz not null, "updated_at" timestamptz not null, "key" varchar(255) not null, "value" text not null, "version_id" varchar(21) not null, constraint "version_details_pkey" primary key ("id"));`
    );

    this.addSql(
      `alter table "versions" add constraint "versions_product_id_foreign" foreign key ("product_id") references "products" ("id") on update cascade;`
    );

    this.addSql(
      `alter table "testing" add constraint "testing_product_id_foreign" foreign key ("product_id") references "products" ("id") on update cascade;`
    );
    this.addSql(
      `alter table "testing" add constraint "testing_version_a_id_foreign" foreign key ("version_a_id") references "versions" ("id") on update cascade;`
    );
    this.addSql(
      `alter table "testing" add constraint "testing_version_b_id_foreign" foreign key ("version_b_id") references "versions" ("id") on update cascade;`
    );

    this.addSql(
      `alter table "version_details" add constraint "version_details_version_id_foreign" foreign key ("version_id") references "versions" ("id") on update cascade on delete cascade;`
    );
  }

  override async down(): Promise<void> {
    this.addSql(
      `alter table "versions" drop constraint "versions_product_id_foreign";`
    );

    this.addSql(
      `alter table "testing" drop constraint "testing_product_id_foreign";`
    );

    this.addSql(
      `alter table "testing" drop constraint "testing_version_a_id_foreign";`
    );

    this.addSql(
      `alter table "testing" drop constraint "testing_version_b_id_foreign";`
    );

    this.addSql(
      `alter table "version_details" drop constraint "version_details_version_id_foreign";`
    );

    this.addSql(`drop table if exists "products" cascade;`);

    this.addSql(`drop table if exists "versions" cascade;`);

    this.addSql(`drop table if exists "testing" cascade;`);

    this.addSql(`drop table if exists "version_details" cascade;`);
  }
}
