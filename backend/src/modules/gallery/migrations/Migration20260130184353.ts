import { Migration } from "@medusajs/framework/mikro-orm/migrations";

export class Migration20260130184353 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table if exists "gallery_item" alter column "title" type text using ("title"::text);`);
    this.addSql(`alter table if exists "gallery_item" alter column "title" drop not null;`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table if exists "gallery_item" alter column "title" type text using ("title"::text);`);
    this.addSql(`alter table if exists "gallery_item" alter column "title" set not null;`);
  }

}
