/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("product", (table) => {
    table.increments("id").primary();
    table.string("name").notNullable();
    table.decimal("price").notNullable();
    table.integer("stock_amount").notNullable();
    table.string("image_url");
    table.integer("category_id").unsigned();
    table.foreign("category_id").references("id").inTable("product_category");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("product");
};
