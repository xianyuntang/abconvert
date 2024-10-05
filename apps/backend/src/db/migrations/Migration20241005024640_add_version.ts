import { Migration } from '@mikro-orm/migrations';

export class Migration20241005024640_add_version extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table "versions" ("id" varchar(21) not null, constraint "versions_pkey" primary key ("id"));`);

    this.addSql(`create table "version_details" ("id" varchar(21) not null, "key" varchar(255) not null, "value" varchar(255) not null, "version_id" varchar(21) not null, constraint "version_details_pkey" primary key ("id"));`);

    this.addSql(`alter table "version_details" add constraint "version_details_version_id_foreign" foreign key ("version_id") references "versions" ("id") on update cascade on delete cascade;`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "version_details" drop constraint "version_details_version_id_foreign";`);

    this.addSql(`drop table if exists "versions" cascade;`);

    this.addSql(`drop table if exists "version_details" cascade;`);
  }

}
