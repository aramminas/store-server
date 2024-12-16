import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("products", (table) => {
    table.increments("id").primary().unique();
    table.string("name", 120).notNullable();
    table.integer("price").notNullable();
    table.integer("discounted_price").defaultTo(null).nullable();
    table.string("description", 600).defaultTo(null).nullable();
    table.string("image_url").defaultTo(null).nullable();
    table.integer("creator_id").notNullable();
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists("products");
}
