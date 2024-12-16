import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("users", (table) => {
    table.increments("id").primary().unique();
    table.string("first_name", 50).notNullable();
    table.string("last_name", 60).notNullable();
    table.string("email", 100).unique().notNullable();
    table.string("password", 70).notNullable();
    table.string("avatar").defaultTo(null).nullable();
    table.timestamp("birth_date").defaultTo(null).nullable();
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists("users");
}
