import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("products", (table) => {
    table.increments("id").primary().unique();
    table.string("name", 120).notNullable();
    table.integer("price").notNullable();
    table.integer("discounted_price").defaultTo(null).nullable();
    table.string("description", 1000).defaultTo(null).nullable();
    table.string("image_url").defaultTo(null).nullable();
    table.integer("creator_id").notNullable();
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());

    table.index("creator_id", "products_user_id_index");
    table.foreign("creator_id").references("users.id").onDelete("CASCADE");
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists("products");
}
