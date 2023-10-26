/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("product", (table) => {
    table.uuid("id").primary();
    table.string("name").notNullable();
    table.decimal("price").notNullable();
    table.integer("stock_amount").notNullable();
    table.string("image_url");
    table.uuid("category_id").references("id").inTable("product_category");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("product");
};
